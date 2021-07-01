import axios from 'axios';
import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { EXPIRE_AUTH_MAIL, USER_ROLE_GROUP } from '../lib/constant';
import { DB } from '../lib/sequelize';
import { mail_auth } from '../models/mail_auth';
import { getUserById, getUserByMailAddress } from './user.controller';
import { DEV_SMTP_SERVER } from '../lib/config';
import { user_role } from '../models/user_role';

export async function sendAuthMailByUserId(user_id: string): Promise<string> {
  const targetUser = await getUserById(user_id);
  if (typeof targetUser == 'string') {
    return targetUser;
  }

  const newAuthCode = uuidV4().split('-')[0];
  const newExpireTime = dayjs().add(EXPIRE_AUTH_MAIL, 'minute').toDate();
  const mailAuthRow = await getMailAuthByUserId(user_id);
  if (typeof mailAuthRow == 'string') {
    return mailAuthRow;
  }

  const smtpResult = await sendAuthCodeToUserMail(
    targetUser.mail_address!,
    newAuthCode
  );
  if (smtpResult != 'ok') {
    return smtpResult;
  }

  try {
    const updatedMailAuth = await mailAuthRow.update({
      auth_code: newAuthCode,
      date_expire: newExpireTime,
    });
    if (updatedMailAuth.auth_code != newAuthCode) {
      throw new Error('auth code update fail');
    }
    if (updatedMailAuth.date_expire != newExpireTime) {
      throw new Error('date expire update fail');
    }
    return 'ok';
  } catch (error) {
    return error.message;
  }
}

export async function sendAuthCodeToUserMail(
  targetMailAddress: string,
  mailContents: string
): Promise<string> {
  try {
    await axios({
      // url: DEV_SMTP_SERVER + '/api/send-mail',
      url: DEV_SMTP_SERVER,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        targetMailAddress,
        mailContents,
      },
    });
    return 'ok';
  } catch (error) {
    return error.message;
  }
}

export async function getMailAuthByUserId(
  user_id: string
): Promise<string | mail_auth> {
  const mailAuth = await mail_auth.findOne({
    where: {
      user_id: user_id,
    },
  });
  if (!mailAuth) {
    return 'mail_auth not founded';
  }
  return mailAuth;
}

export async function userMailCodeAuthentication(
  user_id: string,
  authCode: string
): Promise<string> {
  const userRole = await user_role.findOne({ where: { user_id: user_id } });
  if (!userRole) {
    return 'user_role not founded';
  }
  const mailAuthRow = await getMailAuthByUserId(user_id);
  if (typeof mailAuthRow == 'string') {
    return mailAuthRow;
  }
  if (mailAuthRow.is_auth != 'N') {
    return 'your account has already been authenticated';
  }
  if (mailAuthRow.auth_code != authCode) {
    return 'auth_code mismatched';
  }

  if (+new Date(mailAuthRow.date_expire!) <= +new Date()) {
    return 'expired auth code';
  }

  try {
    return await DB.transaction(async (transaction) => {
      const updatedUserRole = await userRole.update(
        {
          user_role_group_id: USER_ROLE_GROUP.AUTH_USER,
        },
        { transaction }
      );
      if (updatedUserRole.user_role_group_id != USER_ROLE_GROUP.AUTH_USER) {
        throw new Error('user_role update fail');
      }

      const updatedMailAuthRow = await mailAuthRow.update({
        date_auth: new Date(),
        is_auth: 'Y',
      });
      if (updatedMailAuthRow.is_auth != 'Y') {
        throw new Error('mail_auth update fail');
      }

      return 'ok';
    });
  } catch (error) {
    return error.message;
  }
}

export async function sendUsernameToUsermail(mail_address: string): Promise<string> {
  const theUser = await getUserByMailAddress(mail_address + '@knu.ac.kr');
  if(typeof theUser == 'string') {
    return theUser;
  }
  try {
    await axios({
      // url: DEV_SMTP_SERVER + '/api/send-mail',
      url: DEV_SMTP_SERVER,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        targetMailAddress: theUser.mail_address,
        mailContents: theUser.user_name,
      },
    });
    return 'ok';
  } catch (error) {
    return error.message;
  }
}