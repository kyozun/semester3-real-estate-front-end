import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/models/api-response';
import { PropertyType } from '../../../shared/models/property-type';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, map } from 'rxjs';
import { SelectOption } from '../../../shared/models/select-option';
import { HttpClient } from '@angular/common/http';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {
  private http = inject(HttpClient);

  /*Property Type*/
  private propertyTypesSubject = new BehaviorSubject<PropertyType[]>([]);

  getPropertyTypes$() {
    return this.propertyTypesSubject.asObservable();
  }

  setPropertyTypes$(propertyTypes: PropertyType[]): void {
    this.propertyTypesSubject.next(propertyTypes);
  }

  getPropertyTypes() {
    return this.http
      .get<ApiResponse<PropertyType>>(`${environment.apiUrl}/property-type?limit=10`)
      .pipe(
        map((response): PropertyType[] =>
          response.data.map((item: PropertyType) => ({
            name: item.name,
            propertyTypeId: item.propertyTypeId,
          }))
        )
      )
      .subscribe({
        next: (items) => {
          this.propertyTypesSubject.next(items);
        },
        error: () => {},
      });
  }
}
