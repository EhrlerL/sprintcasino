import { Component } from '@angular/core';
import { RevealedService } from '../revealed.service';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controls',
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  revealed: boolean | null = false;
  constructor(private revealedService: RevealedService, private socketService: SocketService) {
    this.socketService.lobby$.subscribe((lobby) => {
      if (lobby) {
        this.revealed = lobby.revealed;
      }
    }
    );
  }

  reveal() {
    //this.revealedService.revealCards();
    this.revealed = true;
    this.socketService.reveal();
    console.log('Reveal button clicked');
  }

  reset() {
    //this.revealedService.newRound();
    this.revealed = false;
    this.socketService.reset();
    console.log('Reset button clicked');
  }

  isAdmin() {
    return localStorage.getItem('playerName') == 'Leo';
  }

}
