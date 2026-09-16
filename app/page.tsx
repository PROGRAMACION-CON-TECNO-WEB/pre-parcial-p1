'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/productCard';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          'https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock'
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p className="p-4">Cargando productos...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}