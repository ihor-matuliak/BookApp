import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionBookDialogComponent } from './description-book-dialog.component';

describe('DescriptionBookDialogComponent', () => {
  let component: DescriptionBookDialogComponent;
  let fixture: ComponentFixture<DescriptionBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionBookDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
