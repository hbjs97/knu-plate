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
