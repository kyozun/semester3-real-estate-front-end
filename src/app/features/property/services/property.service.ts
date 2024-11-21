import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/models/api-response';
import { Category } from '../../../shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private http = inject(HttpClient);

  /*PropertyList*/
  private propertiesSubject = new BehaviorSubject<any[]>([]);
  properties$ = this.propertiesSubject.asObservable();

  /*Property Detail*/
  private propertySubject = new BehaviorSubject<any>('');
  property$ = this.propertySubject.asObservable();

  /*Category*/
  private categorySubject = new BehaviorSubject<string[]>([]);
  category$: Observable<string[]> = this.categorySubject.asObservable();

  /*Property Type*/
  private propertyTypeSubject = new BehaviorSubject<any>('');
  propertyType$ = this.propertyTypeSubject.asObservable();

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
        next: (properties) => {
          this.propertiesSubject.next(properties);
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
        next: (realEstate) => {
          this.propertySubject.next(realEstate);
        },
        error: () => {
          this.isLoadingSubject.next(false);
        },
      });
  }

  getCategories() {
    this.isLoadingSubject.next(true);
    this.http
      .get<ApiResponse<Category>>(`${environment.apiUrl}/category?limit=10`)
      .pipe(
        map((response) => response.data.map((item: Category) => item.name)),
        tap(() => {
          // Stop loading
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe({
        next: (categories) => {
          this.categorySubject.next(categories);
        },
        error: () => {
          this.isLoadingSubject.next(false);
        },
      });
  }
}
