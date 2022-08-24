import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieFull } from './movie-full.model';
import { MovieService } from '../movie.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FavouritesService } from 'src/app/favourites/favourites.service';
import { Subscription } from 'rxjs';
import { WatchProviderService } from 'src/app/watch-provider/watch-provider.service';
import { WatchProviderList } from 'src/app/watch-provider/watch-provider-list/watch-provider-list.model';
import { WatchProvider } from 'src/app/watch-provider/watch-provider.model';
import { Movie } from '../movie/movie.model';

@Component({
  selector: 'app-movie-full',
  templateUrl: './movie-full.component.html',
  styleUrls: ['./movie-full.component.css']
})
export class MovieFullComponent implements OnInit {

  movie: MovieFull;
  movieLink: string;
  fetchError = false;
  loading = true;
  userSub: Subscription;
  authenticated = false;
  isFavourite: boolean;
  providers;
  userProviders;
  userProviderList: WatchProviderList;


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private authService: AuthService,
    private favouriteService: FavouritesService,
    private watchProviderService: WatchProviderService) { }

  ngOnInit(): void {
    this.loading = true;
    let id = this.route.snapshot.params['id'];



    this.movieService.getMovieById(id).subscribe((response) => {
      this.movie = response[0];
      this.providers = response[1];
      this.fetchError = false;
      let ratingpercent = (this.movie.vote_average * 10);
      document.getElementById("stars").setAttribute("style", "clip-path: polygon(" + ratingpercent + "% 0, " + ratingpercent + "% 100%,0 100%, 0 0);");
      if (this.authenticated) {
        this.watchProviderService.getUserProviders().subscribe((response) => {
          this.userProviders = response;
          this.createUserProviderList();
        });
      }
      this.loading = false;
    },
      (error) => {
        this.fetchError = true;
        this.loading = false;
      });


    this.userSub = this.authService.user.subscribe((user) => {
      this.authenticated = !user ? false : true;
    });

    this.isFavourite = this.favouriteService.checkFavourite(id);
  }

  onNavigateBack() {
    this.location.back();
  }

  onAddFavourite() {
    this.favouriteService.addFavourite(new Movie(this.movie.movieID, this.movie.title, this.movie.thumbPath));
    this.isFavourite = true;
  }

  onRemoveFavourite() {
    this.favouriteService.removeFavourite(this.movie.movieID);
    this.isFavourite = false;
  }

  getProviderLists() {

  }

  createUserProviderList() {
    let buy: WatchProvider[] = [];
    let rent: WatchProvider[] = [];
    let flatrate: WatchProvider[] = [];
    for (let i = 0; i < this.providers.rent.length; i++) {
      this.userProviders.forEach((item) => {
        if (item.provider_id == this.providers.rent[i].provider_id) {
          rent.push(item);
        }
      })
    }
    for (let i = 0; i < this.providers.buy.length; i++) {
      this.userProviders.forEach((item) => {
        if (item.provider_id == this.providers.buy[i].provider_id) {
          buy.push(item);
        }
      })
    }
    for (let i = 0; i < this.providers.flatrate.length; i++) {
      this.userProviders.forEach((item) => {
        if (item.provider_id == this.providers.flatrate[i].provider_id) {
          flatrate.push(item);
        }
      })
    }
    this.userProviderList = new WatchProviderList(rent, buy, flatrate);
  }
}
