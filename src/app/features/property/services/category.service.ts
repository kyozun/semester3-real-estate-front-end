import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';
import { Category } from '../../../shared/models/category';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  /*Category*/
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  getCategories$() {
    return this.categoriesSubject.asObservable();
  }

  setCategories$(category: Category[]) {
    this.categoriesSubject.next(category);
  }

  getCategories() {
    return this.http
      .get<ApiResponse<Category>>(`${environment.apiUrl}/category?limit=10`)
      .pipe(
        map((response): Category[] =>
          response.data.map((item: Category) => ({
            categoryId: item.categoryId,
            name: item.name,
          }))
        )
      )
      .subscribe({
        next: (items) => {
          this.setCategories$(items);
        },
        error: () => {},
      });
  }
}
