import { Transaction } from 'sequelize/types';
import { user_role, user_roleAttributes } from '../models/user_role';
import {
  user_role_group,
  user_role_groupAttributes,
} from '../models/user_role_group';

export async function setRoleToUser(
  data: {
    user_id: string;
  },
  transaction: Transaction
): Promise<string> {
  const groupIndex = await user_role_group.findOne({
    where: {
      name: 'COMMON_USER',
    },
    attributes: ['user_role_group_id'],
    transaction,
  });

  if (!groupIndex || !groupIndex.user_role_group_id) {
    return 'default role is empty';
  }

  const userRole = await user_role.create(
    {
      user_role_group_id: groupIndex.user_role_group_id,
      user_id: data.user_id,
    },
    { transaction }
  );
  if (!userRole) {
    return 'user_role create fail';
  }

  return 'ok';
}

export async function getUserRoleByUserID(user_id: string): Promise<string> {
  const userRole:
    | (user_roleAttributes & { user_role_group?: user_role_groupAttributes })
    | null = await user_role.findOne({
    where: {
      user_id: user_id,
    },
    include: {
      association: 'user_role_group',
    },
  });

  if (userRole?.user_role_group?.name) {
    return userRole.user_role_group.name;
  } else {
    return 'not founded';
  }
}
