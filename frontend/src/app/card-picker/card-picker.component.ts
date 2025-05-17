import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-picker',
  imports: [CommonModule],
  templateUrl: './card-picker.component.html',
  styleUrl: './card-picker.component.css'
})
export class CardPickerComponent {
  fibonacciButtons: string[] = ["1","2","3","5","8","13","21","34","55","89","?","∞","☕️"];
  style: string = "btn-outline btn-primary";
  selectedCard: string = "Keine";

  constructor(private card: CardService) {}

  handleClick(label: string) {
    this.selectedCard = label;
    this.card.selectCard(label);
    console.log("Selected card:", this.selectedCard);
    // Change Button Style
    if (label === this.selectedCard) {
      this.style = "btn-primary";
    }
  }
}
