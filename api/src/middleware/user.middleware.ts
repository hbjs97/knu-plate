import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST, UNAUTHORIZED } from '../lib/constant';
import jwt from 'jsonwebtoken';
import { JWT_SALT } from '../lib/config';
import { getUserById } from '../controller/user.controller';
import { verificationToken } from '../lib/type';
import { getUserRoleByUserID } from '../controller/user.role.controller';
import { user_token } from '../models/user_token';

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
