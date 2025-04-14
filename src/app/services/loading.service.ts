import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable(); // Observable for components to subscribe to

  show() {
    this._loading.next(true); // Show spinner
  }

  hide() {
    this._loading.next(false); // Hide spinner
  }
}
