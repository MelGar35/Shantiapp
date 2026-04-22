'use client'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useIsMounted } from '@/hooks/useIsMounted' // Importamos el hook que ya creamos

export default function Navbar() {
  const { cart } = useCart()
  const isMounted = useIsMounted() // Detectamos si ya estamos en el cliente

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-slate-900 tracking-tighter italic hover:text-emerald-600 transition-colors">
          Shanti Shop
        </Link>
        
        <Link href="/cart" className="relative p-2 bg-slate-100 rounded-xl hover:bg-emerald-100 transition-colors">
          <span className="text-xl">🛒</span>
          
          {/* CRUCIAL: Solo mostramos la burbuja si isMounted es true */}
          {isMounted && totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}