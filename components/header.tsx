'use client';

import Link from 'next/link';
import { useCart } from '@/context/cartContext';

export default function Header() {
  const { cartCount } = useCart();
  const { clearCart } = useCart();

  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-purple-600 z-10">
      <Link href="/" className="text-xl font-bold">
        ShopHub
      </Link>
      <Link href="/checkout" className="font-medium hover:underline">
        Carrito: {cartCount}
      </Link>
      <button
        onClick={() => clearCart()}
        className="bg-gray-600 text-white rounded px-3 py-1"
      >
        Vaciar carro
        </button>
    </header>
  );
}