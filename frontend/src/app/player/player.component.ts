import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { RevealedService } from '../revealed.service';
import { NameService } from '../name.service';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';

interface Player {
  name: string;
  vote: string | null;
}
interface Players {
  [id: string]: Player;
}

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  lobby: any = { players: {}, revealed: false };
  players: Players = {};
  playerName: string = '';
  selectedCard: string | null = null;
  choice: string = '...';

  // The playerName is retrieved from localStorage, if it exists
  constructor(private cardService: CardService, private revealedService: RevealedService, private nameService: NameService, private socketService: SocketService) {
    
  }

  // The selectedCard is retrieved from the CardService
  // and is updated whenever a new card is selected
  ngOnInit(): void {
    this.socketService.lobby$.subscribe((lobby) => {
      if (lobby) {
        this.lobby = lobby;
        this.players = lobby?.players || {};
        this.playerName = this.socketService.getSelfName();
        const socketId = this.socketService.socketId;
        this.selectedCard = socketId
          ? this.socketService.lobby$.getValue()?.players[socketId]?.vote || null
          : null;
      }
      if (lobby.revealed) {
        this.choice = this.selectedCard || 'Keine';
      } else {
        this.choice = '...';
        this.selectedCard = "Keine";
      }
    });
  }


}
