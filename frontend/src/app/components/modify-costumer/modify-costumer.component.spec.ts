import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCostumerComponent } from './modify-costumer.component';

describe('ModifyCostumerComponent', () => {
  let component: ModifyCostumerComponent;
  let fixture: ComponentFixture<ModifyCostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCostumerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
