import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { WatchProviderList } from './watch-provider-list/watch-provider-list.model';
import { WatchProvider } from './watch-provider.model';

interface providerResponse {
  results: {
    display_priority: number,
    logo_path: string,
    provider_id: number,
    provider_name: string
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class WatchProviderService {

  subscribedProviders: WatchProvider[] = [];
  loggedInUser: User;
  providersSubject = new Subject<WatchProvider[]>();
  imageUrl: string = "https://image.tmdb.org/t/p/original";

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.loggedInUser = user;
      this.subscribedProviders = [];
    })
   }

   getUserProviders() {
    if(!this.loggedInUser) {
      return;
    }
    return this.http.get<WatchProvider[]>('https://mediastreamfinder-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/' + this.loggedInUser.id + '.json',
    {
      params: {
        'auth': this.loggedInUser.Token
      }
    }).pipe(
      tap(response => {
        if(response) {
          response.slice();
        }
      })
    )
  }

  getUserProviderList() {
    if(!this.loggedInUser) {
      return;
    }
    return this.http.get<WatchProvider[]>('https://mediastreamfinder-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/' + this.loggedInUser.id + '.json',
    {
      params: {
        'auth': this.loggedInUser.Token
      }
    }).pipe(
      tap(response => {
        if(response) {
          response.slice();
        }
      })
    )
  }

   getAllProviders() {
    return this.http.get<providerResponse>('https://api.themoviedb.org/3/watch/providers/movie?api_key=' + environment.moviedbAPIKey + '&language=en-US&watch_region=GB')
      .pipe(
        map((response: providerResponse) => {
          return response.results.map(item => {
            return new WatchProvider(
              item.display_priority,
              this.imageUrl + item.logo_path,
              item.provider_id,
              item.provider_name
            )
          })
        })
      );
  }

   addProvider(provider: WatchProvider) {
    if(!this.loggedInUser) {
      return;
    }
    this.subscribedProviders.push(provider);
    this.http.put('https://mediastreamfinder-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/' + this.loggedInUser.id + '.json', this.subscribedProviders,
    {
      params: {
        'auth': this.loggedInUser.Token
      }
    }).subscribe();
    this.providersSubject.next(this.subscribedProviders.slice());
  }

  removeProvider(id: number) {
    this.subscribedProviders.forEach( (prov, index) => {
      if(prov.provider_id == id) {
        this.subscribedProviders.splice(index,1);
      }
    });
    this.http.put('https://mediastreamfinder-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/' + this.loggedInUser.id + '.json', this.subscribedProviders,
    {
      params: {
        'auth': this.loggedInUser.Token
      }
    }).subscribe();
    this.providersSubject.next(this.subscribedProviders.slice());
  }
}
