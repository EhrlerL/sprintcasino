import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-card-picker',
  imports: [CommonModule],
  templateUrl: './card-picker.component.html',
  styleUrl: './card-picker.component.css'
})
export class CardPickerComponent {
  fibonacciButtons: string[] = ["1","2","3","5","8","13","21","34","55","89","?","∞","☕️"];
  selectedCard: string = "Keine";
  revealed: boolean | null = false;

  constructor(private socketService: SocketService) {}

  handleClick(label: string) {
    this.selectedCard = label;
    this.socketService.vote(label);
    console.log("Selected card:", this.selectedCard);
  }

  ngOnInit() {
    this.socketService.lobby$.subscribe((lobby) => {
      this.selectedCard = lobby.players[this.socketService.getSelfId()]?.vote || "Keine";
      if (lobby.revealed) {
        this.revealed = lobby.revealed;
      } else {
        this.revealed = false;
      }
    });
  }
}
