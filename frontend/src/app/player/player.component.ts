import { Component } from '@angular/core';
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
  // general use
  selectedCard: string | null = null;
  //use when cards are revealed
  choice: string = '...';

  constructor(private socketService: SocketService) {}

  // isOff checks if player's vote is > 3 away from average
  // after cards are revealed, mark off votes as error (red)
  isOff(vote: string | null): boolean {
    if(vote == null) { return false; }
    if(!this.lobby.revealed) { return false; }
    // gather all votes that are numeric and calculate average
    const votes = Object.values(this.lobby.players)
      .map((player: any) => player.vote)
      .filter((v) => !isNaN(v));
    const average = parseInt(this.socketService.calculateAverage(votes));
    try {
      // check if vote is a number
      return Math.abs(parseInt(vote) - average) > 3;
    } catch (error) {
      // handle the case where vote is not a number
      console.error("Error parsing vote: ", error);
      return false;
    }
  }

  // subscribe to the lobby observable
  // save selectedCard and choice
  // handle lobby revealed state
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
