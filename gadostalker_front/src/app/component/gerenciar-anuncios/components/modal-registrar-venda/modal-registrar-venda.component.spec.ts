import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarVendaComponent } from './modal-registrar-venda.component';

describe('ModalRegistrarVendaComponent', () => {
  let component: ModalRegistrarVendaComponent;
  let fixture: ComponentFixture<ModalRegistrarVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistrarVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistrarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
