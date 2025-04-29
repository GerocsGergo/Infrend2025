import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllCostumerComponent } from './list-all-costumer.component';

describe('ListAllCostumerComponent', () => {
  let component: ListAllCostumerComponent;
  let fixture: ComponentFixture<ListAllCostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllCostumerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllCostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
