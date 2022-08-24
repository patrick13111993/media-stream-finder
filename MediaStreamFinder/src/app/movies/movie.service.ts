import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { MovieFull } from './movie-full/movie-full.model';
import { Movie } from './movie/movie.model';
import { environment } from 'src/environments/environment.prod';
import { forkJoin } from 'rxjs';
import { WatchProviders } from '../watch-provider/watch-providers/watch-providers.model';

interface movieResponse {
  page: number,
  results: {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  }[],
  total_pages: number,
  total_results: number
}

interface fullMovieResponse {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: {},
  budget: number,
  genres: {
    id: number,
    name: string
  },
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {
    name: string,
    id: number,
    logo_path: string,
    origin_country: string
  },
  production_countries: {
    iso_3155_1: string,
    name: string
  },
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: {
    iso_639_1: string,
    name: string
  }
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

interface watchProviderResponse {
  id: number,
  results: {
    GB: {
      link: string,
      rent: {
        display_priority: number,
        logo_path: string,
        provider_id: number,
        provider_name: string
      }[],
      buy: {
        display_priority: number,
        logo_path: string,
        provider_id: number,
        provider_name: string
      }[],
      flatrate: {
        display_priority: number,
        logo_path: string,
        provider_id: number,
        provider_name: string
      }[]
    }
  }
}



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  imageUrl: string = "https://image.tmdb.org/t/p/original";
  public totalPages: number;

  constructor(private http: HttpClient) { }

  getMovieByTitle(title: string, page = "1") {
    return this.http.get<movieResponse>('https://api.themoviedb.org/3/search/movie?api_key=' + environment.moviedbAPIKey,
      {
        params: {
          query: title,
          page: page
        }
      }
    )
      .pipe(
        map((response: movieResponse) => {
          this.totalPages = response.total_pages;
          return response.results.map(item => {
            return new Movie(item?.id, item?.title, this.imageUrl + item?.poster_path)
          })
        })
      );
  }

  getMovieById(id: string) {
    let url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + environment.moviedbAPIKey + '&language=en-US';
    url = url.replace(/%25/g, '%');

    let call1 = this.http.get<fullMovieResponse>(url)
      .pipe(
        map(response => {
          return new MovieFull(
            response?.id,
            response?.title,
            response?.tagline,
            this.imageUrl + response?.poster_path,
            this.imageUrl + response?.backdrop_path,
            response?.overview,
            response?.release_date,
            response?.revenue,
            response?.runtime,
            response?.vote_average,
            response?.adult
          )
        })
      );

    let call2 = this.http.get<watchProviderResponse>('https://api.themoviedb.org/3/movie/' + id + '/watch/providers?api_key=' + environment.moviedbAPIKey).pipe(
      map(response => {
        return new WatchProviders(
          response.results.GB?.rent,
          response.results.GB?.buy,
          response.results.GB?.flatrate
        ).Providers;
      })
    );
    return forkJoin([call1, call2]);
  }

  getUpcomingMovies() {
    return this.http.get<movieResponse>('https://api.themoviedb.org/3/movie/upcoming?api_key=' + environment.moviedbAPIKey)
      .pipe(
        map((response: movieResponse) => {
          return response.results.map(item => {
            return new Movie(item?.id, item?.title, this.imageUrl + item?.poster_path)
          })
        })
      );
  }

  getPopularMovies() {
    return this.http.get<movieResponse>('https://api.themoviedb.org/3/movie/popular?api_key=' + environment.moviedbAPIKey)
      .pipe(
        map((response: movieResponse) => {
          return response.results.map(item => {
            return new Movie(item?.id, item?.title, this.imageUrl + item?.poster_path)
          })
        })
      );
  }
}