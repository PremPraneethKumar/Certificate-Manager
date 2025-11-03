import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateAdd } from './certificate-add';

describe('CertificateAdd', () => {
  let component: CertificateAdd;
  let fixture: ComponentFixture<CertificateAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
