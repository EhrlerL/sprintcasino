import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-name-input',
  imports: [],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.css'
})
export class NameInputComponent implements AfterViewInit {
  
  playerName: string = localStorage.getItem('playerName') || '';
  @ViewChild('nameModal') nameModal!: ElementRef;
  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor() {}

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.playerName = input.value;
  }

  onSubmit() {
    localStorage.setItem('playerName', this.playerName);
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
    if (!localStorage.getItem('playerName')) {
      // Show the modal if playerName is not set
      console.log(this.nameModal)
      this.nameModal.nativeElement.showModal();
      console.log('Modal shown');
    } else {
      this.nameInput.nativeElement.value = localStorage.getItem('playerName');
    }
  }


}
