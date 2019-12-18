import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterComponentComponent } from './toaster-component.component';

describe('ToasterComponentComponent', () => {
  let component: ToasterComponentComponent;
  let fixture: ComponentFixture<ToasterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToasterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
