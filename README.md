This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Decisiones de Arquitectura y Cambios del Parcialexplicando técnicamente lo implementado

En el punto 1, cree dos nuevas funciones dentro de cartContext decreaseQuantity y clearCart. Ya que pedían una nueva función para eliminar lo agregado y otra para vaciar por completo los items del carrito.

En el preparcial, el carrito solo guardaba una lista simple de productos, sin llevar cuenta de cuántas unidades había de cada uno. Cuando se agregaba el mismo producto varias veces, este quedaba repetido dentro del arreglo en lugar de agruparse.

Para el parcial cambié la estructura y ahora cada producto dentro del carrito tiene un campo extra llamado quantity, que representa cuántas unidades de ese producto seleccionó el usuario.Así, en vez de tener el mismo producto repetido varias veces en la lista, hay un solo registro por producto con su cantidad correspondiente. Esto se ve representando en quantity.

Por otro lado, el carrito ahora cuenta con la inmutabilidad la cual al agregar un item y darle eliminar en otro item, el carro no presenta cambios debido a que el ese item nunca se agrego antes.

Para el total del carrito y el conteo de artículos no usé un estado aparte guardado con useState. En vez de eso, estos valores se calculan cada vez que el componente se vuelve a renderizar, usando la función reduce sobre la lista de productos del carrito.

Para el conteo de artículos, se suma las cantidades de todos los productos y el total en dinero suma el resultado de multiplicar el precio por la cantidad de cada producto. Decidí calcularlos así, en tiempo real, en lugar de guardarlos como un estado independiente debido a que si los guardara aparte tendría que acordarme de actualizarlos manualmente cada vez que cambia el carrito y eso podría generar errores.

En el punto 2, el formulario de checkout lo hice completamente controlado por React, es decir, ningún campo maneja su propio valor por su cuenta como se haría normalmente en HTML, sino que todos dependen de un estado central que yo creé con useState. Ese estado se llama formData y es un objeto que guarda a la vez el nombre completo, el correo, el método de pago y si la persona aceptó los términos y condiciones. Cabe aclarar que input tiene su valor donde uso onChange para actualizar los campos especificos de formData.

Además del valor de cada campo, manejo otro estado llamado touched, la cual el objetivo de esto es que si el usuario ya hizo clic en tal campo, se pueda producir una advertencia si es necesaria usando onBlur, la cual esta configurado para cada campo que guarde en formData la cual por ejemplo, si el nombre es menor de 5 palabras, tira una advertencia y así con las restricciones de los demás campos.

Por otro lado, cuando el usuario le da enviar, evito que la pagina se recargue usando event.preventDefault, cumpliendo con una de las condiciones exigidas en el enunciado. Para finalizar, no use ninguna libreria externa en este formulario, todo lo aplique usando React.
