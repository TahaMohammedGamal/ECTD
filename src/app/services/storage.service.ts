import { Injectable } from '@angular/core';
import { SafeHardAny } from '../core/safe-any-type';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  set(key: string, data: SafeHardAny): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): SafeHardAny {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value || '{}');
  }

  clear(): void {
    sessionStorage.clear();
  }
}
