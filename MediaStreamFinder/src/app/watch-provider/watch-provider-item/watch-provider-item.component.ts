import { Component, Input, OnInit } from '@angular/core';
import { WatchProvider } from '../watch-provider.model';

@Component({
  selector: 'app-watch-provider-item',
  templateUrl: './watch-provider-item.component.html',
  styleUrls: ['./watch-provider-item.component.css']
})
export class WatchProviderItemComponent implements OnInit {

  @Input() watchProvider: WatchProvider;

  constructor() { }

  ngOnInit(): void {
  }

}
