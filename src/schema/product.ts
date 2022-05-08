import { Schema } from 'mongoose';
import { IProduct } from '../interfaces/product';


const ProductSchema = new Schema<IProduct>({
    sku: String, 
    title: {
        type:String,
        unique: [true, 'That email address is taken.']
    },
    fileType: String,
    fileName: String,
    fileUrl: String
});


export default ProductSchema;