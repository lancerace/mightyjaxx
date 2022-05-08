export interface IProduct {
    sku: string;
    title: {
        type: string;
        unique:any;
    }
    fileType: string;
    fileName: string;
    fileUrl:string; 
}

export enum UploadURL {
    PRODUCT = 'image'
}