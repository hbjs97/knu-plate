import { isEqual } from 'lodash';
import { PER_PAGE } from '../lib/constant';
import { Op } from '../lib/sequelize';
import { notice, noticeAttributes } from '../models/notice';

export async function getNoticeById(
  notice_id: number
): Promise<notice | string> {
  const theNotice = await notice.findOne({
    where: {
      notice_id,
    },
  });
  if (!theNotice) {
    return 'notice not founded';
  }
  if (theNotice.is_active != 'Y') {
    return 'inactive notice';
  }

  return theNotice;
}

export async function enrollNotice(
  noticeModel: noticeAttributes
): Promise<notice | string> {
  const enrolledNotice = await notice.create(noticeModel);
  if (!enrolledNotice) {
    return 'notice create fail';
  }
  return await getNoticeById(enrolledNotice.notice_id!);
}

export async function getNoticeList(cursor: number): Promise<notice[]> {
  const noticeList = await notice.findAll({
    order: [['notice_id', 'DESC']],
    where: {
      is_active: 'Y',
      notice_id: {
        [Op.lt]: cursor,
      },
    },
    limit: PER_PAGE,
  });
  return noticeList;
}

export async function deleteNotice(theNotice: notice): Promise<string> {
  const deletedNotice = await theNotice.update({ is_active: 'N' });
  if (deletedNotice.is_active != 'N') {
    return 'notice delete fail';
  }
  return 'ok';
}

export async function updateNotice(
  noticeModel: noticeAttributes
): Promise<notice | string> {
  await notice.update(noticeModel, {
    where: {
      notice_id: noticeModel.notice_id,
    },
  });
  const theNotice = await getNoticeById(noticeModel.notice_id!);
  if (typeof theNotice == 'string') {
    return theNotice;
  }
  if (!isEqual(noticeModel, theNotice.get({ plain: true }))) {
    return 'notice update fail';
  }
  return theNotice;
}
