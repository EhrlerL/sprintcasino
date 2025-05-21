import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-controls',
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  revealed: boolean | null = false;
  constructor(private socketService: SocketService) {
    this.socketService.lobby$.subscribe((lobby) => {
      if (lobby) {
        this.revealed = lobby.revealed;
      }
    }
    );
  }

  reveal() {
    this.revealed = true;
    this.socketService.reveal();
    console.log('Reveal button clicked');
  }

  reset() {
    this.revealed = false;
    this.socketService.reset();
    console.log('Reset button clicked');
  }

  // Check if the current player is the admin
  isAdmin(): boolean {
    const selfPlayer = this.socketService.getSelfPlayer();
    return selfPlayer?.isAdmin || false;
  }

}
