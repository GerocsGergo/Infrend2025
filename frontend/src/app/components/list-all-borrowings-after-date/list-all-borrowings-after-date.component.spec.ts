import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllBorrowingsAfterDateComponent } from './list-all-borrowings-after-date.component';

describe('ListAllBorrowingsAfterDateComponent', () => {
  let component: ListAllBorrowingsAfterDateComponent;
  let fixture: ComponentFixture<ListAllBorrowingsAfterDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllBorrowingsAfterDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllBorrowingsAfterDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
