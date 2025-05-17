import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  private selectedCardSubject = new BehaviorSubject<string | null>(null);
  selectedCard$ = this.selectedCardSubject.asObservable();

  selectCard(card: string) {
    this.selectedCardSubject.next(card);
  }

  clearCard() {
    this.selectedCardSubject.next(null);
  }
}
