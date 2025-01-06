import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUComponent } from './home-u.component';

describe('HomeUComponent', () => {
  let component: HomeUComponent;
  let fixture: ComponentFixture<HomeUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
