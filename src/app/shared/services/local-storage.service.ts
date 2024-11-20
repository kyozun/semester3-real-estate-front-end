import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../models/local-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Add or update an item
  setItem<T>(key: LocalStorageKeys, value: T): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  // Get an item
  getItem<T>(key: LocalStorageKeys): T | null {
    const stringValue = localStorage.getItem(key);
    return stringValue ? JSON.parse(stringValue) : null;
  }

  // Remove an item
  removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }

  // Clear all
  clear(): void {
    localStorage.clear();
  }

  // Check if a key exists
  hasKey(key: LocalStorageKeys): boolean {
    return localStorage.getItem(key) !== null;
  }
}
