import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import QuantitySelector from "@/components/QuantitySelector";

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  await dbConnect();
  const { slug } = await params;

  // Buscamos el producto por su slug
  const productRaw = await Product.findOne({ slug });
  
  if (!productRaw) {
    notFound(); // Si no existe, muestra la página 404 de Next.js
  }

  const product = JSON.parse(JSON.stringify(productRaw));

  return (
    <main className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Lado Izquierdo: Galería/Imagen */}
        <div className="rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Lado Derecho: Info y Pago */}
        <div className="flex flex-col justify-center">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-2">
            {product.category}
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <QuantitySelector price={product.price} stock={product.stock} />
        </div>
      </div>
    </main>
  );
}