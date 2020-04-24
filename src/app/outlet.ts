export class Outlet {

    outletId: number;
    outletName: string;
    outletAddress: string;
    outletPhone: string;
    openingHours: string;
    closingHours: string;

    constructor(outletId?: number, outletName?: string, outletAddress?: string, outletPhone?: string, openingHour?: string, closingHour?: string) {
        this.outletId = outletId;
        this.outletName = outletName;
        this.outletAddress = outletAddress;
        this.outletPhone = outletPhone;
        this.openingHours = openingHour;
        this.closingHours = closingHour;
    }

}
