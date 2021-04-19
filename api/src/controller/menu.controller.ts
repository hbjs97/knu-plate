import { DB } from '../lib/sequelize';
import { Op, Sequelize } from 'sequelize';
import { menu } from '../models/menu';
import { getMallById } from './mall.controller';

export async function enrollMenu(
  mall_id: number,
  menu_name: string
): Promise<string | menu> {
  const theMall = await getMallById(mall_id);
  if (typeof theMall == 'string') {
    return theMall;
  }
  if (theMall.is_active != 'Y') {
    return 'inactive mall';
  }

  const menuDuplicateCheck = await getMenuByName(menu_name);
  if (typeof menuDuplicateCheck != 'string') {
    return 'duplicated menu';
  }

  const enrolledMenu = await menu.create({
    mall_id: mall_id,
    menu_name: menu_name,
  });
  if (!enrolledMenu) {
    return 'menu create fail';
  }
  return await getMenuById(enrolledMenu.menu_id!);
}

export async function getMenuById(menu_id: number): Promise<menu | string> {
  const theMenu = await menu.findOne({ where: { menu_id } });
  if (!theMenu) {
    return 'menu not founded';
  }
  return theMenu;
}

export async function getMenuByName(menu_name: string): Promise<menu | string> {
  const theMenu = await menu.findOne({ where: { menu_name } });
  if (!theMenu) {
    return 'menu not founded';
  }
  return theMenu;
}
