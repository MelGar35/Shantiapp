'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  _id: string
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  // 1. Inicializamos el estado con una función de "Lazy Initializer"
  // Esto evita el error de cascading renders porque solo se ejecuta una vez al inicio
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('shanti-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // 2. Solo necesitamos UN useEffect para GUARDAR cuando el carrito cambia
  useEffect(() => {
    localStorage.setItem('shanti-cart', JSON.stringify(cart));
  }, [cart]);

  // --- El resto de las funciones (addToCart, etc.) quedan igual ---
  const addToCart = (product: CartItem) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id)
      if (exists) {
        return prev.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + product.quantity } : item
        )
      }
      return [...prev, product]
    })
  }

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item._id !== id))

  const updateQuantity = (id: string, qty: number) => {
    setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: qty } : item))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider')
  return context
}