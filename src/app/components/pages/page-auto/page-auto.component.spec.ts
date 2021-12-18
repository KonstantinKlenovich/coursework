import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAutoComponent } from './page-auto.component';

describe('PageAutoComponent', () => {
  let component: PageAutoComponent;
  let fixture: ComponentFixture<PageAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
