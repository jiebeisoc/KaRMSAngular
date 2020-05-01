
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../session.service';
import { SongCategoryService } from '../../song-category.service';
import { SongService } from '../../song.service';
import { Song } from 'src/app/song';
import { SongCategory } from 'src/app/song-category';
import { CustomerService } from '../../customer.service';
import { Reservation } from 'src/app/reservation';
import { ReservationService } from '../../reservation.service';


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
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet) { }

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

  addToFavouritePlaylist(song: Song) {

    this.customerService.addSongToFavouritePlaylist(song).subscribe(
      response => {
        this.snackBar.open("Added song to your favourite playlist!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });  
      },
      error => {
        var string = error.slice(error.lastIndexOf(":")+2);
        if (string === "undefined") {
          this.snackBar.open("Invalid options!", '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        } else {
          this.snackBar.open(string, '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        }
        console.log("******** SongListComponent.ts: "  + error);
      }
    )
  }

  addToSongQueue(song: Song) {
    const bottomSheetRef = this.bottomSheet.open(AddToSongQueueBottomSheet, {
      data: {reservations: this.reservations, selectedSong: song}
    });
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}

}

@Component({
  selector: 'add-to-song-queue-bottom-sheet',
  templateUrl: 'add-to-song-queue-bottom-sheet.html',
})
export class AddToSongQueueBottomSheet {
  
  constructor(private bottomSheetRef: MatBottomSheetRef<AddToSongQueueBottomSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar) {}

    formatDate(date: Date) {
      var str = date.toString().slice(0, date.toString().indexOf("["));
      return str;
    }

    onClick(reservation: Reservation) {

      this.reservationService.addSongToQueue(this.data.selectedSong, reservation).subscribe(
        response => {
          this.snackBar.open("Song is added to song queue!", '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        },
        error => {
          var string = error.slice(error.lastIndexOf(":")+2);
          if (string === "undefined") {
            this.snackBar.open("Invalid options!", '', {
              duration: 5000,
              panelClass: ['snackbar']
            });
          } else {
            this.snackBar.open(string, '', {
              duration: 5000,
              panelClass: ['snackbar']
            });
          }
          console.log("******** SongListComponent.ts: "  + error);
        }
      );
      
      this.bottomSheetRef.dismiss();
    }
}

