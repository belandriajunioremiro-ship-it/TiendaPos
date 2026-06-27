import { useEffect, useRef, useState } from "react";
import { Coins, Receipt, CircleCheck as CheckCircle2, MapPin, TrendingUp, Zap, CreditCard, Banknote } from "lucide-react";

// Sales data from multiple countries - full names only
const VENTAS_POR_PAIS = [
  {
    pais: "Venezuela",
    moneda: "VES",
    simbolo: "Bs",
    tasa: 36.5,
    iva: 0.16,
    igtf: 0.03,
    tienda: "Abasto La Esquina",
    caja: "Caja 1 - Maria",
    productos: [
      { nombre: "Harina PAN 1kg", cant: 2, precio: 2.5 },
      { nombre: "Aceite Vegetal 1L", cant: 1, precio: 5.8 },
      { nombre: "Coca-Cola 600ml", cant: 3, precio: 1.75 },
    ],
  },
  {
    pais: "Colombia",
    moneda: "COP",
    simbolo: "$",
    tasa: 4180,
    iva: 0.19,
    tienda: "Mini Market Andes",
    caja: "Caja 2 - Carlos",
    productos: [
      { nombre: "Arroz Premium 1kg", cant: 5, precio: 2.2 },
      { nombre: "Aceite Girasol 900ml", cant: 3, precio: 4.5 },
      { nombre: "Frijoles Negros 500g", cant: 4, precio: 1.8 },
    ],
  },
  {
    pais: "Mexico",
    moneda: "MXN",
    simbolo: "$",
    tasa: 17.15,
    iva: 0.16,
    tienda: "Tienda Centro MX",
    caja: "Caja 3 - Luis",
    productos: [
      { nombre: "Tortillas 1kg", cant: 3, precio: 1.2 },
      { nombre: "Frijoles Refritos 450g", cant: 2, precio: 2.8 },
      { nombre: "Cerveza Corona 355ml", cant: 6, precio: 1.5 },
    ],
  },
  {
    pais: "Argentina",
    moneda: "ARS",
    simbolo: "$",
    tasa: 870,
    iva: 0.21,
    tienda: "Kiosco San Martin",
    caja: "Caja 1 - Ana",
    productos: [
      { nombre: "Alfajores Havanna x6", cant: 2, precio: 8.5 },
      { nombre: "Dulce de Leche 400g", cant: 1, precio: 5.2 },
      { nombre: "Yerba Mate 500g", cant: 2, precio: 4.8 },
    ],
  },
  {
    pais: "Peru",
    moneda: "PEN",
    simbolo: "S/",
    tasa: 3.72,
    iva: 0.18,
    tienda: "Bodega Los Andes",
    caja: "Caja 2 - Rosa",
    productos: [
      { nombre: "Arroz Extra 1kg", cant: 3, precio: 1.8 },
      { nombre: "Aceite 1L", cant: 2, precio: 4.2 },
      { nombre: "Leche Gloria 1L", cant: 4, precio: 1.2 },
    ],
  },
  {
    pais: "Ecuador",
    moneda: "USD",
    simbolo: "$",
    tasa: 1,
    iva: 0.12,
    tienda: "Tienda La Favorita",
    caja: "Caja 1 - Diana",
    productos: [
      { nombre: "Atun en Lata 140g", cant: 6, precio: 1.5 },
      { nombre: "Arroz 1kg", cant: 2, precio: 1.8 },
      { nombre: "Aceite 900ml", cant: 1, precio: 3.2 },
    ],
  },
];

// Activity feed with full country names
const ACTIVIDADES = [
  { tipo: "venta", tienda: "Abasto La Esquina", monto: "$18.62", pais: "Venezuela" },
  { tipo: "venta", tienda: "Mini Market Andes", monto: "$42.10", pais: "Colombia" },
  { tipo: "stock", tienda: "Tienda Centro MX", producto: "Tortillas 1kg", estado: "BAJO" },
  { tipo: "venta", tienda: "Kiosco San Martin", monto: "$27.80", pais: "Argentina" },
  { tipo: "pago", tienda: "Bodega Los Andes", cliente: "Credito", monto: "$150" },
  { tipo: "venta", tienda: "Tienda La Favorita", monto: "$15.60", pais: "Ecuador" },
];

const METODOS_PAGO = [
  { nombre: "Efectivo", icon: Banknote },
  { nombre: "Tarjeta", icon: CreditCard },
  { nombre: "Mixto", icon: Coins },
];

function formatCurrency(value: number, simbolo: string, moneda: string) {
  if (moneda === "VES" || moneda === "COP" || moneda === "ARS") {
    return `${simbolo} ${value.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${simbolo} ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function TerminalHero() {
  const [ventaActual, setVentaActual] = useState(0);
  const [lineas, setLineas] = useState<typeof VENTAS_POR_PAIS[0]["productos"]>([]);
  const [estado, setEstado] = useState<"agregando" | "cobrando" | "procesando" | "completo">("agregando");
  const [metodoActual, setMetodoActual] = useState(0);
  const [actividades, setActividades] = useState(ACTIVIDADES);
  const [progresoCobro, setProgresoCobro] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const venta = VENTAS_POR_PAIS[ventaActual];
  const subtotal = lineas.reduce((s, l) => s + l.precio * l.cant, 0);
  const iva = subtotal * venta.iva;
  const totalUsd = subtotal + iva;
  const totalLocal = totalUsd * venta.tasa;
  const metodo = METODOS_PAGO[metodoActual];

  // Main animation loop
  useEffect(() => {
    let lineIdx = 0;

    const iniciarVenta = () => {
      lineIdx = 0;
      setLineas([]);
      setEstado("agregando");
      setProgresoCobro(0);

      // Add products one by one
      const agregarLinea = () => {
        if (lineIdx < venta.productos.length) {
          setLineas(prev => [...prev, venta.productos[lineIdx]]);
          lineIdx++;
          timer.current = setTimeout(agregarLinea, 800);
        } else {
          // Products added, start cobrando phase
          setEstado("cobrando");
          timer.current = setTimeout(() => {
            // Start processing animation
            setEstado("procesando");
            // Animate progress bar
            let progress = 0;
            const progressInterval = setInterval(() => {
              progress += 5;
              setProgresoCobro(progress);
              if (progress >= 100) {
                clearInterval(progressInterval);
                setEstado("completo");
                // Show completed for a moment then switch to next country
                timer.current = setTimeout(() => {
                  const nextVenta = (ventaActual + 1) % VENTAS_POR_PAIS.length;
                  const nextMetodo = (metodoActual + 1) % METODOS_PAGO.length;
                  setMetodoActual(nextMetodo);
                  setVentaActual(nextVenta);
                }, 2500);
              }
            }, 50);
          }, 1500);
        }
      };

      timer.current = setTimeout(agregarLinea, 500);
    };

    iniciarVenta();

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [ventaActual]);

  // Rotate activities
  useEffect(() => {
    tickTimer.current = setInterval(() => {
      setActividades(prev => {
        const rotated = [...prev.slice(1), prev[0]];
        return rotated;
      });
    }, 2500);

    return () => {
      if (tickTimer.current) clearInterval(tickTimer.current);
    };
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #111113 0%, #18181B 100%)', border: '1px solid #27272A' }}>
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className={`w-3 h-3 rounded-full transition-colors duration-300 ${estado === 'procesando' ? 'bg-amber animate-pulse' : 'bg-red-500/80'}`} />
            <span className="w-3 h-3 rounded-full bg-amber/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-zinc-400 font-mono text-xs tracking-wider">
            TIENDAPOS - EN VIVO
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            9 PAISES ACTIVOS
          </span>
        </div>
      </div>

      {/* Country selector bar */}
      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-zinc-800/50 bg-zinc-900/30 overflow-x-auto">
        {VENTAS_POR_PAIS.map((v, i) => (
          <button
            key={v.pais}
            onClick={() => setVentaActual(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
              i === ventaActual
                ? 'bg-amber/20 border border-amber/40 text-amber'
                : 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
            }`}
          >
            {v.pais}
          </button>
        ))}
      </div>

      {/* Exchange rate bar */}
      <div className="flex items-center justify-between px-5 py-2 border-b border-zinc-800/50 bg-zinc-900/20">
        <div className="flex items-center gap-2 text-zinc-400">
          <Coins size={14} className="text-amber" />
          <span className="text-xs font-mono tracking-wider">TASA DEL DIA</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-zinc-500">USD</span>
          <span className="text-zinc-100 nums">1.00</span>
          <span className="text-zinc-600">a</span>
          <span className="text-amber nums">{venta.tasa.toLocaleString()}</span>
          <span className="text-zinc-400 nums">{venta.moneda}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400">
          <TrendingUp size={14} />
          <span className="font-mono">EN VIVO</span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[1fr_200px] gap-px bg-zinc-800/30">
        {/* Main terminal */}
        <div className="p-5 bg-zinc-900/0">
          {/* Status indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MapPin size={12} className="text-amber" />
              <span className="text-amber text-xs font-mono tracking-wider">{venta.tienda}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
              estado === 'agregando' ? 'bg-zinc-800 text-zinc-400' :
              estado === 'cobrando' ? 'bg-amber/20 text-amber border border-amber/40' :
              estado === 'procesando' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {estado === 'agregando' && 'AGREGANDO...'}
              {estado === 'cobrando' && 'COBRANDO...'}
              {estado === 'procesando' && 'PROCESANDO...'}
              {estado === 'completo' && 'COMPLETADO'}
            </div>
          </div>

          {/* Products list */}
          <div className="space-y-2 min-h-[160px]">
            {lineas.map((l, i) => (
              <div
                key={`${venta.pais}-${i}`}
                className="flex items-center justify-between py-2 border-b border-zinc-800/50 animate-slideIn"
              >
                <div className="flex-1">
                  <div className="text-zinc-100 text-sm">{l.nombre}</div>
                  <div className="text-zinc-500 text-xs nums">
                    {l.cant} x ${l.precio.toFixed(2)} USD
                  </div>
                </div>
                <div className="text-zinc-100 nums text-sm">
                  ${(l.precio * l.cant).toFixed(2)}
                </div>
              </div>
            ))}

            {lineas.length === 0 && (
              <div className="flex items-center justify-center h-[100px] text-zinc-600 text-sm">
                <Zap size={16} className="mr-2 animate-pulse" />
                Iniciando venta...
              </div>
            )}
          </div>

          {/* Totals - always visible if there are products */}
          {lineas.length > 0 && (
            <div className="mt-4 pt-4 border-t border-zinc-700">
              <div className="flex justify-between text-zinc-400 text-sm mb-1">
                <span>Subtotal</span>
                <span className="nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm mb-2">
                <span>IVA ({(venta.iva * 100).toFixed(0)}%)</span>
                <span className="nums">${iva.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-zinc-500 text-xs">TOTAL USD</div>
                  <div className="text-amber nums text-xl font-bold">
                    ${totalUsd.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-zinc-500 text-xs">{venta.moneda}</div>
                  <div className="text-zinc-300 nums text-lg">
                    {formatCurrency(totalLocal, venta.simbolo, venta.moneda)}
                  </div>
                </div>
              </div>

              {/* Charging animation */}
              {(estado === 'cobrando' || estado === 'procesando') && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-amber/10 border border-amber/30 rounded-lg">
                    <metodo.icon size={16} className="text-amber" />
                    <span className="text-amber text-sm font-medium">Metodo: {metodo.nombre}</span>
                  </div>

                  {estado === 'procesando' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Procesando pago...</span>
                        <span className="nums">{progresoCobro}%</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber to-amber-light transition-all duration-100"
                          style={{ width: `${progresoCobro}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Completed state */}
              {estado === 'completo' && (
                <div className="animate-slideIn">
                  <div className="flex items-center gap-2 px-3 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-lg">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">PAGO EXITOSO</span>
                    <span className="text-zinc-500 text-xs ml-auto nums">Hace 1s</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Receipt size={12} />
                      Fac. #{String(Math.floor(Math.random() * 99999)).padStart(6, '0')}
                    </span>
                    <span>{metodo.nombre}</span>
                    {venta.pais === "Venezuela" && <span className="text-amber">IGTF 3%</span>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Activity feed sidebar */}
        <div className="bg-zinc-900/30 border-l border-zinc-800/50 p-3">
          <div className="text-zinc-500 text-[10px] font-mono tracking-wider mb-3">
            ULTIMA ACTIVIDAD
          </div>
          <div className="space-y-2">
            {actividades.slice(0, 4).map((act, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-xs transition-all duration-300 ${
                  i === 0
                    ? 'bg-amber/10 border border-amber/20'
                    : 'bg-zinc-800/30 border border-transparent'
                }`}
              >
                {act.tipo === "venta" && (
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 truncate text-[11px]">{act.tienda}</span>
                    <span className="text-amber nums ml-2">{act.monto}</span>
                  </div>
                )}
                {act.tipo === "stock" && (
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 truncate text-[11px]">{act.producto}</span>
                    <span className="text-red-400 text-[10px] font-bold">{act.estado}</span>
                  </div>
                )}
                {act.tipo === "pago" && (
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 truncate text-[11px]">{act.tienda}</span>
                    <span className="text-emerald-400 nums ml-2">{act.monto}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-500 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono">SISTEMA ACTIVO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-2.5 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
          <span className="flex items-center gap-1.5">
            <Receipt size={12} />
            TIENDAPOS v6.0
          </span>
          <span>{venta.pais}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-zinc-600">Multi-tenant</span>
          <span className="text-zinc-600">Multi-moneda</span>
          {venta.pais === "Venezuela" && <span className="text-amber">IGTF 3%</span>}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
