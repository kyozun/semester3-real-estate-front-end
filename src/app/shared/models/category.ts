import { Property } from './property'

export interface Category {
  categoryId: string;
  name: string;
  properties: Property[];
}
