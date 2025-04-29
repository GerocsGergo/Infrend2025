import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCostumerComponent } from './find-costumer.component';

describe('FindCostumerComponent', () => {
  let component: FindCostumerComponent;
  let fixture: ComponentFixture<FindCostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCostumerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
