import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function Home() {
  await dbConnect();
  
  // Obtenemos productos, convirtiéndolos a objetos planos para evitar errores de serialización
  const productsRaw = await Product.find({}).sort({ createdAt: -1 });
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <main className="min-h-screen bg-white p-6 md:p-12">
      <header className="mb-16 text-center">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Shanti Shop 🌿</h1>
        <p className="text-slate-400 mt-4 text-xl font-light italic">Hecho con amor en Quilmes</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* Definimos el tipo del producto directamente en el map para que no chille el linter */}
        {products.map((product: { _id: string; name: string; description: string; price: number; category: string; images: string[] }) => (
          <div key={product._id} className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[4/5] bg-slate-50 overflow-hidden relative">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-slate-800 leading-tight">{product.name}</h2>
              <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">{product.description}</p>
              
              <div className="mt-auto pt-6 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Precio</span>
                  <span className="text-3xl font-black text-slate-900">${product.price.toLocaleString('es-AR')}</span>
                </div>
                <button className="bg-slate-900 text-white h-12 px-6 rounded-2xl font-bold hover:bg-emerald-600 transition-all transform active:scale-90">
                  Comprar
                </button>
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
  );
}