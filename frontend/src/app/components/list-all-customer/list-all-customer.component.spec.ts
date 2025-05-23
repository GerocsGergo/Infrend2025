import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllCustomerComponent } from './list-all-customer.component';

describe('ListAllCustomerComponent', () => {
  let component: ListAllCustomerComponent;
  let fixture: ComponentFixture<ListAllCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
