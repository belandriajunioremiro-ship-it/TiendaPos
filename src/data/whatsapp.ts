import { site } from "./content";

const phone = site.whatsapp.replace(/[^0-9]/g, "");

export function waUrl(msg: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
