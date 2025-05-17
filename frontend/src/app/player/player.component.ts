import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { RevealedService } from '../revealed.service';
import { NameService } from '../name.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  playerName: string = '';
  selectedCard: string | null = null;
  choice: string = '...';

  // The playerName is retrieved from localStorage, if it exists
  constructor(private cardService: CardService, private revealedService: RevealedService, private nameService: NameService) {
  }

  // The selectedCard is retrieved from the CardService
  // and is updated whenever a new card is selected
  ngOnInit(): void {
    this.cardService.selectedCard$.subscribe(card => {
      this.selectedCard = card;
    });
    this.revealedService.revealed$.subscribe(revealed => {
      if (revealed) {
        this.choice = this.selectedCard || 'Keine';
      } else {
        this.choice = '...';
      }
    });
    this.nameService.playerName$.subscribe((name) => {
      this.playerName = name || '';
    });
  }


}
