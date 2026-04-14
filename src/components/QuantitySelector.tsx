'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface Props {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  }
}

export default function QuantitySelector({ product }: Props) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  // Verificamos que los datos existan para evitar errores visuales
  const currentPrice = product?.price || 0;
  const currentStock = product?.stock || 0;

  const handleMore = () => quantity < currentStock && setQuantity(prev => prev + 1)
  const handleLess = () => quantity > 1 && setQuantity(prev => prev - 1)

  const onAdd = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: currentPrice,
      image: product.images?.[0] || '',
      quantity: quantity,
      stock: currentStock
    })
    alert(`¡Sumaste ${quantity} ${product.name} al carrito! 🌿`)
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-slate-900 font-bold text-base">Cantidad:</span>
        
        <div className="flex items-center border-2 border-slate-400 rounded-xl overflow-hidden bg-white shadow-sm">
          <button 
            type="button"
            onClick={handleLess} 
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 font-black text-slate-900 text-xl transition-colors border-r border-slate-300"
          >
            -
          </button>
          
          <span className="px-6 py-2 font-black text-slate-900 text-lg min-w-[3.5rem] text-center bg-white">
            {quantity}
          </span>
          
          <button 
            type="button"
            onClick={handleMore} 
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 font-black text-slate-900 text-xl transition-colors border-l border-slate-300"
          >
            +
          </button>
        </div>
        
        <span className="text-slate-600 text-sm font-bold bg-slate-100 px-3 py-1 rounded-full">
          {currentStock} disponibles
        </span>
      </div>

      <div className="pt-6 border-t-2 border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <span className="text-slate-600 font-bold text-lg tracking-tight">Total a pagar:</span>
          <span className="text-4xl font-black text-slate-900 drop-shadow-sm">
            ${(currentPrice * quantity).toLocaleString('es-AR')}
          </span>
        </div>
        
        <button 
          onClick={onAdd}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
        >
          AÑADIR AL CARRITO
        </button>
      </div>
    </div>
  )
}