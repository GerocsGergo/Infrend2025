import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAllBorrowingsComponent } from './customer-all-borrowings.component';

describe('CustomerAllBorrowingsComponent', () => {
  let component: CustomerAllBorrowingsComponent;
  let fixture: ComponentFixture<CustomerAllBorrowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAllBorrowingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAllBorrowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
