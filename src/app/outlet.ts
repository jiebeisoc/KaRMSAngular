export class Outlet {

    outletId: number;
    outletName: string;
    outletAddress: string;
    outletPhone: string;
    openingHour: Date;
    closingHour: Date;

    constructor(outletId?: number, outletName?: string, outletAddress?: string, outletPhone?: string, openingHour?: Date, closingHour?: Date) {
        this.outletId = outletId;
        this.outletName = outletName;
        this.outletAddress = outletAddress;
        this.outletPhone = outletPhone;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
    }

}
