import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, debounceTime, delay, distinctUntilChanged, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/models/api-response';
import { defaultProperty, Property } from '../models/property';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
  deps: [MessageService],
})
export class PropertyService {
  private http = inject(HttpClient);
  private router = inject(Router);

  /*PropertyList*/
  private propertiesSubject: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);

  /*Property Detail*/
  private propertySubject = new BehaviorSubject<Property>(defaultProperty);

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  private propertiesSearchSubject = new BehaviorSubject<Property[]>([]);
  private searchKeywordSubject: Subject<string> = new Subject<string>();
  private messageService = inject(MessageService);

  constructor() {
    this.searchKeywordSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchTerm) => this.getPropertiesSearch(`title=${searchTerm}`))
      )
      .subscribe();
  }

  getPropertiesSearch$() {
    return this.propertiesSearchSubject.asObservable();
  }

  setPropertiesSearch$(properties: Property[]) {
    return this.propertiesSearchSubject.next(properties);
  }

  getProperty$() {
    return this.propertySubject.asObservable();
  }

  setProperty$(property: Property): void {
    this.propertySubject.next(property);
  }

  setSearchKeyWordSubject(keyword: string) {
    this.searchKeywordSubject.next(keyword);
  }

  getProperties$(): Observable<Property[]> {
    return this.propertiesSubject.asObservable();
  }

  setProperties$(properties: Property[]) {
    this.propertiesSubject.next(properties);
  }

  getLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  setLoading$(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  searchByKeyword(keyword: string) {
    this.setSearchKeyWordSubject(keyword);
  }

  getProperties(query: string) {
    this.setLoading$(true);
    return this.http
      .get<ApiResponse<Property>>(`${environment.apiUrl}/property?${query}&limit=99`)
      .pipe(
        map((response) => response.data),
        tap((properties) => {
          this.setProperties$(properties);
          this.setLoading$(false);
        })
      )
      .subscribe({
        next: (items) => {
          this.setProperties$(items);
        },
        error: () => {
          this.setLoading$(false);
        },
      });
  }

  createProperty(payload: any) {
    this.http
      .post(environment.apiUrl + '/property', payload)
      .pipe(
        tap(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create Property Successfully',
          })
        ),
        delay(1000)
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/my-account/all-listings']);
        },
        error: () => {
          console.log('ERROR');
        },
      });
  }

  getPropertiesSearch(query: string) {
    return this.http.get<ApiResponse<Property>>(`${environment.apiUrl}/property?${query}&limit=99`).pipe(
      map((response) => response.data),
      tap((properties) => {
        this.setPropertiesSearch$(properties);
      })
    );
  }

  getProperty(propertyId: string) {
    this.setLoading$(true);
    return this.http
      .get<Property>(`${environment.apiUrl}/property/${propertyId}`)
      .pipe(
        tap(() => {
          this.setLoading$(false);
        })
      )
      .subscribe({
        next: (items) => {
          this.setProperty$(items);
        },
        error: () => {
          this.setLoading$(false);
        },
      });
  }
}
