import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WatchProvider } from '../watch-provider.model';
import { WatchProviderList } from './watch-provider-list.model';

@Component({
  selector: 'app-watch-provider-list',
  templateUrl: './watch-provider-list.component.html',
  styleUrls: ['./watch-provider-list.component.css']
})
export class WatchProviderListComponent implements OnInit {

  hasProviders: boolean = false;
  hasRentProviders: boolean = false;
  hasBuyProviders: boolean = false;
  hasFlatrateProviders: boolean = false;
  rent: WatchProvider[];
  buy: WatchProvider[];
  flatrate: WatchProvider[];

  @Input() set providers(providers: WatchProviderList) {
    if (providers) {
      if (providers.rent.length > 0) {
        this.rent = providers.rent.sort((n1, n2) => n1.display_priority - n2.display_priority);
        this.hasProviders = true;
        this.hasRentProviders = true;
      }
      if (providers.buy.length > 0) {
        this.buy = providers.buy.sort((n1, n2) => n1.display_priority - n2.display_priority);
        this.hasProviders = true;
        this.hasBuyProviders = true;
      }
      if (providers.flatrate.length > 0) {
        this.flatrate = providers.flatrate.sort((n1, n2) => n1.display_priority - n2.display_priority);
        this.hasProviders = true;
        this.hasFlatrateProviders = true;
      }
    }
  }

  constructor() { }

  ngOnInit(): void {

  }

}
