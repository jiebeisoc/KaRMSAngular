import { FoodOrderTransactionLineItem } from './food-order-transaction-line-item';
import { Customer } from './customer';
import { FoodOrderStatus } from './food-order-status.enum';
import { Outlet } from './outlet';

export class FoodOrderTransaction {
    foodOrderTransactionId: number;
    totalLineItem: number;
    totalQuantity: number;
    totalAmount: number;
    transactionDateTime: Date;
    foodOrderTransactionLineItemEntities: FoodOrderTransactionLineItem[];
    voidRefund: boolean;
    foodOrderStatus:FoodOrderStatus;
    customerEntity: Customer;
    outlet:Outlet
    creditCardNo:string;

    constructor(customerEntity?:Customer,creditCardNo?:string,foodOrderStatus?:FoodOrderStatus,foodOrderTransactionId?: number,foodOrderTransactionLineItemEntities?: FoodOrderTransactionLineItem[], totalLineItem?: number, totalQuantity?: number, totalAmount?: number, transactionDateTime?: Date, voidRefund?: boolean, outlet?:Outlet) {
        this.foodOrderTransactionId = foodOrderTransactionId;
        this.totalLineItem = totalLineItem;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
        this.transactionDateTime = transactionDateTime;
        this.foodOrderTransactionLineItemEntities = foodOrderTransactionLineItemEntities;
        this.voidRefund = voidRefund;
        this.customerEntity=customerEntity;
        this.foodOrderStatus=foodOrderStatus;
        this.outlet=outlet;
    }

}
