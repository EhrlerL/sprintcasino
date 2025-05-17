import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

import { NameInputComponent } from './name-input/name-input.component';
import { PlayerComponent } from './player/player.component';
import { CardPickerComponent } from './card-picker/card-picker.component';
import { ControlsComponent } from './controls/controls.component';

@Component({
  selector: 'app-root',
  imports: [NameInputComponent, PlayerComponent, CardPickerComponent, ControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  isAdmin() {
    return localStorage.getItem('playerName') == 'Leo';
  }
}
