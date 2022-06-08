import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDesignarFuncionarioComponent } from './modal-designar-funcionario.component';

describe('ModalDesignarFuncionarioComponent', () => {
  let component: ModalDesignarFuncionarioComponent;
  let fixture: ComponentFixture<ModalDesignarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDesignarFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDesignarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
