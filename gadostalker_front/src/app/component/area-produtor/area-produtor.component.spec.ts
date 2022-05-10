import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProdutorComponent } from './area-produtor.component';

describe('AreaProdutorComponent', () => {
  let component: AreaProdutorComponent;
  let fixture: ComponentFixture<AreaProdutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaProdutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaProdutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
