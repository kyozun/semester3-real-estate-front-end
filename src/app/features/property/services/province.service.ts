import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/models/api-response';
import { Province } from '../../../shared/models/province';
import { SelectOption } from '../../../shared/models/select-option';
import { District } from '../../../shared/models/district';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  private http = inject(HttpClient);

  /*Province*/
  private provincesSubject = new BehaviorSubject<SelectOption[]>([]);
  provinces$ = this.provincesSubject.asObservable();

  /*District*/
  private districtsSubject = new BehaviorSubject<SelectOption[]>([]);
  districts$ = this.districtsSubject.asObservable();

  /*Ward*/
  private wardsSubject = new BehaviorSubject<SelectOption[]>([]);
  wards$ = this.wardsSubject.asObservable();

  getProvinces() {
    return this.http
      .get<ApiResponse<Province>>(`${environment.apiUrl}/province?limit=10`)
      .pipe(
        map((response): SelectOption[] =>
          response.data.map((item: Province) => ({
            label: item.name, // Map name to label
            value: item.provinceId, // Map provinceId to value
          }))
        )
      )
      .subscribe({
        next: (items) => {
          this.districtsSubject.next([]);
          this.provincesSubject.next(items);
        },
        error: () => {},
      });
  }

  getDistricts(provinceId: string | null) {
    if (!provinceId) {
      this.districtsSubject.next([]);
      return;
    }

    return this.http
      .get<ApiResponse<District>>(`${environment.apiUrl}/district?provinceId=${provinceId}&limit=10`)
      .pipe(
        map((response): SelectOption[] =>
          response.data.map((item: District) => ({
            label: item.name, // Map name to label
            value: item.districtId, // Map provinceId to value
          }))
        )
      )
      .subscribe({
        next: (items) => {
          console.log(items);
          this.districtsSubject.next(items);
        },
        error: () => {
          this.districtsSubject.next([]);
        },
      });
  }

  getWards(districtId: string | null) {
    if (!districtId) {
      this.wardsSubject.next([]);
      return;
    }

    return this.http
      .get<ApiResponse<District>>(`${environment.apiUrl}/ward?districtId=${districtId}&limit=10`)
      .pipe(
        map((response): SelectOption[] =>
          response.data.map((item: District) => ({
            label: item.name, // Map name to label
            value: item.districtId, // Map districtId to value
          }))
        )
      )
      .subscribe({
        next: (items) => {
          console.log(items);
          this.wardsSubject.next(items);
        },
        error: () => {
          this.wardsSubject.next([]);
        },
      });
  }

}
