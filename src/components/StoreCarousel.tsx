import { useEffect, useState, useRef } from "react";
import { Store, ShoppingBag, CreditCard, Package, BarChart3, Receipt, Star, Sparkles } from "lucide-react";

const ITEMS = [
  { icon: Store, label: "Multi-tienda" },
  { icon: ShoppingBag, label: "Ventas" },
  { icon: CreditCard, label: "Pagos" },
  { icon: Package, label: "Inventario" },
  { icon: BarChart3, label: "Reportes" },
  { icon: Receipt, label: "Facturación" },
];

export default function StoreCarousel() {
  const [active, setActive] = useState(0);
  const [showStar, setShowStar] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  const sparkleId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % ITEMS.length);
      setShowStar(true);
      const newSparkles = Array.from({ length: 4 }, (_, i) => ({
        id: sparkleId.current++,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100 - 30,
        size: 6 + Math.random() * 8,
        delay: i * 0.1,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setShowStar(false), 1800);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const radius = 120;
  const cx = 150;
  const cy = 150;

  return (
    <div className="relative w-[300px] h-[300px] select-none">
      {/* Orbit ring */}
      <svg className="absolute" viewBox="0 0 300 300" width="300" height="300" style={{ filter: "drop-shadow(0 0 30px rgba(245, 158, 11, 0.1))" }}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx={cx} cy={cy} r={radius - 20} fill="none" stroke="rgba(245, 158, 11, 0.05)" strokeWidth="1" />
      </svg>

      {/* Icons */}
      {ITEMS.map((item, i) => {
        const angle = (i * 360) / ITEMS.length - 90;
        const rad = (angle * Math.PI) / 180;
        const x = cx + radius * Math.cos(rad) - 18;
        const y = cy + radius * Math.sin(rad) - 18;
        const isActive = i === active;
        const Icon = item.icon;

        return (
          <div
            key={i}
            className="absolute transition-all duration-700 ease-out"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: isActive ? "scale(1.35)" : "scale(1)",
            }}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-700 ${
                isActive
                  ? "bg-amber/20 border-amber/50 text-amber shadow-lg shadow-amber/20"
                  : "bg-zinc-800/60 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
              }`}
              style={{
                boxShadow: isActive ? "0 0 40px rgba(245, 158, 11, 0.2)" : "none",
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
            </div>

            {/* Label */}
            {isActive && (
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-2 text-[11px] font-mono text-amber font-medium whitespace-nowrap transition-all duration-500"
                style={{
                  opacity: showStar ? 1 : 0,
                  transform: showStar
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-4px)",
                }}
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}

      {/* Center star */}
      <div
        className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber/15 to-amber/5 border border-amber/20 transition-all duration-700"
        style={{
          transform: showStar ? "scale(1.15)" : "scale(1)",
          boxShadow: showStar
            ? "0 0 60px rgba(245, 158, 11, 0.25)"
            : "0 0 20px rgba(245, 158, 11, 0.05)",
        }}
      >
        <Star
          size={34}
          className="text-amber transition-all duration-700"
          style={{
            transform: showStar ? "scale(1.2) rotate(180deg)" : "scale(1) rotate(0deg)",
            filter: showStar ? "drop-shadow(0 0 12px rgba(245, 158, 11, 0.6))" : "none",
          }}
          fill={showStar ? "rgba(245, 158, 11, 0.5)" : "transparent"}
        />

        {/* Next level text */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-mono font-bold tracking-wider text-amber/80 whitespace-nowrap transition-all duration-700"
          style={{ opacity: showStar ? 1 : 0 }}
        >
          SIGUIENTE NIVEL
        </div>
      </div>

      {/* Floating sparkles */}
      {sparkles.map((s) => (
        <Sparkles
          key={s.id}
          size={s.size}
          className="absolute text-amber/50"
          style={{
            left: `${cx + s.x - 6}px`,
            top: `${cy + s.y - 6}px`,
            opacity: 0,
            animation: `sparkleFade 1.2s ease-out ${s.delay}s forwards`,
          }}
        />
      ))}

      <style>{`
        @keyframes sparkleFade {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          30% { opacity: 1; transform: scale(1.2) rotate(180deg); }
          100% { opacity: 0; transform: scale(0.3) rotate(360deg) translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
