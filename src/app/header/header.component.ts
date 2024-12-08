import { Component, inject, Input } from '@angular/core';
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

  readonly dialog = inject(MatDialog);
  readonly campaignService = inject(CampaignService);
  readonly themeService = inject(ThemeService);
  readonly observerBreakpoint = inject(BreakpointObserver);

  @Input() balance!: number;
  title!: string;
  isSmallWindow!: boolean;

  constructor() {
    this.observerBreakpoint.observe([
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
        this.balance = res.value;
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
          this.balance = this.balance - Number(val);
          let patchData = {
            "value": this.balance
          }
          this.campaignService.updateBalance(patchData).subscribe({
            next: (response) => {
              console.log('Balance updated successfully:', response);
            },
            error: (err) => {
              console.error('Error updating balance:', err);
            },
          });;
          this.campaignService.getCampaigns();
        }
      },
    });
  }

}
