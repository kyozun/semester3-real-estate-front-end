import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  public isLoading = true;
  private baseUrl = 'https://dummyjson.com/products';
  private http = inject(HttpClient);

  /*PropertyList*/
  private realEstatesSubject = new BehaviorSubject<any[]>([]);
  realEstates$ = this.realEstatesSubject.asObservable();

  /*Property Detail*/
  private realEstateSubject = new BehaviorSubject<any>('');
  realEstate$ = this.realEstateSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  getRealEstates(query: string) {
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${this.baseUrl}/search?q=${query}`)
      .pipe(
        map((response) => response.products),
        tap(() => {
          // Stop loading
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe({
        next: (realEstates) => {
          this.realEstatesSubject.next(realEstates);
        },
        error: () => {
          this.isLoadingSubject.next(false);
          ``;
        },
      });
  }

  getRealEstate(id: string) {
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
          this.realEstateSubject.next(realEstate);
        },
        error: () => {
          this.isLoadingSubject.next(false);
        },
      });
  }
}
