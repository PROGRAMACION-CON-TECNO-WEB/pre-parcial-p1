'use client';

import Link from 'next/link';
import { useCart } from '@/context/cartContext';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-purple-600 z-10">
      <Link href="/" className="text-xl font-bold">
        ShopHub
      </Link>
      <div className="font-medium"> Carrito: {cartCount}</div>
    </header>
  );
}