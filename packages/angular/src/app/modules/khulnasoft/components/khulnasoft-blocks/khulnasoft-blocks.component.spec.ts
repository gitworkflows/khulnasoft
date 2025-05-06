import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhulnasoftBlocksComponent } from './khulnasoft-blocks.component';

describe('KhulnasoftBlocksComponent', () => {
  let component: KhulnasoftBlocksComponent;
  let fixture: ComponentFixture<KhulnasoftBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KhulnasoftBlocksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhulnasoftBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
