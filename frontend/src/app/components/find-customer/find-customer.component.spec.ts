import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCustomerComponent } from './find-customer.component';

describe('FindCustomerComponent', () => {
  let component: FindCustomerComponent;
  let fixture: ComponentFixture<FindCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
