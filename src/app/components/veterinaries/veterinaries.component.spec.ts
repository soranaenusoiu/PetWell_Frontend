import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariesComponent } from './veterinaries.component';

describe('VeterinariesComponent', () => {
  let component: VeterinariesComponent;
  let fixture: ComponentFixture<VeterinariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinariesComponent]
    });
    fixture = TestBed.createComponent(VeterinariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
