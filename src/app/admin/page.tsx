import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductForm from "@/components/ProductForm";
import { deleteProduct } from "@/actions/productActions";

export default async function AdminPage() {
  await dbConnect();
  const productsRaw = await Product.find({}).sort({ createdAt: -1 });
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-1">
          <ProductForm />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <h2 className="text-2xl font-black p-6 text-slate-900 border-b-2 border-slate-50 bg-slate-50/50">
              Inventario Shanti Shop 📦
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Producto</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map((product: { _id: string, name: string, images: string[], stock: number, price: number }) => (
                    <tr key={product._id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover border-2 border-slate-200" />
                        <span className="font-bold text-slate-800">{product.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock} UNIDADES
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900">${product.price.toLocaleString('es-AR')}</td>
                      <td className="px-6 py-4 text-right">
                        <form action={async () => {
                          'use server'
                          await deleteProduct(product._id);
                        }}>
                          <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all text-xs border border-red-100">
                            BORRAR
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {products.length === 0 && (
              <p className="text-center py-20 text-slate-400 font-medium italic">No hay tesoros en el inventario...</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}