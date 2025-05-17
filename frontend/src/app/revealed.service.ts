import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevealedService {
  private revealed = new BehaviorSubject<boolean | null>(null);
  revealed$ = this.revealed.asObservable();

  revealCards() {
    this.revealed.next(true);
  }

  newRound() {
    this.revealed.next(false);
  }

  isRevealed() {
    return this.revealed.getValue();
  }

  constructor() { }
}
