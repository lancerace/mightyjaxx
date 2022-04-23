import { Schema } from 'mongoose';
import { IProduct } from '../interfaces/product';


const ProductSchema = new Schema<IProduct>({
    sku: String, // String is shorthand for {type: String}
    title: String,
    imageUrl: String
});


export default ProductSchema;