import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMuniChartComponent } from './area-muni-chart.component';

describe('AreaMuniChartComponent', () => {
  let component: AreaMuniChartComponent;
  let fixture: ComponentFixture<AreaMuniChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMuniChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMuniChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
