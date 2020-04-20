export class Song {
    songId: number;
    songTitle: string;
    singer: string;

    constructor(songId?: number, songTitle?: string, singer?: string) {
        this.songId = songId;
        this.songTitle = songTitle;
        this.singer = singer;
    }
}

