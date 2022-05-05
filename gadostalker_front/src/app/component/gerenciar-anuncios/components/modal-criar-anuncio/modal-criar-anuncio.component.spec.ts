import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarAnuncioComponent } from './modal-criar-anuncio.component';

describe('ModalCriarAnuncioComponent', () => {
  let component: ModalCriarAnuncioComponent;
  let fixture: ComponentFixture<ModalCriarAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCriarAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCriarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
