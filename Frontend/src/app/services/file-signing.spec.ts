import { TestBed } from '@angular/core/testing';

import { FileSigning } from './file-signing';

describe('FileSigning', () => {
  let service: FileSigning;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSigning);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
