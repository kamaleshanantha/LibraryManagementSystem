import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInBooksComponent } from './check-in-books.component';

describe('CheckInBooksComponent', () => {
  let component: CheckInBooksComponent;
  let fixture: ComponentFixture<CheckInBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
