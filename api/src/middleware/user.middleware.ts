import { NextFunction, Request, Response } from 'express';
import {
  AUTHORITY_TYPE_LIST,
  BAD_REQUEST,
  INTERNAL_ERROR,
  PERMISSION_LIST,
  UNAUTHORIZED,
  USER_ROLE_GROUP,
} from '../lib/constant';
import jwt from 'jsonwebtoken';
import { JWT_SALT } from '../lib/config';
import { getUserById } from '../controller/user.controller';
import { verificationToken } from '../lib/type';
import { getUserRoleByUserID } from '../controller/user.role.controller';
import { user_token } from '../models/user_token';
import {
  user_role_authority,
  user_role_authorityAttributes,
} from '../models/user_role_authority';
import { user_role } from '../models/user_role';
import { isArray } from 'lodash';
import { user_role_group } from '../models/user_role_group';

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization
    ? String(req.headers.authorization)
    : '';
  if (!token) {
    return res.status(UNAUTHORIZED).json({ error: 'token is empty' });
  }
  if (!token.includes('Bearer ')) {
    return res.status(UNAUTHORIZED).json({ error: 'invalid token type' });
  }
  const checkedToken = token.replace('Bearer ', '');

  try {
    const verifyToken: verificationToken | string = jwt.verify(
      checkedToken,
      JWT_SALT
    );
    if (typeof verifyToken == 'string') {
      throw new Error('token verify fail');
    }

    req.body._user_id = verifyToken.user_id;

    return next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ error: 'token verify fail' });
  }
}

export async function getUserType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const theUser = await getUserById(req.body._user_id);
  if (typeof theUser == 'string') {
    return res.status(BAD_REQUEST).json({ error: theUser });
  }

  const tokenRow = await user_token.findOne({
    where: {
      user_id: theUser.user_id,
    },
  });
  if (!tokenRow) {
    return res.status(UNAUTHORIZED).json({ error: 'user_token not exist' });
  }

  const userRole = await getUserRoleByUserID(req.body._user_id);
  if (userRole != 'not founded') {
    req.body._userType = userRole;
  } else {
    return res.status(BAD_REQUEST).json({ error: 'user type not found' });
  }

  next();
}

export async function getUserRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRole:
    | null
    | (user_role & {
        user_role_group?: user_role_group;
      }) = await user_role.findOne({
    where: {
      user_id: req.body._user_id,
    },
    include: [
      {
        association: 'user_role_group',
      },
    ],
  });

  if (!userRole || !userRole.user_role_group_id) {
    return res.status(INTERNAL_ERROR).json({ error: `user doesn't has role` });
  }

  const roleList = await user_role_authority.findAll({
    where: {
      user_role_group_id: userRole.user_role_group_id,
    },
    attributes: {
      exclude: ['user_role_authority_id', 'user_role_group_id'],
    },
  });

  req.body._user_role_group_id = userRole.user_role_group?.user_role_group_id;
  req.body._user_role = roleList.map((v) => v.get({ plain: true }));

  next();
}

export const hasUserAccessRouter = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const roleList: user_role_authority[] = req.body._user_role;

  if (!isArray(roleList)) {
    throw new Error('user role is not setting');
  }

  const requestMethod = <keyof typeof PERMISSION_LIST>req.method;
  const permissionOfCRUD = <keyof user_role_authorityAttributes>(
    PERMISSION_LIST[requestMethod]
  );

  const result = roleList.some((role: user_role_authority) => {
    const authType =
      AUTHORITY_TYPE_LIST[<keyof typeof AUTHORITY_TYPE_LIST>role.name];
    if (authType && authType.match) {
      return authType.match.some((permission: string[]) => {
        return (
          permission[0].toUpperCase() == requestMethod &&
          (permission[1] == req.baseUrl || permission[1] == req.originalUrl) &&
          role[permissionOfCRUD] == 'Y'
        );
      });
    }
  });

  if (result) {
    next();
  } else {
    if (req.body._user_role_group_id == USER_ROLE_GROUP.NON_AUTH_USER) {
      throw new Error('authorization error non_auth_user');
    } else {
      throw new Error('authorization error');
    }
  }
};
