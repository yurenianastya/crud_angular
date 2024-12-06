import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  constructor(private themeService: ThemeService) {}

  title: String = 'Campaign manager';

  onThemeChange(isDarkTheme: boolean) {
    this.themeService.toggleTheme(isDarkTheme);
  }

}
