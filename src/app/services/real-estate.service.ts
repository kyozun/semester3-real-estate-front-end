import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RealEstateService {
    private baseUrl = 'https://dummyjson.com/products/search';
    private http = inject(HttpClient);

    private realEstatesSubject = new BehaviorSubject<any[]>([]);
    realEstates$ = this.realEstatesSubject.asObservable();

    getRealEstates(query: string) {
        this.http
            .get<any>(`${this.baseUrl}?q=${query}`)
            .pipe(map((response) => response.products))
            .subscribe({
                next: (realEstates) => {
                    this.realEstatesSubject.next(realEstates);
                },
                error: (error) => console.error(error),
            });
    }
}
