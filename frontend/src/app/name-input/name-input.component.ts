import { Component, ElementRef, ViewChild } from '@angular/core';
import { NameService } from '../name.service';

@Component({
  selector: 'app-name-input',
  imports: [],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.css'
})
export class NameInputComponent {
  
  playerName: string = localStorage.getItem('playerName') || '';
  @ViewChild('nameModal') nameModal!: ElementRef;
  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(private nameService: NameService) {}

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.playerName = input.value;
  }

  onSubmit() {
    this.nameService.setPlayerName(this.playerName);
    console.log('Submitted name:', this.playerName);
  }

  inputIsValid(): boolean {
    if (!/[a-zA-Z0-9\-\.]*[a-zA-Z0-9\-\. ]*/.test(this.playerName)) {
      return false;
    } else if (this.playerName.length < 3) {
      return false;
    } else if (this.playerName.length > 20) {
      return false;
    } else {
      return true;
    }
  }

  ngAfterViewInit() {
    this.nameService.playerName$.subscribe((name) => {
      this.playerName = name || '';
    });
    if (this.playerName === '') {
        this.nameModal.nativeElement.showModal();
      } else {
        this.nameInput.nativeElement.value = localStorage.getItem('playerName');
      }
  }


}
