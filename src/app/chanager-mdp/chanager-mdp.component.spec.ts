import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanagerMdpComponent } from './chanager-mdp.component';

describe('ChanagerMdpComponent', () => {
  let component: ChanagerMdpComponent;
  let fixture: ComponentFixture<ChanagerMdpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChanagerMdpComponent]
    });
    fixture = TestBed.createComponent(ChanagerMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
