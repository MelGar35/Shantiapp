import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  await dbConnect();
  
  // Obtenemos productos, convirtiéndolos a objetos planos para evitar errores de serialización
  const productsRaw = await Product.find({}).sort({ createdAt: -1 });
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <main className="min-h-screen bg-white p-6 md:p-12">
      <header className="mb-16 text-center">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Shanti Shop</h1>
        <p className="text-slate-400 mt-4 text-xl font-light italic">Hecho con amor</p>
      </header>

      <section className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {/* Mantenemos tu tipado exacto sin any */}
        {products.map((product: { _id: string; name: string; description: string; price: number; category: string; images: string[]; slug: string; }) => (
          <div key={product._id} className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 w-full md:w-80">
            
            {/* AJUSTE: Cambié aspect-4/5 a aspect-square para que la imagen no ocupe tanto alto */}
            <div className="aspect-square bg-slate-50 overflow-hidden relative">
            <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill // Esto hace que la imagen ocupe todo el div padre
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={true} // Opcional: solo para las primeras imágenes que se ven al cargar
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            {/* AJUSTE: Reduje un poco los paddings (p-5) y tamaños de texto para equilibrar el tamaño menor */}
            <div className="p-5 flex flex-col grow">
              <h2 className="text-lg font-bold text-slate-800 leading-tight truncate">{product.name}</h2>
              <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
              
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Precio</span>
                  <span className="text-xl font-black text-slate-900">${product.price.toLocaleString('es-AR')}</span>
                </div>
                {/* Cambié el botón para que sea un "Ver detalle" ya que la cantidad la veremos ahí */}
                <Link 
            href={`/product/${product.slug}`} 
            className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black hover:bg-emerald-600 transition-all active:scale-95 shadow-md"
          >
            VER MÁS
          </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {products.length === 0 && (
        <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-[3rem] max-w-3xl mx-auto mt-10">
          <p className="text-slate-300 text-xl font-medium">Aún no hay tesoros cargados en la tienda.</p>
        </div>
      )}
    </main>
  )
}