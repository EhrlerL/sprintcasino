import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  playerName: string = '';
  status: string = 'error';
  selectedCard: string | null = null;

  constructor(private card: CardService) {
    this.playerName = localStorage.getItem('playerName') || '';
  }

  ngOnInit(): void {
    this.card.selectedCard$.subscribe(card => {
      this.selectedCard = card;
    });
  }
}
