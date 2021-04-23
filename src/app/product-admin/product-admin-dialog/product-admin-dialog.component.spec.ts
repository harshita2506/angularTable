import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminDialogComponent } from './product-admin-dialog.component';

describe('ProductAdminDialogComponent', () => {
  let component: ProductAdminDialogComponent;
  let fixture: ComponentFixture<ProductAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAdminDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
