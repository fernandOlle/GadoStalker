import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarAnunciosComponent } from './gerenciar-anuncios.component';

describe('GerenciarAnunciosComponent', () => {
  let component: GerenciarAnunciosComponent;
  let fixture: ComponentFixture<GerenciarAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
