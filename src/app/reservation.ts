export class Reservation {

    reservationId: number;
    date: string;
    duration: number;
    numOfPeople: number;
    note: string;
    totalPrice: number;
    status: string;
    dateReserved: string;
    walkInPhoneNo: string;

    constructor(reservationId?: number, date?: string, duration?: number, numOfPeople?: number, note?: string, totalPrice?: number, status?: string, dateReserved?: string, walkInPhoneNo?: string) {
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
