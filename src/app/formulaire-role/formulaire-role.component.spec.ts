import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireRoleComponent } from './formulaire-role.component';

describe('FormulaireRoleComponent', () => {
  let component: FormulaireRoleComponent;
  let fixture: ComponentFixture<FormulaireRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireRoleComponent]
    });
    fixture = TestBed.createComponent(FormulaireRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
