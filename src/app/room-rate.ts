import { RoomType } from './room-type';

export class RoomRate {

    roomRateId: number;
    name: string;
    startTime: Date;
    endTime: Date;
    rate: number;
    roomRateType: string;
    roomType: RoomType;

    constructor(roomRateId?: number, name?: string, startTime?: Date, endTime?: Date, rate?: number, roomRateType?: string, roomType?: RoomType) {
        this.roomRateId = roomRateId;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.rate = rate;
        this.roomRateType = roomRateType;
        this.roomType = roomType;
    }

}

