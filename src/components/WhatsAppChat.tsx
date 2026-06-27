import { useState, useRef, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { waUrl } from "../data/whatsapp";

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  const send = () => {
    const text = msg.trim() || "Hola quiero información sobre TiendaPOS";
    window.open(waUrl(text), "_blank");
    setMsg("");
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") send();
  };

  return (
    <div class="fixed bottom-0 right-0 z-40 flex items-end justify-end p-3 sm:p-4 md:p-6 pointer-events-none max-w-full">
      {/* Backdrop */}
      {open && (
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" />
      )}

      {/* Chat panel */}
      <div
        ref={panelRef}
        class={`relative pointer-events-auto w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[360px] md:w-[380px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700/60 shadow-2xl shadow-black/50 transition-all duration-300 ease-out origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div class="relative overflow-hidden bg-gradient-to-r from-amber to-amber-dark px-3.5 sm:px-4 pt-3.5 sm:pt-4 pb-4 sm:pb-5">
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-zinc-900/10 rounded-full blur-xl" />
          <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
          <div class="flex items-center gap-2.5 sm:gap-3 relative">
            <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-900/20 flex items-center justify-center font-display font-bold text-lg sm:text-xl text-zinc-900 shadow-inner ring-2 ring-white/10 shrink-0">
              T
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-display font-bold text-zinc-900 text-sm sm:text-base leading-tight">TiendaPOS</div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50 animate-pulse shrink-0" />
                <span class="text-zinc-900/70 text-[10px] sm:text-xs font-medium truncate">En línea · Respondemos al instante</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-zinc-900/60 hover:bg-zinc-900/15 hover:text-zinc-900 transition-all shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="sm:w-[14px] sm:h-[14px]">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div class="p-3.5 sm:p-4 pt-3 sm:pt-3.5 bg-zinc-900">
          {/* Bot bubble */}
          <div class="flex items-start gap-2 sm:gap-2.5 mb-3 sm:mb-4 animate-in">
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber/30 to-amber/10 flex items-center justify-center font-display font-bold text-[10px] sm:text-xs text-amber shrink-0 mt-0.5 border border-amber/20">
              T
            </div>
            <div class="relative min-w-0">
              <div class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl rounded-tl-sm bg-zinc-800 border border-zinc-700/50 text-zinc-300 text-xs sm:text-sm leading-relaxed shadow-sm">
                ¡Hola! 👋 Soy el equipo de <span class="text-amber font-medium">TiendaPOS</span>. ¿En qué puedo ayudarte? Escríbeme tu consulta y te responderé al instante por WhatsApp.
              </div>
              <div class="text-[10px] text-zinc-600 mt-1.5 ml-1 font-mono">Ahora</div>
            </div>
          </div>

          {/* Quick suggestions */}
          <div class="flex flex-wrap gap-1.5 mb-3 sm:mb-3.5">
            {["Quiero una demo", "Ver planes", "Soporte técnico", "Cotización"].map((s) => (
              <button
                key={s}
                onClick={() => { setMsg(s); setTimeout(() => inputRef.current?.focus(), 50); }}
                class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/40 text-zinc-400 text-[10px] sm:text-xs hover:bg-zinc-800 hover:border-zinc-600 hover:text-zinc-200 transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div class="flex items-center gap-2 bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu duda..."
              autocomplete="off"
              class="flex-1 bg-transparent text-zinc-100 text-xs sm:text-sm placeholder-zinc-500 outline-none chat-input min-w-0"
              maxLength={500}
            />
            <button
              onClick={send}
              disabled={!msg.trim()}
              class={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                msg.trim()
                  ? "bg-amber text-zinc-900 hover:bg-amber/90 shadow-sm shadow-amber/20"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 15 15" fill="none" class="sm:w-[15px] sm:h-[15px]">
                <path d="M1 7.5l13-6-5 6 5 6-13-6z" fill="currentColor" />
                <path d="M1 7.5h9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        class={`relative pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 shrink-0 ${
          open
            ? "bg-zinc-800 border border-zinc-600 shadow-zinc-900/50 rotate-90"
            : "bg-gradient-to-br from-amber to-amber-dark shadow-amber/30 hover:shadow-amber/40"
        }`}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none" class="text-zinc-400 sm:w-[22px] sm:h-[22px]">
            <path d="M17 5L5 17M5 5l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <FaWhatsapp size={22} class="text-zinc-900 sm:w-[26px] sm:h-[26px]" />
            <span class="absolute inset-0 rounded-full border-2 border-amber/30 animate-ping opacity-40" />
            <span class="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 border-2 border-zinc-900 shadow-sm" />
          </>
        )}
      </button>

      <style>{`
        .chat-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: #f4f4f5 !important;
          background-color: transparent !important;
          background: transparent !important;
        }
        .chat-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: #f4f4f5 !important;
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}
