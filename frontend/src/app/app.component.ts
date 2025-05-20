import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
//import { RouterOutlet } from '@angular/router';

import { NameInputComponent } from './name-input/name-input.component';
import { PlayerComponent } from './player/player.component';
import { CardPickerComponent } from './card-picker/card-picker.component';
import { ControlsComponent } from './controls/controls.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, NameInputComponent, PlayerComponent, CardPickerComponent, ControlsComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  waiting: boolean = true;

  constructor(private socketService: SocketService) {}

  isAdmin() {
    return localStorage.getItem('playerName') == 'Leo';
  }

  ngOnInit() {
    this.socketService.socket.on('connect', () => {
      this.waiting = false;
    });
  }
}
