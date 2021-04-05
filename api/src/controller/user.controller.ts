import { JWT_EXPIRE_ACCESS, JWT_EXPIRE_REFRESH, JWT_SALT } from '../lib/config';
import { DB } from '../lib/sequelize';
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import ms from 'ms';
import { user, userAttributes } from '../models/user';
import { setRoleToUser } from './user.role.controller';
import { user_token } from '../models/user_token';
import { changeModelTimestamp } from '../lib/common';
import { verificationToken } from '../lib/type';

export async function userDuplicateChecker(
  user_name: string,
  display_name: string
): Promise<string | boolean> {
  const userName = await user.findOne({
    where: {
      user_name,
    },
  });

  if (userName) {
    return 'user_name is unique';
  }

  const displayName = await user.findOne({
    where: {
      display_name: display_name,
    },
  });

  if (displayName) {
    return 'display_name already exist';
  }

  return false;
}

export async function insertUser(
  userInfo: userAttributes
): Promise<userAttributes | string> {
  try {
    return await DB.transaction(async (transaction) => {
      const theUser = await user.create(
        {
          user_id: uuidV4(),
          ...userInfo,
          is_active: 'Y',
        },
        { transaction }
      );
      if (!theUser) {
        throw new Error('user create fail');
      }

      const roleData = await setRoleToUser(
        {
          user_id: theUser.user_id!,
        },
        transaction
      );

      if (roleData != 'ok') {
        throw new Error(roleData);
      }

      const result = await user.findOne({
        where: {
          user_id: theUser.user_id,
        },
        transaction,
      });
      if (!result) {
        throw new Error('create fail');
      }

      return result;
    });
  } catch (error) {
    return error.message;
  }
}

export async function userValidator(
  userName: string,
  password: string
): Promise<user | string> {
  const theUser = await user.findOne({
    where: {
      user_name: userName,
    },
  });
  if (!theUser) {
    return 'user not founded';
  }

  if (theUser?.is_active == 'N') {
    return 'inactive user';
  }
  if (theUser.password != password) {
    return 'invalid password';
  }
  delete theUser.password;
  return theUser;
}

export async function loginProcess(
  theUser: user,
  userAgent?: string
): Promise<
  | {
      accessToken: string;
      refreshToken: string;
      expires: number;
      expires_refresh: number;
    }
  | string
> {
  const token = {
    user_token_id: uuidV4(),
    user_id: theUser.user_id,
    access_point: userAgent,
  };
  const accessToken =
    'Bearer ' +
    jwt.sign(
      {
        user_id: token.user_id,
        sub: 'access_token',
      },
      JWT_SALT,
      {
        expiresIn: JWT_EXPIRE_ACCESS,
      }
    );
  const refreshToken =
    'Bearer ' +
    jwt.sign(
      {
        user_id: token.user_id,
        token_id: token.user_token_id,
        sub: 'refresh_token',
      },
      JWT_SALT,
      {
        expiresIn: JWT_EXPIRE_REFRESH,
      }
    );

  const timestamp = Math.floor(+new Date());
  const time = timestamp + ms(JWT_EXPIRE_ACCESS);
  const time_refresh = timestamp + ms(JWT_EXPIRE_REFRESH);

  const tokenRows = await user_token.findAll({
    where: {
      user_id: token.user_id,
    },
  });

  try {
    return await DB.transaction(async (transaction) => {
      if (tokenRows) {
        await Promise.all(tokenRows.map((row) => row.destroy({ transaction })));
      }

      const userToken = await user_token.create(token, { transaction });
      if (!userToken) {
        throw new Error('userToken create fail');
      }
      return {
        accessToken,
        refreshToken,
        expires: <number>changeModelTimestamp(time),
        expires_refresh: <number>changeModelTimestamp(time_refresh),
      };
    });
  } catch (error) {
    return error.message;
  }
}

export async function getUserById(user_id: string): Promise<user | string> {
  const theUser = await user.findOne({
    where: { user_id: user_id, is_active: 'Y' },
  });
  if (!theUser) {
    return 'user not founded';
  }
  return theUser;
}

export async function getUserByName(user_name: string): Promise<user | string> {
  const theUser = await user.findOne({
    where: { user_name: user_name, is_active: 'Y' },
  });
  if (!theUser) {
    return 'user not founded';
  }
  return theUser;
}

export async function deleteUser(user_id: string): Promise<string> {
  const tokenRow = await user_token.findOne({
    where: {
      user_id: user_id,
    },
  });
  const theUser = await user.findOne({ where: { user_id: tokenRow?.user_id } });
  if (!theUser) {
    return 'user not founded';
  }
  if (theUser.is_active == 'N') {
    return 'already inactive user';
  }

  if (tokenRow) {
    await theUser.update({
      is_active: 'N',
    });
    await tokenRow.destroy();
    return 'ok';
  } else {
    return 'not founded';
  }
}

export async function setUserByModel(
  model: user,
  data: userAttributes
): Promise<userAttributes | string> {
  try {
    await model.update(data);
  } catch (error) {
    return error.message;
  }

  return model.get({ plain: true });
}

export async function logoutProcess(user_id: string): Promise<string> {
  const tokenRow = await user_token.findOne({
    where: {
      user_id: user_id,
    },
  });
  if (!tokenRow) {
    return 'invalid token';
  }
  try {
    await tokenRow.destroy();
  } catch (error) {
    return error.message;
  }
  return 'ok';
}
