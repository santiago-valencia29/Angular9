import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionMaderaComponent } from './cotizacion-madera.component';

describe('CotizacionMaderaComponent', () => {
  let component: CotizacionMaderaComponent;
  let fixture: ComponentFixture<CotizacionMaderaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionMaderaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionMaderaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
