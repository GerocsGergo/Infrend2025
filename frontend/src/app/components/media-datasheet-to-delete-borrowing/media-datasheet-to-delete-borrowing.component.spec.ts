import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDatasheetToDeleteBorrowingComponent } from './media-datasheet-to-delete-borrowing.component';

describe('MediaDatasheetToDeleteBorrowingComponent', () => {
  let component: MediaDatasheetToDeleteBorrowingComponent;
  let fixture: ComponentFixture<MediaDatasheetToDeleteBorrowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaDatasheetToDeleteBorrowingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaDatasheetToDeleteBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
