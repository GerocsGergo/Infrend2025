import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllMediaComponent } from './list-all-media.component';

describe('ListAllMediaComponent', () => {
  let component: ListAllMediaComponent;
  let fixture: ComponentFixture<ListAllMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
