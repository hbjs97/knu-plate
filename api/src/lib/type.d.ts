import { mallAttributes } from '../models/mall';
import { menu } from '../models/menu';
import { my_recommend } from '../models/my_recommend';
import { review } from '../models/review';

export interface verificationToken {
  user_id?: string;
  token_id?: string;
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

export interface mallExpand extends mallAttributes {
  menu?: menu[];
  my_recommend?: string;
}
