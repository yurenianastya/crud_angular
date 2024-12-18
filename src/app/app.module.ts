import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; 

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [],
})
export class AppModule { }
