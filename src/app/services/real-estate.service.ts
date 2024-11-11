import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  public isLoading = true;
  private baseUrl = 'https://dummyjson.com/products/search';
  private http = inject(HttpClient);
  private realEstatesSubject = new BehaviorSubject<any[]>([]);
  realEstates$ = this.realEstatesSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  getRealEstates(query: string) {
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${this.baseUrl}?q=${query}`)
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
        },
      });
  }
}
