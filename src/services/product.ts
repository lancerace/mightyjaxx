import mongoose from "mongoose"
import { IProduct,UploadURL } from "../interfaces";
import ProductSchema from "../schema/product"
import short from 'short-uuid';
import AWSUtil from '../utils/aws';

import { UpdateResult, DeleteResult } from "mongodb";
async function addProduct(title: string, fileName: string, fileType:any): Promise<IProduct> {
    const Product = mongoose.model<IProduct>("Product", ProductSchema);
    const product = new Product({ sku:short.generate(), title, fileName, fileType});
    return product.save();
}

async function getProducts(limit: number, skip:number): Promise<IProduct[]> {
    const Product = mongoose.model<IProduct>("Product", ProductSchema);
    return Product.find().select('-__v -_id').limit(limit).skip(skip);
}

async function getProduct(sku:string): Promise<IProduct> {
    const Product = mongoose.model<IProduct>("Product", ProductSchema);
    return Product.findOne({sku});
}

async function updateProduct(sku: string, fields: { title?: string, imageUrl?: any }): Promise<IProduct> {
    const Product = mongoose.model<IProduct>("Product", ProductSchema);
    return Product.findOneAndUpdate({ sku }, fields);

}

async function deleteProduct(sku:string):Promise<DeleteResult>{
    const Product = mongoose.model<IProduct>("Product", ProductSchema);
    return Product.deleteOne({ sku });
}

export default { addProduct, getProducts, deleteProduct, updateProduct,getProduct }