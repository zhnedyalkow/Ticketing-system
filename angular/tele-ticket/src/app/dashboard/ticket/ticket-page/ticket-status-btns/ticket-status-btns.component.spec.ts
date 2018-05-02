import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusBtnsComponent } from './ticket-status-btns.component';

describe('TicketStatusBtnsComponent', () => {
  let component: TicketStatusBtnsComponent;
  let fixture: ComponentFixture<TicketStatusBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketStatusBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatusBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
