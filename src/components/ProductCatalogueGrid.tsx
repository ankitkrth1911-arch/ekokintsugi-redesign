import { motion } from "framer-motion";
import type { CatalogProduct } from "../lib/productCatalog";
import { Link } from "react-router-dom";
import { hoverCard } from "../lib/motion";

function formatImpactValue(value: CatalogProduct["co2_factor"] | CatalogProduct["waste_factor"], unit: string) {
  const numericValue = typeof value === "string" ? Number.parseFloat(value) : value;

  if (typeof numericValue !== "number" || Number.isNaN(numericValue)) {
    return "N/A";
  }

  return `${numericValue.toFixed(1)}${unit}`;
}

interface ProductCatalogueGridProps {
  products: CatalogProduct[];
  isLoading: boolean;
  error: string | null;
  emptyMessage: string;
}

export default function ProductCatalogueGrid({
  products,
  isLoading,
  error,
  emptyMessage
}: ProductCatalogueGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-glow-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 glass-card rounded-[2rem]">
        <p className="text-white font-heading text-2xl mb-3">Products unavailable</p>
        <p className="text-muted-foreground max-w-xl mx-auto">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 glass-card rounded-[2rem]">
        <p className="text-muted-foreground font-mono tracking-wide">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {products.map((item, idx) => (
        <motion.article
          key={item.id || `${item.name}-${idx}`}
          variants={hoverCard}
          initial="idle"
          whileHover="hover"
          className="glass-card rounded-[2rem] overflow-hidden group flex flex-col cursor-pointer text-left"
        >
          <Link to={`/products/item/${item.id}`} className="flex flex-col h-full hover:no-underline relative z-10">
            <div className="aspect-square bg-white/5 overflow-hidden relative border-b border-white/10">
              <img
                src={item.image_url || item.image || "/logo_eko.png"}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-80" />
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <p className="text-[10px] font-mono tracking-widest text-glow-orange uppercase font-bold mb-2">
                {item.category || "Product"}
              </p>
              <h3 className="font-heading text-xl md:text-2xl text-white font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-glow-orange to-glow-pink transition-all">{item.name}</h3>
              <p className="text-sm text-muted-foreground italic flex-grow mb-6 leading-relaxed">
                {item.description || item.desc || "Crafted from circular materials with traceable impact."}
              </p>
              <div className="mt-auto flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest pt-5 border-t border-white/10">
                <span className="text-glow-orange opacity-80">CO2: {formatImpactValue(item.co2_factor, "kg")}</span>
                <span className="text-white opacity-60">Waste: {formatImpactValue(item.waste_factor, "kg")}</span>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
