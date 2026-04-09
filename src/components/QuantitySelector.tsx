'use client'
import { useState } from 'react'

interface Props {
  price: number
  stock: number
}

export default function QuantitySelector({ price, stock }: Props) {
  const [quantity, setQuantity] = useState(1)

  const handleMore = () => quantity < stock && setQuantity(quantity + 1)
  const handleLess = () => quantity > 1 && setQuantity(quantity - 1)

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-slate-900 font-bold">Cantidad:</span>
        <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
          <button onClick={handleLess} className="px-4 py-2 hover:bg-slate-100 font-bold text-slate-600">-</button>
          <span className="px-4 py-2 font-black text-slate-900 border-x-2 border-slate-100 w-12 text-center">{quantity}</span>
          <button onClick={handleMore} className="px-4 py-2 hover:bg-slate-100 font-bold text-slate-600">+</button>
        </div>
        <span className="text-slate-400 text-xs font-medium">({stock} disponibles)</span>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <span className="text-slate-500 font-medium">Total a pagar:</span>
          <span className="text-4xl font-black text-slate-900">${(price * quantity).toLocaleString('es-AR')}</span>
        </div>
        
        <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95">
          PAGAR CON MERCADO PAGO
        </button>
      </div>
    </div>
  )
}