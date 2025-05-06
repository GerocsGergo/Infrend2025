import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDatasheetComponent } from './media-datasheet.component';

describe('MediaDatasheetComponent', () => {
  let component: MediaDatasheetComponent;
  let fixture: ComponentFixture<MediaDatasheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaDatasheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaDatasheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
