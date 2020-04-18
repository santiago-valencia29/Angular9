import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionFerreteriaComponent } from './cotizacion-ferreteria.component';

describe('CotizacionFerreteriaComponent', () => {
  let component: CotizacionFerreteriaComponent;
  let fixture: ComponentFixture<CotizacionFerreteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionFerreteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionFerreteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
