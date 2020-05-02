import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';;

import { SongCategory } from 'src/app/song-category';
import { Song } from 'src/app/song';
import { MatPaginator } from '@angular/material/paginator';
import { SongService } from 'src/app/song.service';
import { SongCategoryService } from 'src/app/song-category.service';
import { CustomerService } from 'src/app/customer.service';
import { SessionService } from 'src/app/session.service';
import { ReservationService } from 'src/app/reservation.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from 'src/app/reservation';

@Component({
  selector: 'app-song-queue',
  templateUrl: './song-queue.component.html',
  styleUrls: ['./song-queue.component.css']
})
export class SongQueueComponent implements OnInit {

  selectedReservation: Reservation;

  songCategories: SongCategory[] = [];
  songs: Song[] = [];
  selectedSongCategory: SongCategory;

  displayedColumns: string[] = ['songId', 'songTitle', 'singer', 'action'];
  data = new MatTableDataSource();
  
  resultsLength = 0;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private songService: SongService,
    private songCategoryService: SongCategoryService,
    private customerService: CustomerService,
    public sessionService: SessionService,
    private reservationService: ReservationService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.checkAccessRight();

    this.selectedReservation = this.sessionService.getSelectedReservation();

    this.reservationService.retrieveSongQueue(this.selectedReservation.reservationId).subscribe(
      response => {
        this.songs = response.songs;
        this.data = new MatTableDataSource(this.songs);
        this.resultsLength = this.songs.length;
        this.data.paginator = this.paginator;
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
      this.songService.viewSongQueueByCategory(this.selectedReservation.reservationId, categoryId).subscribe(
        response => {
          this.songs = response.songs;
          this.data = new MatTableDataSource(response.songs);
          this.resultsLength = this.songs.length;
          this.data.paginator = this.paginator;
        }
      );
    } else {
      this.reservationService.retrieveSongQueue(this.selectedReservation.reservationId).subscribe(
        response => {
          this.songs = response.songs;
          this.data = new MatTableDataSource(this.songs);
          this.resultsLength = this.songs.length;
          this.data.paginator = this.paginator;
        }
      );
    }
  }

  addSongs() {
    this.router.navigate(["/songOperation/songList"]);
  }

  addQueueToFavouritePlaylist() {
    this.reservationService.addQueueToFavouritePlaylist(this.selectedReservation.reservationId).subscribe(
      response => {
        this.snackBar.open("Queue is added to your favourite playlist!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
      }
    )
  }

  saveQueueAsFavouritePlaylist() {
    this.reservationService.saveQueueAsFavouritePlaylist(this.selectedReservation.reservationId).subscribe(
      response => {
        this.snackBar.open("Queue is saved as your favourite playlist!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
      }
    )
  }

  deleteSong(song: Song) {
    this.reservationService.deleteSongFromQueue(song, this.selectedReservation).subscribe(
      response => {
        const index = this.songs.findIndex(s => s.songId === song.songId);
        this.songs.splice(index, 1);
        this.data = new MatTableDataSource(this.songs);
        this.resultsLength = this.songs.length;
        this.data.paginator = this.paginator;

        this.snackBar.open("Song is deleted from queue!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
      }
    )
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}

}
