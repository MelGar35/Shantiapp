import mongoose, { Schema, Document, Model } from 'mongoose';

// Definimos la interfaz del Producto para TypeScript
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  slug: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  slug: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

// Esto evita errores al recompilar en desarrollo
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;