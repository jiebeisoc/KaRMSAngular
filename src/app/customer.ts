export class Customer {

    customerId: number;
    name: string;
    phoneNo: string;
    creditCardNo: string;
    username: string;
    password: string;
    birthday: Date;
    email: string;

    constructor(customerId?: number, name?: string, phoneNo?: string, creditCardNo?: string, username?: string, password?: string, birthday?: Date, email?: string) {
        this.customerId = customerId;
        this.name = name;
        this.phoneNo = phoneNo;
        this.creditCardNo = creditCardNo;
        this.username = username;
        this.password = password;
        this.birthday = birthday;
        this.email = email;
    }

}
