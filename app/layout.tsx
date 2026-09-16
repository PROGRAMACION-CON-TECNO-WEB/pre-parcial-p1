import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/cartContext';
import  Header  from '@/components/header';

export const metadata: Metadata = {
  title: 'ShopHub',
  description: 'Plataforma de comercio electrónico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          <main className="max-w-6xl mx-auto">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}