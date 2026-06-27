import { FaWhatsapp } from "react-icons/fa";
import { waUrl } from "../data/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waUrl("Hola, quiero información sobre TiendaPOS")}
      target="_blank"
      class="fixed bottom-6 right-6 z-40 group"
    >
      {/* Tooltip */}
      <div class="absolute right-16 bottom-1/2 translate-y-1/2 px-4 py-2 rounded-xl bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/50 text-zinc-100 text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-lg shadow-black/20">
        Escríbenos
        <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-y-6 border-l-6 border-y-transparent border-l-zinc-900/95" />
      </div>

      {/* Button */}
      <div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center shadow-lg shadow-amber/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-amber/40">
        <FaWhatsapp size={26} class="text-zinc-900" />
        <div class="absolute inset-0 rounded-full bg-amber/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </a>
  );
}
