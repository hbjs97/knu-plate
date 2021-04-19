import { DB } from '../lib/sequelize';
import { Op, Sequelize } from 'sequelize';
import { my_recommend } from '../models/my_recommend';
import { getMallById } from './mall.controller';

export async function isMyRecommend(
  user_id: string,
  mall_id: number
): Promise<boolean> {
  const isRecommend = await getMyRecommend(user_id, mall_id);
  if (typeof isRecommend == 'string') {
    return false;
  }
  return true;
}

export async function getMyRecommend(
  user_id: string,
  mall_id: number
): Promise<my_recommend | string> {
  const theMall = await getMallById(mall_id);
  if (typeof theMall == 'string') {
    return theMall;
  }

  const theRecommend = await my_recommend.findOne({
    where: {
      user_id,
      mall_id,
      is_active: 'Y',
    },
  });
  if (!theRecommend) {
    return 'not founded';
  }
  return theRecommend;
}
