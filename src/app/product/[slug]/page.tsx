import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";

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
  {/* Reduje el max-width a 4xl para que en desktop no se estire tanto */}
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    
    {/* Lado Izquierdo: Imagen Optimizada con tamaño controlado */}
    <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm max-w-sm mx-auto md:max-w-none w-full">
      <Image 
        src={product.images[0]} 
        alt={product.name} 
        fill
        priority
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover"
      />
    </div>

    {/* Lado Derecho: Info y Pago */}
    <div className="flex flex-col">
      <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[13px] mb-3">
        {product.category}
      </span>
      
      {/* Bajé el tamaño de 5xl a 4xl para que sea más armónico */}
      <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight tracking-tighter">
        {product.name}
      </h1>
      
      <p className="text-slate-500 text-base leading-relaxed mb-2 font-medium">
        {product.description}
      </p>

      {/* Contenedor sutil para el selector de cantidad */}
      <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
        <QuantitySelector product={product} />
      </div>
    </div>
  </div>
</main>
  );
}