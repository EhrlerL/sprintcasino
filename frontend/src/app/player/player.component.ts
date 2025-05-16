import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  playerName: string = '';
  status: string = 'error';

  constructor() {
    this.playerName = localStorage.getItem('playerName') || '';
  }
}
