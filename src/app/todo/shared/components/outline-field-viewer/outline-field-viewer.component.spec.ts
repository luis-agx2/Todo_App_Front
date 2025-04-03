import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlineFieldViewerComponent } from './outline-field-viewer.component';

describe('OutlineFieldViewerComponent', () => {
  let component: OutlineFieldViewerComponent;
  let fixture: ComponentFixture<OutlineFieldViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutlineFieldViewerComponent]
    });
    fixture = TestBed.createComponent(OutlineFieldViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
