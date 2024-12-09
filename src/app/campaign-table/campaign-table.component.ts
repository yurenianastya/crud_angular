import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { CampaignService } from '../services/campaign.service';
import { CampaignManageDialogComponent } from '../campaign-manage-dialog/campaign-manage-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-campaign-table',
  imports: [
    MatIcon,
    MatTableModule,
    NgClass,
  ],
  templateUrl: './campaign-table.component.html',
  styleUrl: './campaign-table.component.scss',
})

export class CampaignTableComponent {

  @Output() balanceDiff = new EventEmitter<boolean>();
  readonly campaignService = inject(CampaignService);
  readonly dialog = inject(MatDialog)
  balance$ = this.campaignService.balance$;
  private balanceSubscription!: Subscription;

  displayedColumns: string[] = [
    'name',
    'keywords',
    'bidAmount',
    'fund',
    'status',
    'town',
    'radius',
    'action',
  ];
  
  dataSource!: MatTableDataSource<any>;
  isSmallWindow!: boolean;

  ngOnInit(): void {
    this.balanceSubscription = this.balance$.subscribe(() => {
      this.getCampaignList();
    });
  }

  getCampaignList() {
    this.campaignService.getCampaigns().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.error('Error fetching campaign list:', err);
      },
    });
  }

  deleteCampaign(row: any) {
    let confirm = window.confirm("Are you sure you want to delete this campaign?");
    if(confirm) {
      this.campaignService.deleteCampaign(row.id).subscribe({
        next: () => {
          this.campaignService.updateBalance(row.fund);
          this.getCampaignList();
        },
        error: (err) => {
          console.error('Error while deleting campaign:', err);
        },
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(CampaignManageDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCampaignList();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.balanceSubscription.unsubscribe();
  }
}
