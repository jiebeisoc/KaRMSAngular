import { FoodOrderTransactionLineItem } from './food-order-transaction-line-item';
import { Customer } from './customer';
import { FoodOrderStatus } from './food-order-status.enum';

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

    constructor(customerEntity?:Customer,foodOrderStatus?:FoodOrderStatus,foodOrderTransactionId?: number,foodOrderTransactionLineItemEntities?: FoodOrderTransactionLineItem[], totalLineItem?: number, totalQuantity?: number, totalAmount?: number, transactionDateTime?: Date, voidRefund?: boolean) {
        this.foodOrderTransactionId = foodOrderTransactionId;
        this.totalLineItem = totalLineItem;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
        this.transactionDateTime = transactionDateTime;
        this.foodOrderTransactionLineItemEntities = foodOrderTransactionLineItemEntities;
        this.voidRefund = voidRefund;
        this.customerEntity=customerEntity;
        this.foodOrderStatus=foodOrderStatus;
    }

}
