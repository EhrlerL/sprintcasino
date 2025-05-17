import { Component } from '@angular/core';
import { RevealedService } from '../revealed.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controls',
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  revealed: boolean | null = false;
  constructor(private revealedService: RevealedService) {}

  reveal() {
    this.revealedService.revealCards();
    this.revealed = true;
    console.log('Reveal button clicked');
  }

  reset() {
    this.revealedService.newRound();
    this.revealed = false;
    console.log('Reset button clicked');
  }

  isAdmin() {
    return localStorage.getItem('playerName') == 'Leo';
  }

}
