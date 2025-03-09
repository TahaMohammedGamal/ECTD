import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Make the service available application-wide
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable(); // Observable to track loader state

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}