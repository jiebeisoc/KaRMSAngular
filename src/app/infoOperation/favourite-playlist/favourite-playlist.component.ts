import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../session.service';
import { SongCategoryService } from '../../song-category.service';
import { SongService } from '../../song.service';
import { Song } from 'src/app/song';
import { SongCategory } from 'src/app/song-category';
import { CustomerService } from '../../customer.service';
import { Reservation } from 'src/app/reservation';
import { ReservationService } from 'src/app/reservation.service';

@Component({
  selector: 'app-favourite-playlist',
  templateUrl: './favourite-playlist.component.html',
  styleUrls: ['./favourite-playlist.component.css']
})
export class FavouritePlaylistComponent implements OnInit {

  songCategories: SongCategory[] = [];
  songs: Song[] = [];
  selectedSongCategory: SongCategory;

  displayedColumns: string[] = ['songId', 'songTitle', 'singer', 'action'];
  data = new MatTableDataSource();

  reservations: Reservation[];
  
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

    this.customerService.retrieveFavouritePlaylist().subscribe(
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

    this.reservationService.retrieveUpcomingReservationByCustomer().subscribe(
      response => {
        this.reservations = response.reservations;
      }
    )
  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  filterCategory(categoryId: number) {

    if (categoryId != 0) {
      this.songService.viewFavouritePlaylistByCategory(categoryId).subscribe(
        response => {
          this.songs = response.songs;
          this.data = new MatTableDataSource(response.songs);
          this.resultsLength = this.songs.length;
          this.data.paginator = this.paginator;
        }
      );
    } else {
      this.customerService.retrieveFavouritePlaylist().subscribe(
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

  addPlaylistToSongQueue() {
    const bottomSheetRef = this.bottomSheet.open(AddPlaylistToSongQueueBottomSheet, {
      data: {reservations: this.reservations}
    });
  }

  deleteSong(song: Song) {
    this.customerService.deleteSongFromFavouritePlaylist(song).subscribe(
      response => {
        const index = this.songs.findIndex(s => s.songId === song.songId);
        this.songs.splice(index, 1);
        this.data = new MatTableDataSource(this.songs);
        this.resultsLength = this.songs.length;
        this.data.paginator = this.paginator;

        this.snackBar.open("Deleted song from playlist!", '', {
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

@Component({
  selector: 'add-playlist-to-song-queue-bottom-sheet',
  templateUrl: 'add-playlist-to-song-queue-bottom-sheet.html',
})
export class AddPlaylistToSongQueueBottomSheet {

  constructor(private bottomSheetRef: MatBottomSheetRef<AddPlaylistToSongQueueBottomSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private customerService: CustomerService,
    private snackBar: MatSnackBar) {}

  formatDate(date: Date) {
    var str = date.toString().slice(0, date.toString().indexOf("["));
    return str;
  }

  onClick(reservation: Reservation) {

    this.customerService.addFavouritePlaylistToSongQueue(reservation.reservationId).subscribe(
      response => {
        this.snackBar.open("Playlist is added to song queue!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
      }
    )

    this.bottomSheetRef.dismiss();
  }

}
