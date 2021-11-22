export interface Order {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToFirstName: string;
    shipToLastName: string;
    shipToStreet: string;
    shipToCity: string;
    shipToZipcode: string;
    subTotal: number;
    status: string;
    paymentIntendId?: any;
    orderItems?: any;
}