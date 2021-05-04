import { DB } from '../lib/sequelize';
import { Op, Sequelize } from 'sequelize';
import { menu } from '../models/menu';
import { getMallById } from './mall.controller';

export async function enrollMenu(
  menuList: { mall_id: number; menu_name: string }[]
): Promise<string | menu[]> {
  const enrolledMenuList = await menu.bulkCreate(menuList);
  if (!enrolledMenuList.length) {
    return 'menu create fail';
  }
  return enrolledMenuList;
}

export async function getMenuById(menu_id: number): Promise<menu | string> {
  const theMenu = await menu.findOne({ where: { menu_id } });
  if (!theMenu) {
    return 'menu not founded';
  }
  return theMenu;
}

export async function getMenuByNameAndMallId(
  menu_name: string,
  menu_id: number
): Promise<menu | string> {
  const theMenu = await menu.findOne({ where: { menu_name, menu_id } });
  if (!theMenu) {
    return 'menu not founded';
  }
  return theMenu;
}

export async function menuDuplicateCheck(
  mall_id: number,
  menu_name: string
): Promise<boolean> {
  const theMenu = await menu.findOne({ where: { mall_id, menu_name } });
  if (!theMenu) {
    return false;
  }
  return true;
}
