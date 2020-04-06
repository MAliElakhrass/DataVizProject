import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteranalysisComponent } from './clusteranalysis.component';

describe('ClusteranalysisComponent', () => {
  let component: ClusteranalysisComponent;
  let fixture: ComponentFixture<ClusteranalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusteranalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteranalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
