import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Movie } from '../movies/movie/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favourites: Movie[] = [];
  loggedInUser: User;
  favouritesSubject = new Subject<Movie[]>();

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.authService.user.subscribe(user => {
      this.loggedInUser = user;
      this.favourites = [];
    })
  }

  getFavourites() {
    if(!this.loggedInUser) {
      return;
    }
    return this.http.get<Movie[]>('https://mediastreamfinder-default-rtdb.europe-west1.firebasedatabase.app/movies/' + this.loggedInUser.id + '.json',
    {
      params: {
        'auth': this.loggedInUser.Token
      }
    }).pipe(
      tap(response => {
        if(response) {
          this.favourites = response.slice();
        }
      })
    )
  }

  addFavourite(movie: Movie) {
    if(!this.loggedInUser) {
      return;
    }
    this.favourites.push(movie);
    this.http.put('https://mediastreamfinder-default-rtdb.europe-west1.firebasedatabase.app/movies/' + this.loggedInUser.id + '.json', this.favourites,
    {
      params: {
        'auth': this.loggedInUser.Token
      }
    }).subscribe();
  }

  checkFavourite(id: number) {
    if(this.favourites) {
      for(let fav of this.favourites) {
        if(fav.movieID == id) {
          return true;
        }
      }
    }
    return false;
  }

  removeFavourite(id: number) {
      this.favourites.forEach( (fav, index) => {
        if(fav.movieID == id) {
          this.favourites.splice(index,1);
        }
      });
      this.http.put('https://mediastreamfinder-default-rtdb.europe-west1.firebasedatabase.app/movies/' + this.loggedInUser.id + '.json', this.favourites,
      {
        params: {
          'auth': this.loggedInUser.Token
        }
      }).subscribe();
      this.favouritesSubject.next(this.favourites.slice());
  }
}
