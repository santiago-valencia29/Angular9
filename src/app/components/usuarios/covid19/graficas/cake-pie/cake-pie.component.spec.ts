import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakePieComponent } from './cake-pie.component';

describe('CakePieComponent', () => {
  let component: CakePieComponent;
  let fixture: ComponentFixture<CakePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
