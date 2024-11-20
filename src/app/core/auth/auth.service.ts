import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDto, User } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5245/api';

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getUserToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private http = inject(HttpClient);
  private router = inject(Router);

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginDto: LoginDto) {
    this.http.post<User>(`${this.baseUrl}/auth/login`, loginDto).subscribe({
      next: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/']);
      },
      error: () => {
        console.log('Fail Login');
      },
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  getUserToken(): boolean {
    const token = localStorage.getItem('currentUser');
    if (token) {
      return true;
    }
    return false;
  }
}
