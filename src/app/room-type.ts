export class RoomType {
    roomTypeId: number;
    name: string;
    capacity: number;
    roomDetails: string;

    constructor(roomTypeId?: number, name?: string, capacity?: number, roomDetails?: string) {
        this.roomTypeId = roomTypeId;
        this.name = name;
        this.capacity = capacity;
        this.roomDetails = roomDetails;
    }
}
