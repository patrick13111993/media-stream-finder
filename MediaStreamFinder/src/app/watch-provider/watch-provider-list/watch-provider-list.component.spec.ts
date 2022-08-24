import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProviderListComponent } from './watch-provider-list.component';

describe('WatchProviderListComponent', () => {
  let component: WatchProviderListComponent;
  let fixture: ComponentFixture<WatchProviderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchProviderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
