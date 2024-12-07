import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTableComponent } from './campaign-table.component';

describe('CampaignTableComponent', () => {
  let component: CampaignTableComponent;
  let fixture: ComponentFixture<CampaignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
