import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamweightComponent } from './paramweight.component';

describe('ParamweightComponent', () => {
  let component: ParamweightComponent;
  let fixture: ComponentFixture<ParamweightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamweightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
