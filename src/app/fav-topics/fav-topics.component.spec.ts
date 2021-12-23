import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavTopicsComponent } from './fav-topics.component';

describe('FavTopicsComponent', () => {
  let component: FavTopicsComponent;
  let fixture: ComponentFixture<FavTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavTopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
