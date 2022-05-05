import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAnuncioComponent } from './modal-editar-anuncio.component';

describe('ModalEditarAnuncioComponent', () => {
  let component: ModalEditarAnuncioComponent;
  let fixture: ComponentFixture<ModalEditarAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
