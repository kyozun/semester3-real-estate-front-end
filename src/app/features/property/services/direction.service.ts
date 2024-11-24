import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Direction } from '../../../shared/models/direction';
import { ApiResponse } from '../../../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private http = inject(HttpClient);
  private directionsSubject = new BehaviorSubject<Direction[]>([]);

  getDirections$() {
    return this.directionsSubject.asObservable();
  }

  setDirections$(directions: Direction[]) {
    this.directionsSubject.next(directions);
  }

  getDirections() {
    return this.http
      .get<ApiResponse<Direction>>(`${environment.apiUrl}/direction?limit=10`)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (items) => {
          this.setDirections$(items);
        },
        error: () => {},
      });
  }
}
