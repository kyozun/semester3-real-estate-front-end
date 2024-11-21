import { Ward } from './ward';

export interface District {
  districtId: string;
  name: string;
  wards: Ward[];
}
