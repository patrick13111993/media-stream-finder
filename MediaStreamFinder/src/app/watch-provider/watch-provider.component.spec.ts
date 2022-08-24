import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProviderComponent } from './watch-provider.component';

describe('WatchProviderComponent', () => {
  let component: WatchProviderComponent;
  let fixture: ComponentFixture<WatchProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
