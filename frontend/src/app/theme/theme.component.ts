import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Theme {
  name: string;
  value: string;
}

@Component({
  selector: 'app-theme',
  imports: [CommonModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})

export class ThemeComponent {

  themes: Theme[] = [
    {name: "☀", value: "light"}, 
    {name: "🌙", value: "dark"}, 
    {name:"🥛", value: "caramellatte"}, 
    {name: "☕️", value: "coffee"}, 
    {name: "📺", value: "retro"}, 
    {name: "🥰", value: "valentine"}
  ];
  currentTheme: Theme = this.themes[0];

  // save theme in local storage and set theme for site
  setTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = this.themes.find(t => t.value == theme) || this.themes[0];
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.body.setAttribute('data-theme', theme || 'light');
      this.currentTheme = this.themes.find(t => t.value == theme) || this.themes[0];
    }
  }
}
