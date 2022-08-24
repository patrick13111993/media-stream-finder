import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./auth/auth-guard.service";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { MovieFullComponent } from "./movies/movie-full/movie-full.component";
import { MovieListComponent } from "./movies/movie-list/movie-list.component";
import { MovieComponent } from "./movies/movie/movie.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WatchProvidersComponent } from "./watch-provider/watch-providers/watch-providers.component";

const appRoutes: Routes = [
    {path: 'movie', component: MovieComponent, 
        children: [
            {path: ':title', component: MovieListComponent},
            {path: ':id', component: MovieFullComponent},
            {path: ':title/:id', component: MovieFullComponent}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuardService]},
    {path: 'providers', component: WatchProvidersComponent, canActivate: [AuthGuardService]},
    {path: 'favourites/:id', component: MovieFullComponent},
    {path: '', redirectTo: 'movie', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutes {}