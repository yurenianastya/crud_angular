import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { CampaignManageDialogComponent } from '../campaign-manage-dialog/campaign-manage-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-campaign-table',
  imports: [
    MatIcon,
    MatTableModule,
  ],
  templateUrl: './campaign-table.component.html',
  styleUrl: './campaign-table.component.scss',
})

export class CampaignTableComponent {

  @Output() balanceChange = new EventEmitter<number>();
  readonly campaignService = inject(CampaignService);
  readonly dialog = inject(MatDialog)

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
    this.getCampaignList();
  }

  sendBalanceToHeader(value: number): void {
    this.balanceChange.emit(value);
  }

  getCampaignList() {
    this.campaignService.getCampaigns().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteCampaign(id: number) {
    let confirm = window.confirm("Are you sure you want to delete this campaign?");
    if(confirm) {
      this.campaignService.deleteCampaign(id).subscribe({
        next: () => {
          this.getCampaignList();
        },
        error: (err) => {
          console.log(err);
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
}
