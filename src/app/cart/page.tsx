'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useIsMounted } from '@/hooks/useIsMounted' // Importamos el hook

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const isMounted = useIsMounted() // Usamos el hook aquí

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // 1. Si no está montado, no renderizamos nada (adiós error de hidratación)
  if (!isMounted) {
    return <div className="min-h-screen bg-slate-50" />
  }

  // 2. Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">Tu carrito está vacío 🌿</h1>
        <p className="text-slate-500 mb-8 font-medium">Parece que aún no sumaste ningún tesoro de Shanti.</p>
        <Link href="/" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          VOLVER A LA TIENDA
        </Link>
      </main>
    )
  }

  // Carrito con productos
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tighter">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LADO IZQUIERDO: Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover border" />
                
                <div className="flex-grow">
                  <h2 className="font-bold text-slate-800 text-lg">{item.name}</h2>
                  <p className="text-emerald-600 font-black">${item.price.toLocaleString('es-AR')}</p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <button 
                      onClick={() => item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center border-2 border-slate-200 rounded-lg font-black text-slate-900 hover:bg-slate-100 transition-colors"
                    >-</button>
                    <span className="font-black text-slate-900 text-lg w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => item.quantity < item.stock && updateQuantity(item._id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center border-2 border-slate-200 rounded-lg font-black text-slate-900 hover:bg-slate-100 transition-colors"
                    >+</button>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                  title="Eliminar producto"
                >
                  <span className="text-2xl font-bold">×</span>
                </button>
              </div>
            ))}
          </div>

          {/* LADO DERECHO: Resumen de pago */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">Resumen</h2>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-slate-500 font-medium text-lg">Total:</span>
                <span className="text-3xl font-black text-slate-900">${total.toLocaleString('es-AR')}</span>
              </div>

              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-lg active:scale-95 uppercase tracking-widest">
                FINALIZAR COMPRA
              </button>
              
              <Link href="/" className="block text-center mt-6 text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors">
                ← Seguir comprando
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}