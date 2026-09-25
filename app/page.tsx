'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/productCard';

const PRODUCTS_PER_PAGE = 8;

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const skip = (page - 1) * PRODUCTS_PER_PAGE;
        const res = await fetch(
          `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}&select=id,title,price,category,thumbnail,stock`
        );
        const data: ProductsResponse = await res.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  if (loading) return <p className="p-4">Cargando productos...</p>;

  const filteredProducts = products.filter((product) => {
  const matchesName = product.title
    .toLowerCase()
    .includes(nameFilter.trim().toLowerCase());

  const min = minPrice === '' ? -Infinity : Number(minPrice);
  const max = maxPrice === '' ? Infinity : Number(maxPrice);
  const matchesPrice = product.price >= min && product.price <= max;

  return matchesName && matchesPrice;
});

const hasActiveFilters = nameFilter !== '' || minPrice !== '' || maxPrice !== '';

function clearFilters() {
  setNameFilter('');
  setMinPrice('');
  setMaxPrice('');
}

    return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-end">
        <div className="flex flex-col">
          <label htmlFor="nameFilter" className="text-sm font-medium mb-1">
            Buscar por nombre
          </label>
          <input
            id="nameFilter"
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Ej: Apple"
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm font-medium mb-1">
            Precio mínimo
          </label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            className="border rounded px-3 py-2 w-32"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm font-medium mb-1">
            Precio máximo
          </label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="1000"
            className="border rounded px-3 py-2 w-32"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="bg-gray-600 text-white rounded px-4 py-2"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No se encontraron productos.</p>
          <button
            onClick={clearFilters}
            className="bg-purple-600 text-white rounded px-4 py-2"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="bg-purple-600 text-white rounded px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <span className="font-medium">
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
          className="bg-purple-600 text-white rounded px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}