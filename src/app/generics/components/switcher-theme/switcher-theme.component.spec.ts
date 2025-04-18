import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherThemeComponent } from './switcher-theme.component';

describe('SwitcherThemeComponent', () => {
  let component: SwitcherThemeComponent;
  let fixture: ComponentFixture<SwitcherThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitcherThemeComponent]
    });
    fixture = TestBed.createComponent(SwitcherThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
