import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/models/api-response';
import { Category } from '../../../shared/models/category';
import { PropertyType } from '../../../shared/models/property-type';
import { defaultProperty, Property } from '../models/property';
import { SelectOption } from '../../../shared/models/select-option';
import { Direction } from '../../../shared/models/direction';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private http = inject(HttpClient);

  /*PropertyList*/
  private propertiesSubject = new BehaviorSubject<Property[]>([]);
  properties$: Observable<Property[]> = this.propertiesSubject.asObservable();

  /*Property Detail*/
  private propertySubject = new BehaviorSubject<Property>(defaultProperty);
  property$ = this.propertySubject.asObservable();

  /*Category*/
  private categorySubject = new BehaviorSubject<string[]>([]);
  category$: Observable<string[]> = this.categorySubject.asObservable();

  /*Property Type*/
  private propertyTypesSubject = new BehaviorSubject<SelectOption[]>([]);
  propertyTypes$ = this.propertyTypesSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  getProperties(query: string) {
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${environment.apiUrl}/property?${query}&limit=10`)
      .pipe(
        map((response) => response.data),
        tap(() => {
          // Stop loading
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe({
        next: (items) => {
          this.propertiesSubject.next(items);
        },
        error: () => {
          this.isLoadingSubject.next(false);
        },
      });
  }

  getProperty(id: string) {
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${environment.apiUrl}/property/${id}`)
      .pipe(
        tap(() => {
          // Stop loading
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe({
        next: (items) => {
          this.propertySubject.next(items);
        },
        error: () => {
          this.isLoadingSubject.next(false);
        },
      });
  }

  getPropertyTypes() {
    this.http
      .get<ApiResponse<PropertyType>>(`${environment.apiUrl}/property-type?limit=10`)
      .pipe(
        map((response): SelectOption[] =>
          response.data.map((item: PropertyType) => ({
            label: item.name,
            value: item.propertyTypeId,
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

  getCategories() {
    this.isLoadingSubject.next(true);
    this.http
      .get<ApiResponse<Category>>(`${environment.apiUrl}/category?limit=10`)
      .pipe(
        map((response) => response.data.map((item: Category) => item.name)),
        tap(() => {})
      )
      .subscribe({
        next: (items) => {
          this.categorySubject.next(items);
        },
        error: () => {},
      });
  }

  /*Directions*/
  private directionsSubject = new BehaviorSubject<Direction[]>([]);
  directions$: Observable<Direction[]> = this.directionsSubject.asObservable();

  getDirections() {
    this.http
      .get<ApiResponse<Direction>>(`${environment.apiUrl}/direction?limit=10`)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (items) => {
          this.directionsSubject.next(items);
        },
        error: () => {},
      });
  }
}
