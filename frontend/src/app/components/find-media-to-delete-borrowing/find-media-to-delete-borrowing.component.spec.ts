import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMediaToDeleteBorrowingComponent } from './find-media-to-delete-borrowing.component';

describe('FindMediaToDeleteBorrowingComponent', () => {
  let component: FindMediaToDeleteBorrowingComponent;
  let fixture: ComponentFixture<FindMediaToDeleteBorrowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindMediaToDeleteBorrowingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindMediaToDeleteBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
