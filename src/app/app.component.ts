import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CampaignTableComponent } from './campaign-table/campaign-table.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CampaignTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  updatedBalance!: number;

  updateHeaderBalance(newBalance: number) {
    this.updatedBalance = newBalance;
  }
}
