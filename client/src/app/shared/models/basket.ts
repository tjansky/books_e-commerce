export interface Basket {
    items: Item[];
    clientSecret?: string;
    paymentIntentId?: string;
}

export interface Item {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;

    format: string;
    language: string;
    author: string;
    stars: number;
}