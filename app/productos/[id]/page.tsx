'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/cartContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-4">Cargando producto...</p>;
  if (!product) return <p className="p-4">Producto no encontrado.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-600 underline">
        ← Volver al catálogo
      </Link>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-64 object-contain my-4"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-500">
        {product.category}
        {product.brand ? ` · ${product.brand}` : ''}
      </p>
      <p className="text-xl font-semibold my-2">${product.price}</p>
      <p className="text-sm">Stock disponible: {product.stock}</p>
      <p className="my-4">{product.description}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        Agregar al carrito
      </button>
    </div>
  );
}