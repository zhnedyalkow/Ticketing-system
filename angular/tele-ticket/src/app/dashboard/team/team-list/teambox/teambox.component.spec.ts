import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamboxComponent } from './teambox.component';

describe('TeamboxComponent', () => {
  let component: TeamboxComponent;
  let fixture: ComponentFixture<TeamboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
