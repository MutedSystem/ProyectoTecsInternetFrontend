import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBougthComponent } from './products-bougth.component';

describe('ProductsBougthComponent', () => {
  let component: ProductsBougthComponent;
  let fixture: ComponentFixture<ProductsBougthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsBougthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBougthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
