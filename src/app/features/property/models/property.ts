import { Category } from '../../../shared/models/category';
import { Ward } from '../../../shared/models/ward';
import { Juridical } from '../../../shared/models/juridical';
import { PropertyType } from '../../../shared/models/property-type';
import { PropertyImage } from './property-image';
import { User } from '../../../shared/models/user-response';
import { Direction } from '../../../shared/models/direction';

export interface Property {
  propertyId: string;
  title: string;
  description: string;
  coverImage: string;
  address: string;
  price: number;
  furniture: string;
  area: number;
  floor: number;
  bedroom: number;
  bathroom: number;
  viewCount: number;
  propertyImages: PropertyImage[];
  category: Category;
  direction: Direction;
  ward: Ward;
  juridical: Juridical;
  propertyType: PropertyType;
  user: User;
}

export const defaultProperty: Property = {
  propertyId: '',
  title: '',
  description: '',
  coverImage: '',
  address: '',
  price: 0,
  furniture: '',
  area: 0,
  floor: 0,
  bedroom: 0,
  bathroom: 0,
  viewCount: 0,
  propertyImages: [],
  category: { categoryId: '1', name: '' },
  direction: { directionId: '1', name: '' },
  ward: { wardId: '1', name: '' },
  juridical: { juridicalId: '1', name: '' },
  propertyType: { propertyTypeId: '1', name: '' },
  user: {
    id: '1',
    userName: '',
    email: '',
  },
};
