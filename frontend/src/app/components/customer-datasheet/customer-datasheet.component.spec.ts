import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDatasheetComponent } from './customer-datasheet.component';

describe('CustomerDatasheetComponent', () => {
  let component: CustomerDatasheetComponent;
  let fixture: ComponentFixture<CustomerDatasheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDatasheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDatasheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
