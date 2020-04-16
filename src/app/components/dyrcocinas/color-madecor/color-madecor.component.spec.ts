import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorMadecorComponent } from './color-madecor.component';

describe('ColorMadecorComponent', () => {
  let component: ColorMadecorComponent;
  let fixture: ComponentFixture<ColorMadecorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorMadecorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorMadecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
