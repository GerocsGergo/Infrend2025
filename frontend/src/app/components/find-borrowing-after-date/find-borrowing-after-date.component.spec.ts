import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBorrowingAfterDateComponent } from './find-borrowing-after-date.component';

describe('FindBorrowingAfterDateComponent', () => {
  let component: FindBorrowingAfterDateComponent;
  let fixture: ComponentFixture<FindBorrowingAfterDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindBorrowingAfterDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindBorrowingAfterDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
