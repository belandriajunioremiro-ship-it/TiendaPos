// TiendaPOS — Sistema de punto de venta multi-país, multi-moneda, multi-tenant
// Multi-país, multi-moneda, multi-tenant

export const site = {
  name: "TiendaPOS",
  tagline: "El POS Multi-País para Latinoamérica",
  description:
    "Sistema POS multi-país y multi-moneda. Vende, controla inventario y administra tu negocio desde un solo sistema. Adaptado a 9 países LATAM.",
  whatsapp: "+58 424-725-3544",
  email: "hola@tiendapos.com",
  rif: "J-12345678-9",
  direccion: "San Cristóbal, Táchira, Venezuela",
  trial: "14 días gratis · Sin tarjeta de crédito · Cancela cuando quieras",
};

export const nav = [
  { label: "Por qué elegirnos", href: "/#por-que" },
  { label: "Características", href: "/#caracteristicas" },
  { label: "Negocios", href: "/#negocios" },
  { label: "Países", href: "/#paises" },
  { label: "Planes", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const paises = [
  { nombre: "Venezuela", moneda: "VES", id: "RIF", impuesto: "IVA 16%", ente: "IGTF 3%", flag: "🇻🇪" },
  { nombre: "Colombia", moneda: "COP", id: "NIT", impuesto: "IVA 19%", ente: "DIAN", flag: "🇨🇴" },
  { nombre: "México", moneda: "MXN", id: "RFC", impuesto: "IVA 16%", ente: "SAT / CFDI", flag: "🇲🇽" },
  { nombre: "Ecuador", moneda: "USD", id: "RUC", impuesto: "IVA 12%", ente: "SRI", flag: "🇪🇨" },
  { nombre: "Argentina", moneda: "ARS", id: "CUIT", impuesto: "IVA 21%", ente: "AFIP", flag: "🇦🇷" },
  { nombre: "Perú", moneda: "PEN", id: "RUC", impuesto: "IGV 18%", ente: "SUNAT", flag: "🇵🇪" },
  { nombre: "Chile", moneda: "CLP", id: "RUT", impuesto: "IVA 19%", ente: "SII", flag: "🇨🇱" },
  { nombre: "Bolivia", moneda: "BOB", id: "NIT", impuesto: "IVA 13%", ente: "SIN", flag: "🇧🇴" },
  { nombre: "Uruguay", moneda: "UYU", id: "RUT", impuesto: "IVA 22%", ente: "DGI", flag: "🇺🇾" },
];

export const monedas = [
  { codigo: "USD", nombre: "Dolar", tasa: "1.00", cambio: "Base", variacion: 0 },
  { codigo: "VES", nombre: "Venezuela", tasa: "36.50", cambio: "+0.2%", variacion: 0.2 },
  { codigo: "COP", nombre: "Colombia", tasa: "4,180", cambio: "-0.1%", variacion: -0.1 },
  { codigo: "MXN", nombre: "Mexico", tasa: "17.15", cambio: "+0.3%", variacion: 0.3 },
  { codigo: "ARS", nombre: "Argentina", tasa: "870.00", cambio: "+1.1%", variacion: 1.1 },
];

export const pasosOnboarding = [
  {
    num: "1",
    titulo: "Crea tu cuenta",
    detalle: "Regístrate y tu tienda vacía queda lista al instante. Trial de 14 días activado y token Sanctum listo para los siguientes pasos.",
    tiempo: "30 segundos",
  },
  {
    num: "2",
    titulo: "Datos fiscales",
    detalle: "El sistema detecta tu país y siembra automáticamente RIF, NIT, RFC o CUIT según tu jurisdicción. Sin configurar nada a mano.",
    tiempo: "Siembra automática",
  },
  {
    num: "3",
    titulo: "Tu tipo de negocio",
    detalle: "Farmacia, licorería, ferretería, bodega, restaurante. El sistema crea las categorías, impuestos y campos que tu nicho necesita.",
    tiempo: "Todo se crea solo",
  },
  {
    num: "4",
    titulo: "Primer producto",
    detalle: "Carga tu primer producto con código de barras, precio y stock. Empieza a facturar como un profesional desde el minuto uno.",
    tiempo: "¡A vender!",
  },
];

export const tiendasTenant = [
  { nombre: "Abasto La Esquina", pais: "Venezuela", usuarios: 4, ventas: "$2,840", estado: "Activa" },
  { nombre: "Mini Market Andes", pais: "Colombia", usuarios: 3, ventas: "$1,920", estado: "Activa" },
  { nombre: "Tienda Centro MX", pais: "Mexico", usuarios: 6, ventas: "$3,105", estado: "Activa" },
];

export const caracteristicas = [
  {
    id: "pos",
    icono: "ShoppingCart",
    titulo: "Vende más rápido. Cobra más fácil.",
    detalle:
      "Interfaz pensada para el ritmo del mostrador: búsqueda por nombre o código de barras, carrito en un clic, pagos mixtos y cierre de caja con arqueo automático.",
    bullets: [
      "Búsqueda instantánea por nombre, SKU o código de barras",
      "Pagos mixtos: efectivo + tarjeta + móvil en una venta",
      "Apertura y cierre de caja con arqueo automático",
      "Descuentos por producto o por venta completa",
    ],
  },
  {
    id: "facturacion",
    icono: "FileText",
    titulo: "Facturas que cumplen con la ley de tu país.",
    detalle:
      "Numeración correlativa, campos fiscales por jurisdicción y notas de crédito vinculadas. RIF, NIT, RFC, RUC o CUIT según donde operes.",
    bullets: [
      "Campos fiscales automáticos: RIF, NIT, RFC, RUC, CUIT",
      "IVA/IGV configurable según la legislación de cada país",
      "Notas de crédito y débito vinculadas a facturas",
      "Numeración correlativa que cumple requisitos formales",
    ],
  },
  {
    id: "inventario",
    icono: "Package",
    titulo: "Saber qué tienes. Antes de que se agote.",
    detalle:
      "Stock actualizado tras cada venta o ajuste. Múltiples almacenes, traslados entre sedes, lotes FEFO y alertas cuando el mínimo se acerca.",
    bullets: [
      "Stock actualizado al instante tras cada operación",
      "Múltiples almacenes con traslados entre sedes",
      "Control de lotes con seguimiento FEFO",
      "Alertas automáticas de stock bajo",
    ],
  },
  {
    id: "creditos",
    icono: "CreditCard",
    titulo: "Controla quién te debe. Y cuánto.",
    detalle:
      "Límites por cliente, abonos parciales que actualizan el saldo al instante y bloqueo automático cuando se supera el crédito autorizado.",
    bullets: [
      "Límites de crédito personalizados por cliente",
      "Abonos parciales con actualización automática de saldo",
      "Bloqueo automático al exceder límite de crédito",
      "Historial completo de facturas y pagos",
    ],
  },
];

export const planes = [
  {
    nombre: "Gratis",
    etiqueta: "Prueba todo sin compromiso",
    precio: "$0",
    periodo: "",
    caracteristicas: [
      "50 productos",
      "2 usuarios",
      "1 almacén",
      "1 caja",
      "Facturación fiscal",
      "Soporte por email",
      "Reportes avanzados",
      "Multimoneda",
    ],
    destacado: false,
    cta: "Comenzar prueba gratis",
    nota: "14 días gratis incluidos",
  },
  {
    nombre: "Básico",
    etiqueta: "Para negocios que crecen",
    precio: "$20",
    periodo: "/mes",
    caracteristicas: [
      "200 productos",
      "5 usuarios",
      "2 almacenes",
      "2 cajas",
      "Facturación fiscal",
      "Soporte prioritario",
      "Reportes básicos",
      "Multimoneda",
    ],
    destacado: false,
    cta: "Elegir Básico",
    nota: "",
  },
  {
    nombre: "Pro",
    etiqueta: "Para negocios consolidados",
    precio: "$30",
    periodo: "/mes",
    caracteristicas: [
      "1,000 productos",
      "15 usuarios",
      "5 almacenes",
      "5 cajas",
      "Facturación fiscal",
      "Soporte prioritario",
      "Reportes avanzados",
      "Multimoneda + IGTF",
    ],
    destacado: true,
    cta: "Elegir Pro",
    nota: "Soporte dedicado incluido",
  },
  {
    nombre: "Premium",
    etiqueta: "Para operaciones a gran escala",
    precio: "$45",
    periodo: "/mes",
    caracteristicas: [
      "Productos ilimitados",
      "Usuarios ilimitados",
      "Almacenes ilimitados",
      "Cajas ilimitadas",
      "Facturación fiscal",
      "Soporte 24/7",
      "Reportes personalizados",
      "Multimoneda + IGTF",
    ],
    destacado: false,
    cta: "Elegir Premium",
    nota: "",
  },
];

export const faq = [
  {
    q: "¿Qué es TiendaPOS y para quién está diseñado?",
    a: "TiendaPOS es un sistema de punto de venta multi-tenant, multi-país y multi-moneda diseñado para comercios en Latinoamérica. Desde abastos y farmacias hasta cadenas con múltiples sucursales en distintos países.",
  },
  {
    q: "¿Necesito instalar algo en mi computadora?",
    a: "No. TiendaPOS funciona en el navegador. Solo necesitas una conexión a internet. Si prefieres instalarlo en tu propio servidor, el plan Premium incluye la opción de licencia directa.",
  },
  {
    q: "¿Cómo funciona la prueba gratuita de 14 días?",
    a: "Al crear tu cuenta, el trial de 14 días se activa automáticamente con todas las funciones del plan Pro. No pedimos tarjeta de crédito y puedes cancelar cuando quieras sin cargo.",
  },
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí. Puedes subir o bajar de plan desde el panel de administración. El cambio se aplica inmediatamente y se prorratea automáticamente.",
  },
  {
    q: "¿Qué significa que TiendaPOS sea multi-tenant?",
    a: "Cada negocio opera en su propio entorno con datos completamente aislados a nivel de base de datos. Puedes gestionar franquicias y cadenas desde un panel central con reportes consolidados, sin que una tienda vea los datos de otra.",
  },
  {
    q: "¿Cómo maneja TiendaPOS las diferentes monedas y el IGTF?",
    a: "El sistema soporta 9 monedas LATAM con tasas de cambio históricas automáticas. El IGTF del 3% se calcula automáticamente en pagos en USD para Venezuela. Los pagos mixtos permiten combinar efectivo, tarjeta y móvil en una sola venta.",
  },
  {
    q: "¿Es seguro usar TiendaPOS para facturación fiscal?",
    a: "TiendaPOS gestiona datos formales de facturación con campos fiscales por jurisdicción, numeración correlativa y notas de crédito con trazabilidad. Es importante aclarar que no es un sistema fiscal certificado, pero cumple con los requisitos formales de cada país.",
  },
  {
    q: "¿Qué tipo de soporte ofrecen?",
    a: "El plan Gratis incluye soporte por email. Los planes Básico y Pro incluyen soporte prioritario. El plan Premium incluye soporte 24/7 y soporte dedicado.",
  },
];

export const ticker = [
  { par: "USD", valor: "1.00", etiqueta: "BASE" },
  { par: "VES", valor: "36.50", etiqueta: "Venezuela" },
  { par: "COP", valor: "4,180", etiqueta: "Colombia" },
  { par: "MXN", valor: "17.15", etiqueta: "Mexico" },
  { par: "ARS", valor: "870.00", etiqueta: "Argentina" },
  { par: "PEN", valor: "3.72", etiqueta: "Peru" },
  { par: "CLP", valor: "940", etiqueta: "Chile" },
  { par: "BOB", valor: "6.90", etiqueta: "Bolivia" },
  { par: "UYU", valor: "39.50", etiqueta: "Uruguay" },
  { par: "IGTF", valor: "3%", etiqueta: "Pagos USD" },
];
