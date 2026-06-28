import { useState, useEffect, useMemo } from "react";
import { TrendingUp, DollarSign, Percent, RefreshCw, ArrowRight, Coins, Calculator, Settings2, Pencil } from "lucide-react";

const API_KEY = "cbb2c733d7a656bf54b29746";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const LATAM_CURRENCIES = ["USD", "VES", "COP", "MXN", "ARS", "PEN", "CLP", "BOB", "UYU", "BRL", "EUR"];

type Rates = Record<string, number>;
type Modo = "margen" | "precio";
type TipoTasa = "api" | "manual";

export default function RateCalculator() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [modo, setModo] = useState<Modo>("margen");
  const [tipoTasa, setTipoTasa] = useState<TipoTasa>("api");

  const [purchasePrice, setPurchasePrice] = useState("100");
  const [salePrice, setSalePrice] = useState("");
  const [margin, setMargin] = useState("30");
  const [currency, setCurrency] = useState("USD");
  const [customRate, setCustomRate] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.result === "success") {
          setRates(data.conversion_rates);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 600000);
    return () => clearInterval(interval);
  }, []);

  const apiRate = rates ? rates[currency] || 1 : 1;
  const activeRate = tipoTasa === "manual" && customRate ? parseFloat(customRate) : apiRate;

  const purchaseUsd = currency === "USD" ? parseFloat(purchasePrice || "0") : parseFloat(purchasePrice || "0") / activeRate;

  let calculatedSalePrice = "";
  let calculatedMargin = 0;
  let profitUsd = 0;

  if (modo === "margen") {
    const marginPct = parseFloat(margin || "0");
    const purchaseVal = parseFloat(purchasePrice || "0");
    const saleVal = purchaseVal * (1 + marginPct / 100);
    calculatedSalePrice = saleVal.toFixed(2);
    const saleUsd = currency === "USD" ? saleVal : saleVal / activeRate;
    profitUsd = saleUsd - purchaseUsd;
    calculatedMargin = marginPct;
  } else {
    const purchaseVal = parseFloat(purchasePrice || "0");
    const saleVal = parseFloat(salePrice || "0");
    const saleUsd = currency === "USD" ? saleVal : saleVal / activeRate;
    profitUsd = saleUsd - purchaseUsd;
    calculatedMargin = purchaseVal > 0 ? ((saleVal - purchaseVal) / purchaseVal) * 100 : 0;
  }

  const formattedApiRate = useMemo(() => {
    if (!apiRate) return "—";
    if (apiRate >= 1000) return apiRate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (apiRate >= 100) return apiRate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return apiRate.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  }, [apiRate]);

  const currencies = rates
    ? Object.keys(rates).filter((c) => LATAM_CURRENCIES.includes(c)).sort()
    : LATAM_CURRENCIES;

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-dark-primary">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-amber/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-main relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs font-mono mb-4">
            <Calculator size={12} />
            CALCULADORA EN VIVO
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-zinc-100">
            Simulá tu venta con <span className="text-amber">tasas reales</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
            Definí tu margen o precio de venta. Elegí moneda y tasa. El sistema convierte todo a USD automáticamente.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={24} className="text-amber animate-spin" />
              <span className="text-zinc-500 ml-3 font-mono text-sm">Obteniendo tasas actualizadas...</span>
            </div>
          ) : error ? (
            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-red-400 text-sm">No pudimos obtener las tasas. Verificá tu conexión o intentá de nuevo.</p>
            </div>
          ) : (
            <>
              {/* Mode selector */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-800/60 border border-zinc-700/60 mb-5 w-fit mx-auto">
                <button
                  onClick={() => setModo("margen")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    modo === "margen"
                      ? "bg-amber text-zinc-900 shadow-lg shadow-amber/20"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Percent size={14} />
                  Por margen
                </button>
                <button
                  onClick={() => setModo("precio")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    modo === "precio"
                      ? "bg-amber text-zinc-900 shadow-lg shadow-amber/20"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <DollarSign size={14} />
                  Por precio venta
                </button>
              </div>

              <div className="grid lg:grid-cols-5 gap-5">
                {/* Inputs */}
                <div className="lg:col-span-3 p-6 lg:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings2 size={16} className="text-amber" />
                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest">DATOS</span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-zinc-400 text-xs font-mono mb-1.5">Precio de compra (lo que pagaste)</label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={purchasePrice}
                          onChange={(e) => setPurchasePrice(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-lg font-bold nums outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all"
                        />
                      </div>
                    </div>

                    {modo === "margen" ? (
                      <div>
                        <label className="block text-zinc-400 text-xs font-mono mb-1.5">Margen de ganancia deseado</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={margin}
                            onChange={(e) => setMargin(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-lg font-bold nums outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all pr-8"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">%</span>
                        </div>
                        <div className="mt-2 p-3 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-between">
                          <span className="text-zinc-400 text-xs font-mono">Precio de venta sugerido</span>
                          <span className="text-amber text-lg font-bold nums">
                            {currency} {calculatedSalePrice || "—"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-zinc-400 text-xs font-mono mb-1.5">Precio de venta (lo que cobras)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={salePrice}
                          onChange={(e) => setSalePrice(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-lg font-bold nums outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 text-xs font-mono mb-1.5">Moneda</label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-sm font-medium outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all appearance-none cursor-pointer"
                        >
                          {currencies.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-xs font-mono mb-1.5">Tasa de cambio</label>
                        <div className="flex gap-1 p-1 rounded-lg bg-zinc-800/60 border border-zinc-700/60">
                          <button
                            onClick={() => setTipoTasa("api")}
                            className={`flex-1 px-2 py-2 rounded-md text-xs font-mono font-medium transition-all ${
                              tipoTasa === "api"
                                ? "bg-amber/20 text-amber border border-amber/30"
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            API
                          </button>
                          <button
                            onClick={() => setTipoTasa("manual")}
                            className={`flex-1 px-2 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center justify-center gap-1 ${
                              tipoTasa === "manual"
                                ? "bg-amber/20 text-amber border border-amber/30"
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            <Pencil size={10} />
                            Manual
                          </button>
                        </div>
                      </div>
                    </div>

                    {tipoTasa === "api" ? (
                      <div className="p-4 rounded-lg bg-amber/5 border border-amber/20 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                          <Coins size={14} className="text-amber" />
                          1 USD = {formattedApiRate} {currency}
                        </div>
                        <span className="text-[10px] text-zinc-600 font-mono">ExchangeRate API</span>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-zinc-400 text-xs font-mono mb-1.5">
                          Tu tasa (1 USD = ? {currency})
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={customRate}
                            onChange={(e) => setCustomRate(e.target.value)}
                            placeholder={`Ej: ${formattedApiRate}`}
                            className="flex-1 px-4 py-3 rounded-lg bg-zinc-800/60 border border-amber/50 text-zinc-100 text-lg font-bold nums outline-none focus:border-amber focus:ring-1 focus:ring-amber/30 transition-all"
                          />
                          <button
                            onClick={() => {
                              if (apiRate) setCustomRate(String(apiRate));
                            }}
                            className="px-3 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-500 hover:text-zinc-300 font-mono text-xs transition-all"
                            title="Usar tasa de la API"
                          >
                            <RefreshCw size={14} />
                          </button>
                        </div>
                        {customRate && (
                          <div className="mt-1 text-[11px] text-amber font-mono">
                            1 USD = {parseFloat(customRate).toLocaleString()} {currency}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 p-6 lg:p-8 rounded-xl bg-gradient-to-br from-amber/10 via-amber/5 to-zinc-900/60 border border-amber/20">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={16} className="text-amber" />
                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest">RESULTADOS</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <div className="text-zinc-500 text-xs font-mono mb-1">Pagaste (en USD)</div>
                      <div className="text-zinc-100 text-xl font-bold nums">
                        ${purchaseUsd.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowRight size={20} className="text-amber animate-pulse" />
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <div className="text-zinc-500 text-xs font-mono mb-1">Cobrás (en USD)</div>
                      <div className="text-amber text-xl font-bold nums">
                        ${profitUsd > 0 ? (purchaseUsd + profitUsd).toFixed(2) : "0.00"}
                      </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    <div className="p-5 rounded-lg bg-amber/10 border border-amber/30">
                      <div className="text-amber text-xs font-mono mb-1">GANANCIA EN USD</div>
                      <div className="text-amber text-2xl font-black nums">
                        ${profitUsd.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Percent size={14} className="text-emerald-400" />
                        <span className="text-zinc-400 text-xs font-mono">Margen</span>
                      </div>
                      <span className={`text-lg font-bold nums ${calculatedMargin >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {calculatedMargin.toFixed(1)}%
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/40">
                      <div className="text-zinc-600 text-[10px] font-mono mb-1">TASA APLICADA</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400 font-mono">1 USD = {activeRate.toLocaleString()} {currency}</span>
                        <span className={`text-[10px] font-mono ${tipoTasa === "api" ? "text-emerald-500" : "text-amber"}`}>
                          {tipoTasa === "api" ? "API · Automática" : "Manual"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-10">
          <p className="text-zinc-600 text-xs font-mono">
            Tasas obtenidas de ExchangeRate API. Los cálculos son ilustrativos. En TiendaPOS las tasas se actualizan automáticamente y se guardan en cada venta.
          </p>
        </div>
      </div>
    </section>
  );
}
