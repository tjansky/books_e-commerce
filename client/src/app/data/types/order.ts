// export interface Order {
//     id: number;
//     buyerEmail: string;
//     orderDate: Date;
//     shipToFirstName: string;
//     shipToLastName: string;
//     shipToStreet: string;
//     shipToCity: string;
//     shipToZipcode: string;
//     subTotal: number;
//     status: string;
//     paymentIntendId?: any;
//     orderItems?: any;
// }


export interface OrderItem {
    id: number;
    bookId: number;
    bookName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
    orderId: number;
}

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
    paymentIntendId: string;
    orderItems: OrderItem[];
}