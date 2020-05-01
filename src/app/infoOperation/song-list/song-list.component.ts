import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../session.service';
import { SongCategoryService } from '../../song-category.service';
import { SongService } from '../../song.service';
import { Song } from 'src/app/song';
import { SongCategory } from 'src/app/song-category';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songCategories: SongCategory[] = [];
  songs: Song[] = [];
  selectedSongCategory: SongCategory;
  errorMessage: string;

  displayedColumns: string[] = ['songId', 'songTitle', 'singer'];
  data = new MatTableDataSource();
  
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private songService: SongService,
    private songCategoryService: SongCategoryService,
    public sessionService: SessionService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkAccessRight();

    this.songService.viewAllSongs().subscribe(
      response => {
        this.songs = response.songs;
        this.data = new MatTableDataSource(response.songs);
        this.resultsLength = this.songs.length;
        this.data.paginator = this.paginator;
      },
      error => {
        this.errorMessage = error;
      }
    );

    this.songCategoryService.retrieveAllSongCategories().subscribe(
      response => {
        this.songCategories = response.songCategories;
      }
    );

  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  filterCategory(categoryId: number) {

    if (categoryId != 0) {
      this.songService.viewSongByCategory(categoryId).subscribe(
        response => {
          this.songs = response.songs;
          this.data = new MatTableDataSource(response.songs);
          this.resultsLength = this.songs.length;
          this.data.paginator = this.paginator;

        }
      )
    } else {
      this.songService.viewAllSongs().subscribe(
        response => {
          this.songs = response.songs;
          this.data = new MatTableDataSource(response.songs);
          this.resultsLength = this.songs.length;
          this.data.paginator = this.paginator;
        }
      );
    }
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}

}
