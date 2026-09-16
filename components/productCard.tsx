'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/cartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 object-contain mb-2"
      />
      <h2 className="font-semibold">{product.title}</h2>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="font-bold">${product.price}</p>
      <p className="text-sm">Stock: {product.stock}</p>
      <Link href={`/productos/${product.id}`} className="text-blue-600 underline mt-2">
        Ver detalle
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white rounded px-3 py-1 mt-2"
      >
        Agregar al carrito
      </button>
    </div>
  );
}