import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionariosEditarComponent } from './modal-funcionarios-editar.component';

describe('ModalFuncionariosEditarComponent', () => {
  let component: ModalFuncionariosEditarComponent;
  let fixture: ComponentFixture<ModalFuncionariosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFuncionariosEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFuncionariosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
