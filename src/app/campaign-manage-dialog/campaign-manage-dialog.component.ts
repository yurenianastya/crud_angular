import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { JsonLoaderService } from '../services/json-loader.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';

import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';


export interface DialogData {
  name: string;
  keywords: string;
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
    MatOptionModule,
    MatSelect,
    MatInput,
    MatButton,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './campaign-manage-dialog.component.html',
  styleUrl: './campaign-manage-dialog.component.scss'
})
export class CampaignManageDialogComponent {

  readonly dialogRef = inject(MatDialogRef<CampaignManageDialogComponent>);
  readonly campaignService = inject(CampaignService);
  readonly jsonLoaderService = inject(JsonLoaderService);
  private formBuilder = inject(FormBuilder);
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  towns$!: Observable<string[]>;
  keywords$!: Observable<string[]>;
  filteredKeywords$!: Observable<string[]>;

  campaignForm = this.formBuilder.group({
    name: [this.data?.name || '', Validators.required],
    keywords: [this.data?.keywords || '', Validators.required],
    bidAmount: [this.data?.bidAmount || 0, Validators.required],
    fund: [this.data?.fund || 0, Validators.required],
    status: [this.data?.status || true, Validators.required],
    town: [this.data?.town || ''],
    radius: [this.data?.radius || 0, Validators.required],
  })

  ngOnInit() {
    this.towns$ = this.jsonLoaderService.getTowns();
    this.keywords$ = this.jsonLoaderService.getKeywords();
    this.filteredKeywords$ = combineLatest([
      this.campaignForm.controls.keywords.valueChanges.pipe(startWith('')),
      this.keywords$
    ]).pipe(
      map(([value, keywords]) => this._filter(value || '', keywords))
    );
  }

  private _filter(value: string, keywords: string[]): string[] {
    if (!value) {
      return keywords || [];
    }
    const words = value.split(',');
    const trimmed_word = words[words.length - 1].trim();
  
    return (keywords || []).filter(keyword =>
      keyword.toLowerCase().includes(trimmed_word.toLowerCase())
    );
  }

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
    } else {
      alert('Form is invalid.')
    }
  }
}
