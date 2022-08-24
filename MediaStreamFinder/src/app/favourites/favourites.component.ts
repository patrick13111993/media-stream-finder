import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../movies/movie/movie.model';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Movie[];
  loading = true;
  favouritesSub: Subscription;

  constructor(private favouriteService: FavouritesService) { }

  ngOnInit(): void {
    this.favouriteService.getFavourites().subscribe(response => {
      if(response) {
        this.favourites = response;
      }
      this.loading = false;
    });

    this.favouritesSub = this.favouriteService.favouritesSubject.subscribe(response => {
      this.favourites = response;
    })
  }

  ngOnDestroy(): void {
      this.favouritesSub.unsubscribe();
  }

}
