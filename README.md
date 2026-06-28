# TiendaPOS — Sistema de Punto de Venta Multi-País para LATAM

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white)](https://tiendapos-app.vercel.app)
[![Framework](https://img.shields.io/badge/Framework-Astro%207-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**[Ver sitio en vivo →](https://tiendapos-app.vercel.app)**

TiendaPOS es un sistema de punto de venta (POS) cloud multi-tenant, multi-país y multi-moneda diseñado para comercios en Latinoamérica. Desde abastos y farmacias hasta ferreterías y cadenas con múltiples sucursales.

---

## Características principales

- **Multi-país**: Venezuela, Colombia, México, Ecuador, Argentina, Perú, Chile, Bolivia, Uruguay
- **Multi-moneda**: 9 monedas LATAM con tasas de cambio automáticas
- **IGTF automático**: Cálculo del 3% en pagos USD para Venezuela
- **Multi-tenant**: Datos aislados por negocio a nivel de base de datos
- **Facturación adaptada**: RIF, NIT, RFC, RUC, CUIT según jurisdicción
- **Control de inventario**: Múltiples almacenes, lotes FEFO, alertas de stock
- **Gestión de créditos**: Límites por cliente, abonos parciales, bloqueo automático
- **API REST**: 112 endpoints con Laravel Sanctum

---

## Rubros soportados

| Rubro | Funcionalidades específicas |
|-------|---------------------------|
| Farmacia | Control de lotes, alertas FEFO, productos controlados |
| Abasto / Bodega | Ventas al crédito, pagos mixtos, IGTF automático |
| Ferretería | Miles de SKUs, categorías jerárquicas, unidades de medida |
| Licorería | Variantes por presentación, lotes de importación, precios por volumen |
| Mini Market | Escaneo rápido, promociones, arqueo de caja |

---

## Planes

| Plan | Precio | Productos | Usuarios | Almacenes |
|------|--------|-----------|----------|-----------|
| Gratis | $0 | 50 | 2 | 1 |
| Básico | $20/mes | 200 | 5 | 2 |
| Pro | $30/mes | 1,000 | 15 | 5 |
| Premium | $45/mes | Ilimitados | Ilimitados | Ilimitados |

Todos los planes incluyen 14 días de prueba gratis sin tarjeta de crédito.

---

## Tech Stack

- **Frontend**: Astro 7 + React 19 + Tailwind CSS 4
- **Animaciones**: GSAP con ScrollTrigger
- **Iconos**: Lucide + React Icons
- **Build**: Vite
- **Deploy**: Vercel
- **SEO**: Schema.org (WebSite, Organization, SoftwareApplication, FAQPage), Open Graph, Twitter Cards

---

## Estructura del proyecto

```
src/
├── components/     # Componentes Astro + React
├── data/           # Contenido centralizado (content.ts)
├── layouts/        # Layout base con SEO
├── pages/          # Rutas: /, /privacidad, /terminos, /aviso-legal
└── styles/         # CSS global + Tailwind
```

---

## Desarrollo local

```bash
git clone https://github.com/belandriajunioremiro-ship-it/TiendaPos.git
cd TiendaPos
npm install
npm run dev
```

---

## Contacto

- WhatsApp: [+58 424-725-3544](https://wa.me/584247253544)
- Email: hola@tiendapos.com
- San Cristóbal, Táchira, Venezuela

---

## Licencia

MIT

---

**Hecho con ❤️ en Venezuela para Latinoamérica**
