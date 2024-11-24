import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';
import { environment } from '../../../../environments/environment.development';
import { Juridical } from '../../../shared/models/juridical';

@Injectable({
  providedIn: 'root',
})
export class JuridicalService {
  private http = inject(HttpClient);
  private juridicalsSubject = new BehaviorSubject<Juridical[]>([]);

  getJuridicals$() {
    return this.juridicalsSubject.asObservable();
  }

  setJuridicals$(juridicals: Juridical[]) {
    this.juridicalsSubject.next(juridicals);
  }

  getJuridicals() {
    return this.http
      .get<ApiResponse<Juridical>>(`${environment.apiUrl}/juridical?limit=10`)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (items) => {
          this.setJuridicals$(items);
        },
        error: () => {},
      });
  }
}
