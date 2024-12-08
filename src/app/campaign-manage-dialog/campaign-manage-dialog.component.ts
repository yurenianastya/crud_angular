import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CampaignService } from '../campaign.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface DialogData {
  name: string;
  keywords: string[];
  bidAmount: number;
  fund: number;
  status: boolean;
  town: string;
  radius: number;
  id: number;
}

@Component({
  selector: 'app-campaign-manage-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './campaign-manage-dialog.component.html',
  styleUrl: './campaign-manage-dialog.component.scss'
})
export class CampaignManageDialogComponent {

  readonly dialogRef = inject(MatDialogRef<CampaignManageDialogComponent>);
  readonly campaignService = inject(CampaignService);
  private formBuilder = inject(FormBuilder);
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  campaignForm = this.formBuilder.group({
    name: [this.data.name || '', Validators.required],
    keywords: [this.data.keywords || [''], Validators.required],
    bidAmount: [this.data.bidAmount || 0, Validators.required],
    fund: [this.data.fund || 0, Validators.required],
    status: [this.data.status || true, Validators.required],
    town: [this.data.town || '', Validators.required],
    radius: [this.data.radius || 0, Validators.required],
  })

  onSubmit() {
    if (this.campaignForm.valid) {
      if (this.data) {
        this.campaignService
        .updateCampaign(this.data.id, this.campaignForm.value)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          }, error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.campaignService.addCampaign(this.campaignForm.value).subscribe({
          next: (val: any) => {
            this.campaignForm.reset();
            // passing fund value to update balance
            this.dialogRef.close(val.fund);
          },
          error: (err: any) => {
            console.error(err);
          },
        })
      }
    }
  }
}
