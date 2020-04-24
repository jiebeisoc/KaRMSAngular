export class Reservation {

    reservationId: number;
    date: Date;
    duration: number;
    numOfPeople: number;
    note: string;
    totalPrice: number;
    status: string;
    dateReserved: Date;
    walkInPhoneNo: string;

    constructor(reservationId?: number, date?: Date, duration?: number, numOfPeople?: number, note?: string, totalPrice?: number, status?: string, dateReserved?: Date, walkInPhoneNo?: string) {
        this.reservationId = reservationId;
        this.date = date;
        this.duration = duration;
        this.numOfPeople = numOfPeople;
        this.note = note;
        this.totalPrice = totalPrice;
        this.status = status;
        this.dateReserved = dateReserved;
        this.walkInPhoneNo = walkInPhoneNo;
    }
}
