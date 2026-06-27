import { FaWhatsapp } from "react-icons/fa";

interface Props {
  href: string;
  label: string;
}

export default function WaButton({ href, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 mt-6 px-5 py-2.5 rounded-lg bg-amber hover:bg-amber/90 text-zinc-900 font-semibold text-sm transition-all duration-300"
    >
      <FaWhatsapp size={18} className="transition-transform duration-300 group-hover:scale-110" />
      {label}
    </a>
  );
}
