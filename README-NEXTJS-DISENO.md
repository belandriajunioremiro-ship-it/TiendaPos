# 🎨 DISEÑO CSS PARA NEXT.JS — TiendaPOS

Copia todo esto en tu proyecto Next.js.

---

## 📁 PASO 1 — Instala lo necesario

```bash
npm install tailwindcss @tailwindcss/vite lucide-react
```

---

## 📁 PASO 2 — Crea `app/globals.css` y pega todo esto:

```css
@import "tailwindcss";

@theme {

  /* ============ TIPOGRAFÍAS ============ */
  /* Montserrat = titulos grandes (h1, h2, h3)
     Inter = textos normales, parrafos, botones
     JetBrains Mono = codigo, numeros, badges */
  --font-display: "Montserrat", "Inter", system-ui, sans-serif;
  --font-body: "Inter", "system-ui", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;

  /* ============ COLORES DE FONDO (oscuros) ============ */
  --color-dark-primary: #0A0A0B;    /* fondo principal, casi negro */
  --color-dark-secondary: #111113;  /* fondo de secciones alternas */
  --color-dark-tertiary: #18181B;   /* fondo de tarjetas elevadas */
  --color-dark-elevated: #1F1F23;   /* hover de tarjetas */
  --color-dark-border: #27272A;     /* bordes de todo */

  /* ============ COLOR AMBER (naranja-dorado, tu marca) ============ */
  --color-amber: #F59E0B;           /* boton primario, texto destacado */
  --color-amber-light: #FBBF24;     /* hover de texto amber */
  --color-amber-dark: #D97706;      /* hover de boton amber */

  /* ============ COLORES DE ESTADO ============ */
  --color-success: #10B981;         /* verde exito, online */
  --color-error: #EF4444;           /* rojo error, alerta */

  /* ============ BORDES REDONDEADOS ============ */
  --radius-sm: 4px;                 /* casi no se usa */
  --radius-md: 8px;                 /* botones pequeños */
  --radius-lg: 12px;                /* botones grandes, items FAQ */
  --radius-xl: 16px;                /* tarjetas, paneles (el mas comun) */
  --radius-2xl: 24px;               /* widget de chat */
}

/* ============ FONDO CON CUADRICULA (hero, secciones importantes) ============ */
/* Pones esto detras de un hero o seccion y se ve como cuadritos */
.grid-pattern {
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* ============ FONDO CON PUNTITOS (menos comun) ============ */
.dot-pattern {
  background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ============ SCROLLBAR OSCURO ============ */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: var(--color-dark-primary); }
::-webkit-scrollbar-thumb { background: var(--color-dark-border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #52525B; }

/* ============ FOCO AMBER ============ */
:focus-visible { outline: 2px solid var(--color-amber); outline-offset: 2px; }

/* ============ TEXTO SELECCIONADO ============ */
::selection { background-color: var(--color-amber); color: var(--color-dark-primary); }
```

---

## 📁 PASO 3 — En tu `app/layout.tsx` pega esto:

```tsx
import type { Metadata } from "next"
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const display = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
})

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "TiendaPOS — POS Multi-País para Latinoamérica",
  description: "Sistema de punto de venta multi-país para farmacias, abastos, ferreterías y comercios en 9 países LATAM.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased bg-dark-primary text-zinc-100">
        {children}
      </body>
    </html>
  )
}
```

---

# 🧩 COMPONENTES COMUNES

## 🌟 Tarjeta (la mas usada)

```tsx
<div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-amber/30 transition-all">
  <h3 className="font-display font-bold text-zinc-100 mb-2">Titulo</h3>
  <p className="text-zinc-400 text-sm leading-relaxed">Descripcion</p>
</div>
```

## 🔘 Boton primario (amber)

```tsx
<button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber text-zinc-900 font-semibold text-sm hover:bg-amber-dark transition-all">
  Comenzar
  <ArrowRight size={16} />
</button>
```

## 🔘 Boton secundario (borde)

```tsx
<button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-800/50 transition-all">
  Hablar con asesor
</button>
```

## ✨ Glow orb (detras de heroes)

```tsx
<div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber/10 rounded-full blur-[100px] pointer-events-none" />
```

## ✅ Check list (beneficios, caracteristicas)

```tsx
<div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/40">
  <Check size={16} className="text-amber shrink-0 mt-0.5" />
  <span className="text-zinc-300 text-sm">9 monedas LATAM: USD, VES, COP, MXN...</span>
</div>
```

## 🏷️ Badge / etiqueta

```tsx
<span className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">Nuevo</span>
```

## 📦 Navbar pegajosa (la del sitio actual)

```tsx
<header className="fixed top-0 left-0 right-0 z-50">
  <div className="absolute inset-0 bg-dark-primary/80 backdrop-blur-xl border-b border-zinc-800/50" />
  <nav className="relative container-main flex items-center justify-between h-16 lg:h-20 px-6">
    {/* logo a la izquierda, links al centro, whatsapp a la derecha */}
  </nav>
</header>
```

## 🦶 Footer con marca de agua

```tsx
<footer className="relative overflow-hidden bg-dark-primary min-h-[400px] flex flex-col justify-between">
  <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
  <span className="font-display font-black text-[clamp(5rem,28vw,18rem)] text-zinc-900/35 select-none text-center leading-none">
    TiendaPOS
  </span>
  {/* contenido del footer */}
</footer>
```

---

# 🎯 TAMAÑOS DE TITULOS (usa clamp)

| Etiqueta | Tamaño |
|---|---|
| `h1` | `text-[clamp(2.75rem,6vw,4.5rem)] font-display font-black` |
| `h2` | `text-[clamp(2rem,4vw,3rem)] font-display font-bold` |
| `h3` | `text-[clamp(1.5rem,3vw,2.25rem)] font-display font-bold` |
| `section title` | `text-2xl sm:text-3xl font-display font-bold` |

TODOS los titulos llevan: `leading-[1.1]` y opcional `tracking-tight`

---

# 📐 ESPACIOS COMUNES

| Que es | Clases |
|---|---|
| Padding de tarjeta | `p-6` |
| Padding de seccion | `py-16 lg:py-20` |
| Padding de hero (arriba) | `pt-32 sm:pt-36 lg:pt-44` |
| Gap entre tarjetas | `gap-4` o `gap-5` |
| Gap entre items | `gap-2` o `gap-3` |
| Contenedor maximo | `max-w-7xl mx-auto px-6` |

---

# 📦 ICONOS (lucide-react)

```tsx
import {
  ArrowRight, Check, ChevronDown, Menu, X, Zap, Shield, Globe,
  Coins, CreditCard, Banknote, Store, Package, BarChart3,
  Users, Server, Database, Lock, Layers, Building2,
  Clock, Receipt, ShoppingBag, Star, Sparkles, FileText, Scale,
  DollarSign, HelpCircle, Search, Smartphone, Scan, Bell, Truck
} from "lucide-react"
```

Usalos asi:
```tsx
<Zap size={16} className="text-amber" />
<Check size={16} className="text-amber shrink-0 mt-0.5" />
```

---

# ✅ RESUMEN RAPIDO (lo que siempre usas)

```
Fondo de pagina:   bg-dark-primary
Fondo alterno:     bg-dark-secondary
Fondo tarjeta:     bg-zinc-900/60 border border-zinc-800/60
Texto blanco:      text-zinc-100
Texto gris:        text-zinc-400
Texto gris oscuro: text-zinc-500
Color marca:       text-amber / bg-amber / border-amber
Boton principal:   bg-amber text-zinc-900 font-semibold
Boton secundario:  border-zinc-700 text-zinc-300
Radio tarjeta:     rounded-xl
Radio boton:       rounded-lg
Fuente titulos:    font-display
Fuente cuerpo:     font-body
Fuente mono:       font-mono
Hover tarjeta:     hover:border-amber/30
Hover texto:       hover:text-amber
Transicion:        transition-all (o transition-colors)
Sombra orb:        bg-amber/10 rounded-full blur-[100px]
```

---

Hecho con ❤️ para que copies y pegues sin pensar.
