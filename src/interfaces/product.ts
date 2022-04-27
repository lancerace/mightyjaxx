export interface IProduct {
    sku: string;
    title: {
        type: string;
        unique:any;
    }
    imageUrl: string;
}