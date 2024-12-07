import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignManageDialogComponent } from './campaign-manage-dialog.component';

describe('CampaignManageDialogComponent', () => {
  let component: CampaignManageDialogComponent;
  let fixture: ComponentFixture<CampaignManageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignManageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
