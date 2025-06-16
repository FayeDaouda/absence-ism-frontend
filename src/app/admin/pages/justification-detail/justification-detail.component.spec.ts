import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationDetailComponent } from './justification-detail.component';

describe('JustificationDetailComponent', () => {
  let component: JustificationDetailComponent;
  let fixture: ComponentFixture<JustificationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
