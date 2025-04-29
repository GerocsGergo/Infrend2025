import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCostumerComponent } from './delete-costumer.component';

describe('DeleteCostumerComponent', () => {
  let component: DeleteCostumerComponent;
  let fixture: ComponentFixture<DeleteCostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCostumerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
