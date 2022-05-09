import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarFazendaComponent } from './modal-cadastrar-fazenda.component';

describe('ModalCadastrarFazendaComponent', () => {
  let component: ModalCadastrarFazendaComponent;
  let fixture: ComponentFixture<ModalCadastrarFazendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastrarFazendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastrarFazendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
