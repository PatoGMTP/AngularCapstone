import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubImageComponent } from './sub-image.component';

describe('SubImageComponent', () => {
  let component: SubImageComponent;
  let fixture: ComponentFixture<SubImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
