import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CampaignTableComponent } from './campaign-table/campaign-table.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CampaignTableComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
