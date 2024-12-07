import { Component, inject } from '@angular/core';
import { ThemeService } from '../theme.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CampaignManageDialogComponent } from '../campaign-manage-dialog/campaign-manage-dialog.component';
import { CampaignService } from '../campaign.service';

import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatButton,
    MatSlideToggle,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  balance: Number = 0.0;
  title: String = '';
  isSmallWindow = false;

  constructor(
    private dialog: MatDialog,
    private campaignService: CampaignService,
    private themeService: ThemeService,
    private observer: BreakpointObserver,
  ) {
    this.observer.observe([
      "(max-width: 599px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.title = 'Manager';
        this.isSmallWindow = true;       
      } else {
        this.title = 'Campaign manager'
        this.isSmallWindow = false;
      }
    });
    this.getBalance();
  }

  getBalance() {
    this.campaignService.getBalance().subscribe({
      next: (res) => {
        this.balance = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onThemeChange(isDarkTheme: boolean) {
    this.themeService.toggleTheme(isDarkTheme);
  }

  openAndEditCampaignDialog() {
    const dialogRef = this.dialog.open(CampaignManageDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.campaignService.getCampaigns();
        }
      },
    });
  }

}
