import { District } from './district';

export interface Province {
  provinceId: string;
  name: string;
  districts: District[];
}
