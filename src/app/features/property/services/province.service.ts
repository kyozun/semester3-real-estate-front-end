import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/models/api-response';
import { Province } from '../../../shared/models/province';
import { District } from '../../../shared/models/district';
import { Ward } from '../../../shared/models/ward';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  private http = inject(HttpClient);

  /*Province*/
  private provincesSubject = new BehaviorSubject<Province[]>([]);

  /*District*/
  private districtsSubject = new BehaviorSubject<District[]>([]);

  /*Ward*/
  private wardsSubject = new BehaviorSubject<Ward[]>([]);

  getProvinces$() {
    return this.provincesSubject.asObservable();
  }

  setProvinces$(provinces: Province[]) {
    this.provincesSubject.next(provinces);
  }

  getDistricts$() {
    return this.districtsSubject.asObservable();
  }

  setDistricts$(districts: District[]) {
    this.districtsSubject.next(districts);
  }

  getWards$() {
    return this.wardsSubject.asObservable();
  }

  setWards$(wards: Ward[]) {
    this.wardsSubject.next(wards);
  }

  getProvinces() {
    return this.http
      .get<ApiResponse<Province>>(`${environment.apiUrl}/province?limit=10`)
      .pipe(map((response) => response.data))
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
      .pipe(map((response) => response.data))
      .subscribe({
        next: (items) => {
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
      .get<ApiResponse<Ward>>(`${environment.apiUrl}/ward?districtId=${districtId}&limit=10`)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (items) => {
          this.wardsSubject.next(items);
        },
        error: () => {
          this.wardsSubject.next([]);
        },
      });
  }
}
