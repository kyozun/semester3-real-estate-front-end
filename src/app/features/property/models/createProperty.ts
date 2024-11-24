import { PropertyImage } from './property-image';

export interface CreateProperty {
  title: string;
  description: string;
  address : string;
  price: number;
  furniture: string;
  area: number;
  floor: number;
  bedroom: number;
  bathroom: number;
  propertyImages: File[];
  coverImage: File;
  categoryId: string;
  directionId: string;
  wardId: number;
  juridicalId: string;
  propertyTypeId: string;
}
