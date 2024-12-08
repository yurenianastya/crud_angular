import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
    name: [this.data?.name || '', Validators.required],
    keywords: [this.data?.keywords || [''], Validators.required],
    bidAmount: [this.data?.bidAmount || 0, Validators.required],
    fund: [this.data?.fund || 0, Validators.required],
    status: [this.data?.status || true, Validators.required],
    town: [this.data?.town || '', Validators.required],
    radius: [this.data?.radius || 0, Validators.required],
  })

  updateCampaignAndBalance(data: DialogData, form: any) {
    let currentFund = data.fund;
    let newFund = form.value.fund;
    this.campaignService
        .updateCampaign(data.id, form.value)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          }, error: (err: any) => {
            console.error('Error updating campaign: ', err);
          }
        });
        // balance difference calculation
        if (currentFund != newFund) {
          return newFund - currentFund;
        }
        return 0;
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      if (this.data) {
        let balanceDiff = this.updateCampaignAndBalance(this.data, this.campaignForm);
        this.campaignService.updateBalance(-(balanceDiff));
        this.dialogRef.close(balanceDiff);
      } else {
        this.campaignService.addCampaign(this.campaignForm.value).subscribe({
          next: (obj: any) => {
            this.campaignService.updateBalance(-(obj.fund));
            this.campaignForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error while adding campaign: ', err);
          },
        })
      }
    }
  }
}
