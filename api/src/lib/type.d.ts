import { dashboardAttributes } from '../models/dashboard';
import { file } from '../models/file';
import { mallAttributes } from '../models/mall';
import { menu } from '../models/menu';
import { my_recommend } from '../models/my_recommend';
import { review, reviewAttributes } from '../models/review';
import { userAttributes } from '../models/user';

export interface verificationToken {
  user_id?: string;
  token_id?: string;
}

export interface fileTimestampable extends fileAttributes {
  date_create?: Date | number;
}

export interface addressOutput {
  address_name?: string;
  category_group_code?: string;
  category_group_name?: string;
  category_name?: string;
  distance?: any;
  id?: number;
  phone?: string;
  place_name?: string;
  place_url?: string;
  road_address_name?: string;
  x?: number;
  y?: number;
}

export interface mallExpand extends mall {
  menu?: menu[];
  my_recommend?: string;
}

export interface userExpand extends userAttributes {
  user_thumbnail?: string | file[];
}

export interface reviewExpand {
  review_id?: number;
  user_id?: string;
  mall_id?: number;
  date_create?: Date;
  contents?: string;
  evaluate?: number;
  review_image?: string | file[];
  is_active?: string;
  user?: userExpand;
}

export interface dashboardDayToDay extends dashboardAttributes {
  dtd_report?: number;
  dtd_suggestion?: number;
  dtd_mall?: number;
  dtd_review?: number;
  dtd_user?: number;
}
