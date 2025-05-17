import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../card.service';
import { RevealedService } from '../revealed.service';

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
  revealed: boolean | null = false;

  constructor(private cardService: CardService, private revealedService: RevealedService) {}

  handleClick(label: string) {
    this.selectedCard = label;
    this.cardService.selectCard(label);
    console.log("Selected card:", this.selectedCard);
    // Change Button Style
    if (label === this.selectedCard) {
      this.style = "btn-primary";
    }
  }

  ngOnInit() {
    this.revealedService.revealed$.subscribe((revealed) => {
      if (revealed) {
        this.revealed = revealed;
      } else {
        this.revealed = false;
        this.selectedCard = "Keine";
        this.style = "btn-outline btn-primary";
      }
    });
  }
}
