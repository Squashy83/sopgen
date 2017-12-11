import { TestBed, inject } from '@angular/core/testing';

import { PdfManagerService } from './pdf-manager.service';

describe('PdfManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfManagerService]
    });
  });

  it('should be created', inject([PdfManagerService], (service: PdfManagerService) => {
    expect(service).toBeTruthy();
  }));
});
