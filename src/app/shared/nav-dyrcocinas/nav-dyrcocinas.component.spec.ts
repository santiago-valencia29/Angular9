import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDyrcocinasComponent } from './nav-dyrcocinas.component';

describe('NavDyrcocinasComponent', () => {
  let component: NavDyrcocinasComponent;
  let fixture: ComponentFixture<NavDyrcocinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDyrcocinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDyrcocinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
