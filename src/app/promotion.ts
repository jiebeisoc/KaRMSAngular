export class Promotion {
    promotionId: number;
    promotionName: string;
    discountRate: number;
    validFrom: Date;
    validUntil: Date;

    constructor(promotionId?: number, promotionName?: string, discountRate?: number, validFrom?: Date, validTo?: Date) {
        this.promotionId = promotionId;
        this.promotionName = promotionName;
        this.discountRate = discountRate;
        this.validFrom = validFrom;
        this.validUntil = this.validUntil;
    }

}
