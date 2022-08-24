import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProviderItemComponent } from './watch-provider-item.component';

describe('WatchProviderItemComponent', () => {
  let component: WatchProviderItemComponent;
  let fixture: ComponentFixture<WatchProviderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchProviderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProviderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
