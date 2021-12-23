import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubVideoComponent } from './sub-video.component';

describe('SubVideoComponent', () => {
  let component: SubVideoComponent;
  let fixture: ComponentFixture<SubVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
