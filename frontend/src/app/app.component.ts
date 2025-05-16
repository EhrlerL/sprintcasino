import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

import { NameInputComponent } from './name-input/name-input.component';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-root',
  imports: [NameInputComponent, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
