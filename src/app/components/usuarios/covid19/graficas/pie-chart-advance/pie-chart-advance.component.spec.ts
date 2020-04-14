import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartAdvanceComponent } from './pie-chart-advance.component';

describe('PieChartAdvanceComponent', () => {
  let component: PieChartAdvanceComponent;
  let fixture: ComponentFixture<PieChartAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
