import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Percent, RefreshCw, ArrowRight, Calculator, Pencil, ArrowLeftRight } from "lucide-react";

const API_KEY = "cbb2c733d7a656bf54b29746";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const LATAM_CURRENCIES = ["USD", "VES", "COP", "MXN", "ARS", "PEN", "CLP", "BOB", "UYU", "BRL", "EUR"];

type Rates = Record<string, number>;
type Modo = "margen" | "precio";

interface CurrencyConfig {
  currency: string;
  tipoTasa: "api" | "manual";
  customRate: string;
}

export default function RateCalculator() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [modo, setModo] = useState<Modo>("margen");

  const [purchasePrice, setPurchasePrice] = useState("100");
  const [compra, setCompra] = useState<CurrencyConfig>({ currency: "COP", tipoTasa: "api", customRate: "" });

  const [salePrice, setSalePrice] = useState("");
  const [margin, setMargin] = useState("30");
  const [venta, setVenta] = useState<CurrencyConfig>({ currency: "USD", tipoTasa: "api", customRate: "" });

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

  const getRate = (cfg: CurrencyConfig) => {
    if (cfg.currency === "USD") return 1;
    if (cfg.tipoTasa === "manual" && cfg.customRate) return parseFloat(cfg.customRate);
    return rates?.[cfg.currency] || 1;
  };

  const rateCompra = getRate(compra);
  const rateVenta = getRate(venta);

  const purchaseUsd = compra.currency === "USD" ? parseFloat(purchasePrice || "0") : parseFloat(purchasePrice || "0") / rateCompra;

  let calculatedSalePrice = "";
  let calculatedMargin = 0;
  let profitUsd = 0;
  let saleLocal = 0;

  if (modo === "margen") {
    const marginPct = parseFloat(margin || "0");
    const costInSaleCurrency = purchaseUsd * rateVenta;
    saleLocal = costInSaleCurrency * (1 + marginPct / 100);
    calculatedSalePrice = saleLocal.toFixed(2);
    const saleUsd = venta.currency === "USD" ? saleLocal : saleLocal / rateVenta;
    profitUsd = saleUsd - purchaseUsd;
    calculatedMargin = marginPct;
  } else {
    const saleVal = parseFloat(salePrice || "0");
    const saleUsd = venta.currency === "USD" ? saleVal : saleVal / rateVenta;
    profitUsd = saleUsd - purchaseUsd;
    saleLocal = saleVal;
    calculatedMargin = purchaseUsd > 0 ? (profitUsd / purchaseUsd) * 100 : 0;
  }

  const formatRate = (rate: number) => {
    if (!rate || rate === 1) return "1.00";
    if (rate >= 1000) return rate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (rate >= 100) return rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return rate.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  };

  const crossRate = venta.currency === compra.currency ? 1 : rateCompra / rateVenta;

  const currencies = rates
    ? Object.keys(rates).filter((c) => LATAM_CURRENCIES.includes(c)).sort()
    : LATAM_CURRENCIES;

  const updateCompra = (patch: Partial<CurrencyConfig>) => setCompra((prev) => ({ ...prev, ...patch }));
  const updateVenta = (patch: Partial<CurrencyConfig>) => setVenta((prev) => ({ ...prev, ...patch }));

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-dark-primary">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-amber/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-main relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs font-display font-semibold mb-4 tracking-wider">
            <Calculator size={12} />
            CALCULADORA EN VIVO
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-zinc-100">
            Simulá tu venta con <span className="text-amber">tasas reales</span>
          </h2>
          <p className="text-zinc-100 mt-3 max-w-xl mx-auto font-body">
            Elegí moneda de compra y moneda de venta. Cada una con su propia tasa. El sistema cruza todo automáticamente.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={24} className="text-amber animate-spin" />
              <span className="text-zinc-100 ml-3 font-body text-sm">Obteniendo tasas actualizadas...</span>
            </div>
          ) : error ? (
            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-red-400 text-sm font-body">No pudimos obtener las tasas. Verificá tu conexión o intentá de nuevo.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-800/60 border border-zinc-700/60 mb-5 w-fit mx-auto">
                <button
                  onClick={() => setModo("margen")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-body font-semibold transition-all ${
                    modo === "margen"
                      ? "bg-amber text-zinc-900 shadow-lg shadow-amber/20"
                      : "text-zinc-300 hover:text-zinc-100"
                  }`}
                >
                  <Percent size={14} />
                  Por margen
                </button>
                <button
                  onClick={() => setModo("precio")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-body font-semibold transition-all ${
                    modo === "precio"
                      ? "bg-amber text-zinc-900 shadow-lg shadow-amber/20"
                      : "text-zinc-300 hover:text-zinc-100"
                  }`}
                >
                  <DollarSign size={14} />
                  Por precio venta
                </button>
              </div>

              <div className="grid lg:grid-cols-5 gap-5">
                <div className="lg:col-span-3 space-y-4">
                  {/* Purchase */}
                  <div className="p-6 lg:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                    <div className="flex items-center gap-2 mb-5">
                      <DollarSign size={14} className="text-emerald-400" />
                      <span className="text-xs font-display font-bold text-zinc-100 tracking-widest">COMPRA</span>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-[1fr_120px] gap-3">
                        <div>
                          <label className="block text-zinc-100 text-xs font-body font-semibold mb-1.5">Precio de compra</label>
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
                          <label className="block text-zinc-100 text-xs font-body font-semibold mb-1.5">Moneda</label>
                          <select
                            value={compra.currency}
                            onChange={(e) => updateCompra({ currency: e.target.value })}
                            className="w-full px-3 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-sm font-body font-medium outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all appearance-none cursor-pointer"
                          >
                            {currencies.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {compra.currency !== "USD" && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/40">
                          <div className="flex gap-1 p-0.5 rounded-md bg-zinc-800/80">
                            <button
                              onClick={() => updateCompra({ tipoTasa: "api" })}
                              className={`px-2 py-1 rounded text-[10px] font-body font-semibold transition-all ${
                                compra.tipoTasa === "api" ? "bg-amber/20 text-amber" : "text-zinc-400"
                              }`}
                            >
                              API
                            </button>
                            <button
                              onClick={() => updateCompra({ tipoTasa: "manual" })}
                              className={`px-2 py-1 rounded text-[10px] font-body font-semibold transition-all flex items-center gap-0.5 ${
                                compra.tipoTasa === "manual" ? "bg-amber/20 text-amber" : "text-zinc-400"
                              }`}
                            >
                              <Pencil size={8} />
                              Manual
                            </button>
                          </div>
                          {compra.tipoTasa === "api" ? (
                            <span className="text-zinc-100 text-xs font-body">
                              1 USD = <span className="font-mono font-bold">{formatRate(rateCompra)}</span> {compra.currency}
                            </span>
                          ) : (
                            <input
                              type="number"
                              step="any"
                              min="0"
                              value={compra.customRate}
                              onChange={(e) => updateCompra({ customRate: e.target.value })}
                              placeholder={`${formatRate(rateCompra)}`}
                              className="flex-1 px-2 py-1 rounded bg-zinc-800/80 border border-amber/40 text-zinc-100 text-xs font-mono nums outline-none min-w-0"
                            />
                          )}
                        </div>
                      )}
                      {compra.currency !== "USD" && (
                        <div className="text-right text-xs font-body font-medium text-zinc-200">
                          = $<span className="text-zinc-100 font-bold nums">{purchaseUsd.toFixed(2)}</span> USD
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sale */}
                  <div className="p-6 lg:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                    <div className="flex items-center gap-2 mb-5">
                      <TrendingUp size={14} className="text-amber" />
                      <span className="text-xs font-display font-bold text-zinc-100 tracking-widest">VENTA</span>
                    </div>
                    <div className="space-y-4">
                      {modo === "margen" ? (
                        <div className="grid grid-cols-[1fr_120px] gap-3">
                          <div>
                            <label className="block text-zinc-100 text-xs font-body font-semibold mb-1.5">Margen de ganancia</label>
                            <div className="relative">
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                value={margin}
                                onChange={(e) => setMargin(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-lg font-bold nums outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all pr-8"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 font-body font-bold text-sm">%</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-zinc-100 text-xs font-body font-semibold mb-1.5">Moneda</label>
                            <select
                              value={venta.currency}
                              onChange={(e) => updateVenta({ currency: e.target.value })}
                              className="w-full px-3 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-sm font-body font-medium outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all appearance-none cursor-pointer"
                            >
                              {currencies.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-[1fr_120px] gap-3">
                          <div>
                            <label className="block text-zinc-100 text-xs font-body font-semibold mb-1.5">Precio de venta</label>
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
                            <label className="block text-zinc-100 text-xs font-body font-semibold mb-1.5">Moneda</label>
                            <select
                              value={venta.currency}
                              onChange={(e) => updateVenta({ currency: e.target.value })}
                              className="w-full px-3 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 text-sm font-body font-medium outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30 transition-all appearance-none cursor-pointer"
                            >
                              {currencies.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {venta.currency !== "USD" && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/40">
                          <div className="flex gap-1 p-0.5 rounded-md bg-zinc-800/80">
                            <button
                              onClick={() => updateVenta({ tipoTasa: "api" })}
                              className={`px-2 py-1 rounded text-[10px] font-body font-semibold transition-all ${
                                venta.tipoTasa === "api" ? "bg-amber/20 text-amber" : "text-zinc-400"
                              }`}
                            >
                              API
                            </button>
                            <button
                              onClick={() => updateVenta({ tipoTasa: "manual" })}
                              className={`px-2 py-1 rounded text-[10px] font-body font-semibold transition-all flex items-center gap-0.5 ${
                                venta.tipoTasa === "manual" ? "bg-amber/20 text-amber" : "text-zinc-400"
                              }`}
                            >
                              <Pencil size={8} />
                              Manual
                            </button>
                          </div>
                          {venta.tipoTasa === "api" ? (
                            <span className="text-zinc-100 text-xs font-body">
                              1 USD = <span className="font-mono font-bold">{formatRate(rateVenta)}</span> {venta.currency}
                            </span>
                          ) : (
                            <input
                              type="number"
                              step="any"
                              min="0"
                              value={venta.customRate}
                              onChange={(e) => updateVenta({ customRate: e.target.value })}
                              placeholder={`${formatRate(rateVenta)}`}
                              className="flex-1 px-2 py-1 rounded bg-zinc-800/80 border border-amber/40 text-zinc-100 text-xs font-mono nums outline-none min-w-0"
                            />
                          )}
                        </div>
                      )}
                      {venta.currency !== "USD" && (
                        <div className="text-right text-xs font-body font-medium text-zinc-200">
                          = $<span className="text-zinc-100 font-bold nums">{(venta.currency === "USD" ? parseFloat(salePrice || "0") : (modo === "margen" ? saleLocal : parseFloat(salePrice || "0")) / rateVenta).toFixed(2)}</span> USD
                        </div>
                      )}
                      {modo === "margen" && (
                        <div className="p-3 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-between">
                          <span className="text-zinc-100 text-xs font-body font-semibold">Precio de venta sugerido</span>
                          <span className="text-amber text-lg font-bold nums">
                            {venta.currency} {Number(calculatedSalePrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cross rate indicator */}
                  {compra.currency !== venta.currency && (
                    <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-zinc-100 text-xs font-body font-medium">
                        <ArrowLeftRight size={14} className="text-amber" />
                        Tasa cruzada
                      </div>
                      <span className="text-zinc-100 text-sm font-mono font-bold nums">
                        1 {compra.currency} = {crossRate.toFixed(6)} {venta.currency}
                      </span>
                    </div>
                  )}
                </div>

                {/* Results */}
                <div className="lg:col-span-2 p-6 lg:p-8 rounded-xl bg-gradient-to-br from-amber/10 via-amber/5 to-zinc-900/60 border border-amber/20">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={16} className="text-amber" />
                    <span className="text-xs font-display font-bold text-zinc-100 tracking-widest">RESULTADOS</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <div className="text-zinc-100 text-xs font-body font-semibold mb-1">Pagaste (en USD)</div>
                      <div className="text-zinc-100 text-xl font-bold nums">${purchaseUsd.toFixed(2)}</div>
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowRight size={20} className="text-amber animate-pulse" />
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <div className="text-zinc-100 text-xs font-body font-semibold mb-1">Cobrás (en USD)</div>
                      <div className="text-amber text-xl font-bold nums">
                        ${(modo === "margen" ? purchaseUsd * (1 + parseFloat(margin || "0") / 100) : (venta.currency === "USD" ? parseFloat(salePrice || "0") : parseFloat(salePrice || "0") / rateVenta)).toFixed(2)}
                      </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    <div className="p-5 rounded-lg bg-amber/10 border border-amber/30">
                      <div className="text-amber text-xs font-body font-bold mb-1 tracking-wider">GANANCIA EN USD</div>
                      <div className="text-amber text-2xl font-black nums">${profitUsd.toFixed(2)}</div>
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Percent size={14} className="text-emerald-400" />
                        <span className="text-zinc-100 text-xs font-body font-semibold">Margen</span>
                      </div>
                      <span className={`text-lg font-bold nums ${calculatedMargin >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {calculatedMargin.toFixed(1)}%
                      </span>
                    </div>

                    <div className="space-y-2 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/40">
                      <div className="text-zinc-200 text-[10px] font-display font-semibold tracking-wider">TASAS APLICADAS</div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-100 font-body font-medium">Compra: 1 USD</span>
                        <span className="text-zinc-100 font-mono font-medium">
                          = {formatRate(rateCompra)} {compra.currency}
                          <span className={`ml-1 text-[10px] font-body font-semibold ${compra.tipoTasa === "api" ? "text-emerald-400" : "text-amber"}`}>
                            ({compra.tipoTasa === "api" ? "API" : "Manual"})
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-100 font-body font-medium">Venta: 1 USD</span>
                        <span className="text-zinc-100 font-mono font-medium">
                          = {formatRate(rateVenta)} {venta.currency}
                          <span className={`ml-1 text-[10px] font-body font-semibold ${venta.tipoTasa === "api" ? "text-emerald-400" : "text-amber"}`}>
                            ({venta.tipoTasa === "api" ? "API" : "Manual"})
                          </span>
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
          <p className="text-zinc-400 text-xs font-body">
            Tasas obtenidas de ExchangeRate API. Los cálculos son ilustrativos. En TiendaPOS las tasas se actualizan automáticamente y se guardan en cada venta.
          </p>
        </div>
      </div>
    </section>
  );
}
