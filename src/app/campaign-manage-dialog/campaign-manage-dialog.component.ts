import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-campaign-manage-dialog',
  imports: [
    MatDialogModule,
    MatFormField,
  ],
  templateUrl: './campaign-manage-dialog.component.html',
  styleUrl: './campaign-manage-dialog.component.scss'
})
export class CampaignManageDialogComponent {

}
