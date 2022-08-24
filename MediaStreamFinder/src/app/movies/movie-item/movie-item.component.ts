import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FavouritesService } from 'src/app/favourites/favourites.service';
import { Movie } from '../movie/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit, OnDestroy {

  @Input() movie: Movie;
  private userSub: Subscription;
  authenticated = false;
  isFavourite: boolean;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private favouriteService: FavouritesService
    ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.authenticated = !user ? false : true;
    })

    this.isFavourite = this.favouriteService.checkFavourite(this.movie.movieID);
  }

  onViewDetails() {
    if(this.router.url=="/movie") {
      this.router.navigate([this.movie.title + "/" + this.movie.movieID], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    } else {
      this.router.navigate([this.movie.movieID], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    }
  }

  onAddFavourite() {
    this.favouriteService.addFavourite(this.movie);
    this.isFavourite = true;
  }

  onRemoveFavourite() {
    this.favouriteService.removeFavourite(this.movie.movieID);
    this.isFavourite = false;
  }

  ngOnDestroy(): void {
      
  }
}
