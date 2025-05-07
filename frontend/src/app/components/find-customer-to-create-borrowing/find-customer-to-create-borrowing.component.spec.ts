import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCustomerToCreateBorrowingComponent } from './find-customer-to-create-borrowing.component';

describe('FindCustomerToCreateBorrowingComponent', () => {
  let component: FindCustomerToCreateBorrowingComponent;
  let fixture: ComponentFixture<FindCustomerToCreateBorrowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCustomerToCreateBorrowingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCustomerToCreateBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
