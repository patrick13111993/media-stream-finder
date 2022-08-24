import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FavouritesService } from 'src/app/favourites/favourites.service';
import { MovieService } from '../movie.service';
import { Movie } from '../movie/movie.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit, OnDestroy {

  upcomingResults: Movie[] = [];
  popularResults: Movie[] = [];
  searching = true;
  isHome = false;

  constructor(private movieService: MovieService, private router: Router, private favouritesService: FavouritesService, private location: Location) { }

  ngOnInit(): void {

    if (this.router.url == "/movie") {
      this.isHome = true;
    }

    this.router.events.subscribe(params => {
      this.router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url != "/movie") {
            this.isHome = false;
          } else {
            this.isHome = true;
          }
        }
      })
    })

    this.populateResults();
  }

  ngOnChanges() {
    if (this.router.url == "/movie") {
      this.isHome = true;
      if (this.upcomingResults.length == 0 && this.popularResults.length == 0) {
        this.populateResults();
      }
    }
  }

  populateResults() {
    this.movieService.getPopularMovies().subscribe((response) => {
      if (response) {
        this.popularResults = response;
      }
    })

    this.movieService.getUpcomingMovies().subscribe((response) => {
      if (response) {
        this.upcomingResults = response;
        this.searching = false;
      }
    })
  }

  ngOnDestroy(): void {
  }

}
