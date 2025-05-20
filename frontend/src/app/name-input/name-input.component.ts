import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-input',
  imports: [FormsModule],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.css'
})
export class NameInputComponent {
  
  playerName: string = '';
  @ViewChild('nameModal') nameModal!: ElementRef;

  constructor(private socketService: SocketService) {}

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.playerName = input.value;
  }

  onSubmit() {
    this.socketService.join(this.playerName);
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
    this.socketService.socket.on('connect', () => {
      this.socketService.lobby$.subscribe((lobby) => {
        if (lobby) {
          this.playerName = this.socketService.getSelfName();
        } else {
          this.playerName = "ERROR - LOBBY UNDEFINED";
        }
      });
      this.nameModal.nativeElement.showModal();
    });
  }
}
