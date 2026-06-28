import { useState, useEffect, useMemo } from "react";
import { TrendingUp, DollarSign, Percent, RefreshCw, ArrowRight, Coins, Calculator } from "lucide-react";

const API_KEY = "cbb2c733d7a656bf54b29746";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const LATAM_CURRENCIES = ["USD", "VES", "COP", "MXN", "ARS", "PEN", "CLP", "BOB", "UYU", "BRL", "EUR"];

type Rates = Record<string, number>;

export default function RateCalculator() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState("10");
  const [salePrice, setSalePrice] = useState("15.50");
  const [currency, setCurrency] = useState("USD");

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

  const rate = rates ? rates[currency] || 1 : 1;
  const purchaseUsd = currency === "USD" ? parseFloat(purchasePrice || "0") : parseFloat(purchasePrice || "0") / rate;
  const saleUsd = currency === "USD" ? parseFloat(salePrice || "0") : parseFloat(salePrice || "0") / rate;
  const profitUsd = saleUsd - purchaseUsd;
  const margin = purchaseUsd > 0 ? (profitUsd / purchaseUsd) * 100 : 0;

  const formattedRate = useMemo(() => {
    if (!rate) return "—";
    if (rate >= 1000) return rate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (rate >= 100) return rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return rate.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  }, [rate]);

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
            Simulá tu margen con <span className="text-amber">tasas reales</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
            Ingresá precio de compra y venta. Elegí tu moneda. El sistema calcula el margen y la ganancia en USD automáticamente.
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
            <div className="grid lg:grid-cols-5 gap-5">
              <div className="lg:col-span-3 p-6 lg:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign size={16} className="text-amber" />
                  <span className="text-[10px] font-mono text-zinc-500 tracking-widest">DATOS DE TU PRODUCTO</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-zinc-400 text-xs font-mono mb-1.5">Precio de compra (lo que pagaste)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-lg font-bold nums outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all"
                    />
                  </div>

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

                  <div>
                    <label className="block text-zinc-400 text-xs font-mono mb-1.5">Moneda de tus precios</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-sm font-medium outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all appearance-none cursor-pointer"
                    >
                      {currencies.map((c) => (
                        <option key={c} value={c}>
                          {c} — {c === "USD" ? "Dólar" : c === "VES" ? "Bolívar" : c === "COP" ? "Peso colombiano" : c === "MXN" ? "Peso mexicano" : c === "ARS" ? "Peso argentino" : c === "PEN" ? "Sol" : c === "CLP" ? "Peso chileno" : c === "BOB" ? "Boliviano" : c === "UYU" ? "Peso uruguayo" : c === "BRL" ? "Real" : c === "EUR" ? "Euro" : c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 p-4 rounded-lg bg-amber/5 border border-amber/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                    <Coins size={14} className="text-amber" />
                    TASA 1 USD = {formattedRate} {currency}
                  </div>
                  <span className="text-[10px] text-zinc-600 font-mono">ExchangeRate API</span>
                </div>
              </div>

              <div className="lg:col-span-2 p-6 lg:p-8 rounded-xl bg-gradient-to-br from-amber/10 via-amber/5 to-zinc-900/60 border border-amber/20">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={16} className="text-amber" />
                  <span className="text-[10px] font-mono text-zinc-500 tracking-widest">RESULTADOS</span>
                </div>

                <div className="space-y-5">
                  <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                    <div className="text-zinc-500 text-xs font-mono mb-1">Compra en USD</div>
                    <div className="text-zinc-100 text-xl font-bold nums">
                      ${purchaseUsd.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight size={20} className="text-amber" />
                  </div>

                  <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                    <div className="text-zinc-500 text-xs font-mono mb-1">Venta en USD</div>
                    <div className="text-zinc-100 text-xl font-bold nums">
                      ${saleUsd.toFixed(2)}
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
                    <span className={`text-lg font-bold nums ${margin >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {margin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
