import { Component, inject } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CampaignManageDialogComponent } from '../campaign-manage-dialog/campaign-manage-dialog.component';
import { CampaignService } from '../campaign.service';
import { ThemeService } from '../theme.service';

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

  balance!: number;
  title!: string;
  isSmallWindow!: boolean;

  ngOnInit() {
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
    this.campaignService.balance$.subscribe({
      next: (res) => {
        this.balance = res;
      },
    });
  }

  onThemeChange(isDarkTheme: boolean) {
    this.themeService.toggleTheme(isDarkTheme);
  }

  createNewCampaign() {
    const dialogRef = this.dialog.open(CampaignManageDialogComponent);
    dialogRef.afterClosed().subscribe({
      error: (err) => {
        if (err) {
          console.error('Error while creating new campaign:', err)
        }
      },
    });
  }
}
