import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  private playerName = new BehaviorSubject<string | null>(localStorage.getItem('playerName'));
  playerName$ = this.playerName.asObservable();

  getPlayerName() {
    return this.playerName.getValue();
  }

  setPlayerName(name: string) {
    this.playerName.next(name);
    localStorage.setItem('playerName', name);
  }

  constructor() { }
}
