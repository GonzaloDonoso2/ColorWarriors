import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatallaComponent } from './batalla.component';

describe('BatallaComponent', () => {
  let component: BatallaComponent;
  let fixture: ComponentFixture<BatallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatallaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
