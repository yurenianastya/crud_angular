import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CampaignTableComponent } from './campaign-table/campaign-table.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    CampaignTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
}
