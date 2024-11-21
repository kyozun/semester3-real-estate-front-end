import { Property } from './property'

export interface PropertyType {
  propertyTypeId: string;
  name: string;
  properties: Property[];
}
