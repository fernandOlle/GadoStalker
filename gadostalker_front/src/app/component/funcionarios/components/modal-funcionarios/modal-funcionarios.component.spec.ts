import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionariosComponent } from './modal-funcionarios.component';

describe('ModalFuncionariosComponent', () => {
  let component: ModalFuncionariosComponent;
  let fixture: ComponentFixture<ModalFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
