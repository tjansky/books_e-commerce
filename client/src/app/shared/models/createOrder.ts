export interface CreateOrderItem {
    bookId: number;
    quantity: number;
}

export interface CreateOrder {
    shipToFirstName: string;
    shipToLastName: string;
    shipToStreet: string;
    shipToCity: string;
    shipToZipcode: string;
    paymentIntendId?: string
    orderItems: CreateOrderItem[];
}