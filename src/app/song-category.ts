export class SongCategory {
    songCategoryId: number;
    name: string;

    constructor(songCategoryId?: number, name?: string) {
        this.songCategoryId = songCategoryId;
        this.name = name;
    }
}
