import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTestDriveComponent } from './page-test-drive.component';

describe('PageTestDriveComponent', () => {
  let component: PageTestDriveComponent;
  let fixture: ComponentFixture<PageTestDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTestDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTestDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
