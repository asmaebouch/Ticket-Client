import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PLateformeComponent } from './plateforme.component';

describe('PLateformeComponent', () => {
  let component: PLateformeComponent;
  let fixture: ComponentFixture<PLateformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PLateformeComponent]
    });
    fixture = TestBed.createComponent(PLateformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
