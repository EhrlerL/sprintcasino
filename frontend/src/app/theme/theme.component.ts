import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme',
  imports: [CommonModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ThemeComponent {

  themes: string[] = ["light", "dark", "caramellatte", "coffee", "retro", "forest", "aqua", "cyberpunk", "valentine"];

  // save theme in local storage and set theme for site
  setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    }
  }
}
