import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSign } from './file-sign';

describe('FileSign', () => {
  let component: FileSign;
  let fixture: ComponentFixture<FileSign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
