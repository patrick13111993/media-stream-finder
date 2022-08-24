import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FavouritesComponent } from './favourites/favourites.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutes } from './app-routes.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { MovieFullComponent } from './movies/movie-full/movie-full.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WatchProvidersComponent } from './watch-provider/watch-providers/watch-providers.component';
import { WatchProviderComponent } from './watch-provider/watch-provider.component';
import { WatchProviderListComponent } from './watch-provider/watch-provider-list/watch-provider-list.component';
import { WatchProviderItemComponent } from './watch-provider/watch-provider-item/watch-provider-item.component';
import { TrendingComponent } from './movies/trending/trending.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FavouritesComponent,
    MovieComponent,
    MovieSearchComponent,
    MovieListComponent,
    MovieItemComponent,
    LoadingSpinnerComponent,
    MovieFullComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    WatchProvidersComponent,
    WatchProviderComponent,
    WatchProviderListComponent,
    WatchProviderItemComponent,
    TrendingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    AppRoutes,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
