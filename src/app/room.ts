export class Room {
    roomId: number;
    roomNum: string;
    isDisabled: boolean;

    constructor(roomId?: number, roomNum?: string, isDiabled?: boolean) {
        this.roomId = roomId;
        this.roomNum = roomNum;
        this.isDisabled = isDiabled;
    }
}
