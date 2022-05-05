import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCatalogoComponent } from './modal-catalogo.component';

describe('ModalCatalogoComponent', () => {
  let component: ModalCatalogoComponent;
  let fixture: ComponentFixture<ModalCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCatalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
