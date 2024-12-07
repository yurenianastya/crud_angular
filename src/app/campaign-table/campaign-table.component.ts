import { Component } from '@angular/core';
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
  isSmallWindow = false;

  constructor(
    private dialog: MatDialog,
    private campaignService: CampaignService,
  ) {
  }

  ngOnInit(): void {
    this.getCampaignList();
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
          alert('Campaign deleted.');
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
