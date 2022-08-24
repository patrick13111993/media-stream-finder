import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FavouritesService } from 'src/app/favourites/favourites.service';
import { MovieService } from '../movie.service';
import { Movie } from '../movie/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  searchResults: Movie[] = [];
  searching = false;
  page: number = 1;
  hasNextPage: boolean = false;
  currentSearch: string;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private favouritesService: FavouritesService) { }

  ngOnInit(): void {

    this.favouritesService.getFavourites().subscribe(response => {
      let title = this.activatedRoute.snapshot.params['title'];
      this.newSearch(title);
      this.currentSearch = title;
    })


    this.activatedRoute.params.subscribe((params: Params) => {
      this.newSearch(params['title']);
    })
  }

  newSearch(searchTerm: string, page = "1") {
    this.searching = true;
    this.movieService.getMovieByTitle(searchTerm, page).subscribe((response) => {
      this.searchResults = response;
      if(this.movieService.totalPages > 1 && this.movieService.totalPages != this.page) {
        this.hasNextPage = true;
      }
      this.searching = false;
    });
  }

  onNextPage() {
    this.page++;
    if(this.page == this.movieService.totalPages) {
      this.hasNextPage = false;
    }
    this.newSearch(this.currentSearch, this.page.toString());
  }

  onLastPage() {
    this.page--;
    this.newSearch(this.currentSearch, this.page.toString());
  }

  ngOnDestroy(): void {
    
  }

}
