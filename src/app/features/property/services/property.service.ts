import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private baseUrl = 'https://dummyjson.com/products';
  private http = inject(HttpClient);

  /*PropertyList*/
  private propertiesSubject = new BehaviorSubject<any[]>([]);
  properties$ = this.propertiesSubject.asObservable();

  /*Property Detail*/
  private propertySubject = new BehaviorSubject<any>('');
  property$ = this.propertySubject.asObservable();

  /*Property Type*/
  private propertyTypeSubject = new BehaviorSubject<any>('');
  propertyType$ = this.propertyTypeSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  getProperties(query: string) {
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${this.baseUrl}/search?${query}`)
      .pipe(
        map((response) => response.products),
        tap(() => {
          // Stop loading
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe({
        next: (realEstates) => {
          this.propertiesSubject.next(realEstates);
        },
        error: () => {
          this.isLoadingSubject.next(false);
        },
      });
  }

  getProperty(id: string) {
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${this.baseUrl}/${id}`)
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

  getPropertyType() {
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${this.baseUrl}/category-list`)
      .pipe(
        tap(() => {
          // Stop loading
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe({
        next: (propertyType) => {
          this.propertyTypeSubject.next(propertyType);
        },
        error: () => {
          this.isLoadingSubject.next(false);
        },
      });
  }
}
