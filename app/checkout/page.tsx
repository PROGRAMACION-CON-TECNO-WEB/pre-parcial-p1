'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cartContext';

interface CheckoutFormData {
  fullName: string;
  email: string;
  paymentMethod: string;
  acceptTerms: boolean;
}

interface TouchedFields {
  fullName: boolean;
  email: boolean;
}

const INITIAL_FORM_DATA: CheckoutFormData = {
  fullName: '',
  email: '',
  paymentMethod: 'tarjeta',
  acceptTerms: false,
};

const INITIAL_TOUCHED: TouchedFields = {
  fullName: false,
  email: false,
};

const MIN_NAME_LENGTH = 5;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIMULATED_NETWORK_DELAY_MS = 1200;

function isNameValid(fullName: string): boolean {
  return fullName.trim().length >= MIN_NAME_LENGTH;
}

function isEmailValid(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export default function CheckoutPage() {
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM_DATA);
  const [touched, setTouched] = useState<TouchedFields>(INITIAL_TOUCHED);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const nameError =
    touched.fullName && !isNameValid(formData.fullName)
      ? 'El nombre debe tener al menos 5 caracteres.'
      : null;

  const emailError =
    touched.email && !isEmailValid(formData.email)
      ? 'Ingresa un correo electrónico válido.'
      : null;

  const isFormValid =
    isNameValid(formData.fullName) &&
    isEmailValid(formData.email) &&
    formData.acceptTerms;

  const canSubmit = isFormValid && !isSubmitting && cartItems.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_NETWORK_DELAY_MS));

    clearCart();
    setFormData(INITIAL_FORM_DATA);
    setTouched(INITIAL_TOUCHED);
    setIsSubmitting(false);
    setIsOrderComplete(true);
  }

  if (isOrderComplete) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">¡Pedido confirmado!</h1>
        <p className="text-gray-600 mb-6">
          Tu orden fue procesada exitosamente. Gracias por comprar en ShopHub.
        </p>
        <Link href="/" className="text-blue-600 underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
      <section>
        <h1 className="text-2xl font-bold mb-4">Resumen de compra</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-between font-bold text-lg">
          <span>Artículos: {cartCount}</span>
          <span>Total: ${cartTotal.toFixed(2)}</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Datos de pago</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="fullName" className="block font-medium mb-1">
              Nombre completo
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, fullName: event.target.value }))
              }
              onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
              className="w-full border rounded px-3 py-2"
            />
            {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Correo de facturación
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, email: event.target.value }))
              }
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              className="w-full border rounded px-3 py-2"
            />
            {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="paymentMethod" className="block font-medium mb-1">
              Método de pago
            </label>
            <select
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, paymentMethod: event.target.value }))
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="pse">PSE</option>
              <option value="contraentrega">Pago contraentrega</option>
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, acceptTerms: event.target.checked }))
              }
            />
            Acepto los términos y condiciones
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Procesando pedido...' : 'Confirmar pedido'}
          </button>
        </form>
      </section>
    </div>
  );
}
