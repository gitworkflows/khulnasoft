import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhulnasoftContentComponent } from './khulnasoft-content.component';

describe('KhulnasoftContentComponent', () => {
  let component: KhulnasoftContentComponent;
  let fixture: ComponentFixture<KhulnasoftContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KhulnasoftContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhulnasoftContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
