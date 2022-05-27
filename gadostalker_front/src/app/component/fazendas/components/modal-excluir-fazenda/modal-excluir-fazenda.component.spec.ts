import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirFazendaComponent } from './modal-excluir-fazenda.component';

describe('ModalExcluirFazendaComponent', () => {
  let component: ModalExcluirFazendaComponent;
  let fixture: ComponentFixture<ModalExcluirFazendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirFazendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExcluirFazendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
