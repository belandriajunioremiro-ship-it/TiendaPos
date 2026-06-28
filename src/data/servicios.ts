export interface Servicio {
  slug: string;
  titulo: string;
  tituloH1: string;
  descripcion: string;
  metaDescripcion: string;
  heroDesc: string;
  beneficios: { texto: string }[];
  funcionamiento: { paso: string; texto: string }[];
  caracteristicas: string[];
  preguntasFrecuentes: { q: string; a: string }[];
  img: string;
}

export const servicios: Servicio[] = [
  {
    slug: "farmacia",
    titulo: "Farmacia",
    tituloH1: "Sistema POS para Farmacias en Latinoamérica",
    descripcion: "Control de medicamentos por lote, vencimientos FEFO y seguimiento de productos controlados. Adaptado a cada jurisdicción de LATAM.",
    metaDescripcion: "Sistema POS para farmacias en LATAM. Control de lotes FEFO, alertas de vencimiento, productos controlados y facturación fiscal adaptada a cada país.",
    heroDesc: "Controla medicamentos por lote, evita vencimientos con alertas FEFO y gestiona productos controlados. Todo adaptado a las regulaciones de tu país.",
    beneficios: [
      { texto: "Nunca más pierdas inventario por vencimientos. El sistema te alerta antes de que caduquen." },
      { texto: "Campos específicos: principio activo, dosis, presentación y laboratorio." },
      { texto: "Reportes de movimientos por cada medicamento para tomar decisiones." },
      { texto: "Seguimiento de productos controlados con trazabilidad completa." },
    ],
    funcionamiento: [
      { paso: "Registrás tus productos", texto: "Cargás tus medicamentos con lote, fecha de vencimiento, principio activo y presentación." },
      { paso: "Vendés con escaneo", texto: "Código de barras o búsqueda por nombre. El sistema registra automáticamente el lote que sale." },
      { paso: "Alertas automáticas", texto: "Cuando un lote está próximo a vencer, TiendaPOS te avisa para que actives promociones o devoluciones." },
      { paso: "Reportes fiscales", texto: "Todo listo para tu contador con los datos fiscales de tu país (RIF, NIT, RFC, CUIT)." },
    ],
    caracteristicas: [
      "Control de lotes con fecha de vencimiento",
      "Alertas FEFO para evitar pérdidas",
      "Campos: principio activo, dosis, presentación, laboratorio",
      "Reportes de movimientos por medicamento",
      "Seguimiento de productos controlados",
      "Facturación con RIF, NIT, RFC, CUIT o RUC",
      "Múltiples métodos de pago",
      "Multimoneda e IGTF automático",
    ],
    preguntasFrecuentes: [
      { q: "¿TiendaPOS maneja control de lotes?", a: "Sí. Cada producto puede tener múltiples lotes con fecha de vencimiento individual. El sistema aplica FEFO automáticamente al vender." },
      { q: "¿Puedo rastrear productos controlados?", a: "Sí. Los productos controlados tienen seguimiento individual con reportes de entrada y salida por unidad." },
      { q: "¿Sirve para cadenas de farmacias?", a: "Sí. Con la arquitectura multi-tenant podés gestionar múltiples sucursales con datos aislados y reportes consolidados." },
      { q: "¿Se adapta a mi país?", a: "TiendaPOS funciona en 9 países LATAM. Cada país tiene sus propios campos fiscales (RIF, NIT, RFC, CUIT, RUC) configurados automáticamente." },
    ],
    img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=600&fit=crop&auto=format",
  },
  {
    slug: "abarrotes",
    titulo: "Abasto / Bodega",
    tituloH1: "Sistema POS para Abastos y Bodegas en LATAM",
    descripcion: "Ventas rápidas, control de crédito, pagos mixtos multimoneda e IGTF automático para Venezuela.",
    metaDescripcion: "POS para abastos y bodegas en Latinoamérica. Ventas al crédito, pagos mixtos, IGTF automático y control de inventario en tiempo real.",
    heroDesc: "Ventas al crédito con límite por cliente, pagos mixtos (efectivo + tarjeta + móvil), multimoneda e IGTF automático para Venezuela.",
    beneficios: [
      { texto: "Tus clientes compran al fiado sin que pierdas el control. Límites, abonos y bloqueo automático." },
      { texto: "Cobrá en bolívares, dólares, pesos o la moneda que tu cliente necesite." },
      { texto: "IGTF del 3% se calcula solo, sin que tengas que hacer cuentas." },
      { texto: "Búsqueda instantánea por nombre o código de barras para vender más rápido." },
    ],
    funcionamiento: [
      { paso: "Registrás tu inventario", texto: "Cargás tus productos con precio en la moneda base de tu país." },
      { paso: "Vendés al contado o al crédito", texto: "Escaneás, elegís método de pago y si es fiado, asignás al cliente con su límite." },
      { paso: "Cobrás en varias monedas", texto: "El cliente paga en efectivo, tarjeta o una mezcla. El sistema calcula IGTF si aplica." },
      { paso: "Cerrás caja automático", texto: "Arqueo de caja con totakles por moneda, métodos de pago y diferencias." },
    ],
    caracteristicas: [
      "Ventas al crédito con límite por cliente",
      "Pagos mixtos: efectivo + tarjeta + móvil",
      "IGTF 3% automático para Venezuela",
      "Búsqueda instantánea por nombre o código",
      "Multimoneda: USD, VES, COP, MXN, ARS, PEN, CLP, BOB, UYU",
      "Arqueo de caja automático",
      "Alertas de stock bajo",
      "Reportes de ventas por periodo",
    ],
    preguntasFrecuentes: [
      { q: "¿Puedo darle crédito a mis clientes?", a: "Sí. Cada cliente tiene un límite de crédito configurable. Cuando lo supera, el sistema bloquea automáticamente nuevas ventas al fiado." },
      { q: "¿Cómo funciona el IGTF?", a: "Si estás en Venezuela, el 3% se calcula automáticamente sobre pagos en USD. No necesitas hacer cálculos manuales." },
      { q: "¿Puedo cobrar en varias monedas en una misma venta?", a: "Sí. Pagos mixtos: el cliente paga una parte en efectivo, otra con tarjeta. Cada método en la moneda que elijas." },
      { q: "¿Se puede usar sin internet?", a: "TiendaPOS requiere internet para funcionar, pero los datos se sincronizan en tiempo real." },
    ],
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop&auto=format",
  },
  {
    slug: "ferreteria",
    titulo: "Ferretería",
    tituloH1: "Sistema POS para Ferreterías en LATAM",
    descripcion: "Miles de SKUs organizados por categorías jerárquicas, unidades de medida con conversión y stock mínimo.",
    metaDescripcion: "POS para ferreterías en Latinoamérica. Gestión de miles de SKUs, categorías jerárquicas, conversión de unidades y alertas de stock mínimo.",
    heroDesc: "Organizá miles de productos en categorías, manejá unidades de medida con conversión automática y nunca te quedes sin stock.",
    beneficios: [
      { texto: "Miles de SKUs sin desorden. Categorías jerárquicas: electricidad, plomería, construcción." },
      { texto: "Unidades de medida con conversión automática. Vendés por unidad o por kilo, el sistema convierte solo." },
      { texto: "Productos equivalentes y sustitutos. Si no tenés exactamente lo que buscan, ofrecés la alternativa." },
      { texto: "Stock mínimo por categoría con alertas antes de que se agote." },
    ],
    funcionamiento: [
      { paso: "Cargás tu catálogo", texto: "Organizás productos en categorías jerárquicas con sus unidades de medida." },
      { paso: "Configurás equivalencias", texto: "Definís productos equivalentes, sustitutos y códigos de barras múltiples." },
      { paso: "Vendés con escaneo", texto: "El vendedor escanea el código de barras o busca por nombre. Si no hay stock, el sistema sugiere sustitutos." },
      { paso: "Controlás stock", texto: "Alertas automáticas cuando un producto llega a su mínimo. Sabés cuándo y qué comprar." },
    ],
    caracteristicas: [
      "Categorías jerárquicas: electricidad, plomería, construcción",
      "Unidades de medida con conversión automática",
      "Productos equivalentes y sustitutos",
      "Códigos de barras múltiples por producto",
      "Stock mínimo por categoría con alertas",
      "Múltiples precios por cantidad",
      "Reportes de rotación por producto",
      "Facturación fiscal adaptada a cada país",
    ],
    preguntasFrecuentes: [
      { q: "¿Soporta miles de productos?", a: "Sí. El plan Pro maneja hasta 1,000 productos y Premium no tiene límite. Categorías jerárquicas para mantener todo organizado." },
      { q: "¿Cómo funciona la conversión de unidades?", a: "Si vendés alambre por metro y por kilo, definís la equivalencia y el sistema la aplica automáticamente." },
      { q: "¿Puedo tener múltiples códigos de barras por producto?", a: "Sí. Un mismo producto puede tener varios códigos de barras (EAN, SKU, código interno)." },
      { q: "¿Sirve para ferreterías con varias sucursales?", a: "Sí. Arquitectura multi-tenant con múltiples almacenes y traslados entre sedes." },
    ],
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&auto=format",
  },
  {
    slug: "licoreria",
    titulo: "Licorería",
    tituloH1: "Sistema POS para Licorerías en LATAM",
    descripcion: "Gestión de inventario por presentaciones, lotes de importación, precios por volumen y reportes de rotación.",
    metaDescripcion: "POS para licorerías en Latinoamérica. Control de inventario por presentaciones, lotes de importación, precios por volumen y multimoneda.",
    heroDesc: "Controlá tu inventario por presentación (750ml, 1L), gestioná lotes de importación y ofrecé precios especiales por volumen.",
    beneficios: [
      { texto: "Variantes por tamaño: 750ml, 1L, 2L. Un solo producto, múltiples presentaciones." },
      { texto: "Control de stock por lote de importación. Sabés exactamente cuándo llegó cada lote." },
      { texto: "Precios diferenciados por cantidad. Mayor volumen, mejor precio, automático." },
      { texto: "Reportes de rotación para saber qué se vende más y qué se queda en los estantes." },
    ],
    funcionamiento: [
      { paso: "Registrás productos con variantes", texto: "Un mismo licor lo cargás una vez con múltiples presentaciones: 750ml, 1L, 2L." },
      { paso: "Controlás lotes de importación", texto: "Cada lote con fecha de ingreso, proveedor y costo por unidad." },
      { paso: "Configurás precios por volumen", texto: "Definís descuentos automáticos: 10 unidades = 5% off, 24 unidades = 10% off." },
      { paso: "Vendés y analizás", texto: "Reportes de productos más vendidos, rotación y rentabilidad por línea." },
    ],
    caracteristicas: [
      "Variantes por presentación: 750ml, 1L, 2L",
      "Control de stock por lote de importación",
      "Precios diferenciados por cantidad",
      "Reportes de rotación por producto",
      "Descuentos automáticos por volumen",
      "Multimoneda: USD, VES, COP, MXN, ARS",
      "IGTF automático para Venezuela",
      "Facturación fiscal adaptada a cada país",
    ],
    preguntasFrecuentes: [
      { q: "¿Puedo tener un mismo licor en varias presentaciones?", a: "Sí. Creás el producto base y le agregás variantes: 750ml, 1L, 2L. Cada una con su propio precio y stock." },
      { q: "¿Cómo controlo lotes de importación?", a: "Cargás cada lote con fecha de ingreso, proveedor, costo y ubicación en tu depósito." },
      { q: "¿Se pueden hacer descuentos por volumen?", a: "Sí. Configurás reglas: al llegar a X unidades, se aplica descuento automático." },
      { q: "¿Qué reportes tiene?", a: "Rotación de productos, rentabilidad por línea, y productos más vendidos." },
    ],
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop&auto=format",
  },
  {
    slug: "mini-market",
    titulo: "Mini Market",
    tituloH1: "Sistema POS para Mini Market en LATAM",
    descripcion: "Escaneo rápido, alertas de stock, gestión de proveedores y arqueo de caja automático.",
    metaDescripcion: "POS para mini market en Latinoamérica. Escaneo rápido, alertas de stock bajo, gestión de proveedores, promociones y multimoneda.",
    heroDesc: "Vendé rápido con escaneo por código de barras, recibí alertas cuando algo se agota y gestioná tus proveedores desde un solo lugar.",
    beneficios: [
      { texto: "Escaneo rápido con código de barras. El mostrador no se detiene." },
      { texto: "Alertas de stock bajo automáticas. Nunca más decir 'se me acabó'." },
      { texto: "Gestión de múltiples proveedores con historial de compras." },
      { texto: "Promociones y descuentos por día para mover tu inventario." },
    ],
    funcionamiento: [
      { paso: "Cargás productos y precios", texto: "Escaneás los códigos de barras o los buscás por nombre. Precios en la moneda de tu país." },
      { paso: "Vendés al instante", texto: "El cliente compra, escaneás, elegís método de pago y listo. En segundos." },
      { paso: "Recibís alertas", texto: "Cuando un producto está por agotarse, el sistema te avisa para que hagas el pedido." },
      { paso: "Gestionás proveedores", texto: "Historial de compras por proveedor, tiempos de entrega y mejores precios." },
    ],
    caracteristicas: [
      "Escaneo rápido con código de barras",
      "Alertas de stock bajo automáticas",
      "Gestión de múltiples proveedores",
      "Promociones y descuentos por día",
      "Arqueo de caja automático",
      "Multimoneda e IGTF automático",
      "Ventas al crédito con límite por cliente",
      "Reportes de ventas por periodo",
    ],
    preguntasFrecuentes: [
      { q: "¿Es rápido para el mostrador?", a: "Sí. Escaneás el código de barras, el producto aparece al instante. Seleccionás método de pago y la venta está lista." },
      { q: "¿Me avisa cuando algo se está agotando?", a: "Sí. Alertas automáticas de stock bajo configuradas por producto o categoría." },
      { q: "¿Puedo gestionar proveedores?", a: "Sí. Cada producto tiene su proveedor, y podés ver historial de compras y tiempos de entrega." },
      { q: "¿Sirve para mini markets en Venezuela?", a: "Sí. Multimoneda con IGTF automático, ventas al crédito y pagos mixtos." },
    ],
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&auto=format",
  },
];
