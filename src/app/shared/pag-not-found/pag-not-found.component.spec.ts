import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagNotFoundComponent } from './pag-not-found.component';

describe('PagNotFoundComponent', () => {
  let component: PagNotFoundComponent;
  let fixture: ComponentFixture<PagNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
