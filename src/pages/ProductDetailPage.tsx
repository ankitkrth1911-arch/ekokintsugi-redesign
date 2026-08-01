import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, ShieldCheck, TreePine, Leaf, Sparkles, ShoppingBag, UserRound } from "lucide-react";
import { useProductsCatalog } from "../hooks/useProductsCatalog";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import ProductCatalogueGrid from "../components/ProductCatalogueGrid";
import { hoverGlowButton, scrollReveal } from "../lib/motion";

const getSizesForCategory = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("men's footwear") || cat.includes("mens footwear")) {
    return ["40", "41", "42", "43", "44", "45", "46", "47"];
  }
 if (cat.includes("women's footwear") || cat.includes("womens footwear")) {
  return ["36", "37", "38", "39", "40", "41"];
}
  if (cat.includes("jackets")) {
    return ["S", "M", "L", "XL"];
  }
  if (cat.includes("laptop bags")) {
    return ["13-inch", "14-inch", "15-inch", "16-inch"];
  }
  if (cat.includes("belts")) {
    return ["32", "34", "36", "38", "40"];
  }
  return ["One Size"];
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, isLoading, error } = useProductsCatalog();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();

  const product = products.find((p) => String(p.id) === String(id));

  const getSourcingDetails = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("footwear") || cat.includes("flat") || cat.includes("sneaker")) {
      return t("detailpage.sourcing.footwear");
    }
    if (cat.includes("backpack") || cat.includes("bag")) {
      return t("detailpage.sourcing.bags");
    }
    return t("detailpage.sourcing.accessories");
  };

  const availableSizes = product && (product.sizes && product.sizes.length > 0 ? product.sizes : getSizesForCategory(product.category));
  const [selectedSize, setSelectedSize] = useState(availableSizes ? (availableSizes[0] || "One Size") : "One Size");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-glow-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card p-14 text-center rounded-[2.5rem]">
            <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-4">
              {t("detailpage.unavailable_eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-white font-bold mb-6">{t("detailpage.unavailable_title")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              {t("detailpage.unavailable_desc")}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-glow text-white px-8 py-4 text-[10px] font-mono tracking-widest uppercase font-bold shadow-lg hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("categorypage.back_btn")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && String(p.id) !== String(id))
    .slice(0, 4);

  const co2Val = product.co2_factor ? parseFloat(String(product.co2_factor)) : 0;
  const wasteVal = product.waste_factor ? parseFloat(String(product.waste_factor)) : 0;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-glow-orange/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-left font-bold text-white/50">
          <Link to="/products" className="hover:text-glow-orange transition-colors">
            {t("nav.products")}
          </Link>
          <ChevronRight className="w-4 h-4 text-white/30" />
          <span className="text-white/70">{product.category || t("detailpage.circular_collection")}</span>
          <ChevronRight className="w-4 h-4 text-white/30" />
          <span className="text-glow-orange truncate max-w-48">{product.name}</span>
        </div>

        <section className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start mb-24">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card rounded-[2.5rem] overflow-hidden"
          >
            <div className="aspect-square bg-white/5 overflow-hidden relative border-b border-white/10">
              <motion.img
                src={product.image_url || product.image || "/logo_eko.png"}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col space-y-8 text-left"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-black block mb-4">
                {product.category || t("detailpage.circular_collection")}
              </span>
              <h1 className="text-4xl sm:text-5xl font-heading text-white font-bold mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground italic leading-relaxed">
                {product.description || product.desc || "A masterpiece of circular utility and traceable craftsmanship."}
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl flex gap-5 items-start">
              <ShieldCheck className="w-6 h-6 text-glow-orange shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-mono tracking-widest text-white font-bold uppercase mb-2">
                  {t("detailpage.sourcing_title")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getSourcingDetails(product.category)}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-5">
                <Leaf className="w-8 h-8 text-glow-orange shrink-0" />
                <div>
                  <p className="text-[9px] font-mono tracking-widest text-white/50 uppercase font-bold">{t("dashboard.stat.co2")}</p>
                  <p className="text-xl font-heading font-bold text-white">{co2Val.toFixed(1)} kg</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-5">
                <TreePine className="w-8 h-8 text-white shrink-0" />
                <div>
                  <p className="text-[9px] font-mono tracking-widest text-white/50 uppercase font-bold">{t("impactpage.metrics.waste").split(" ")[0]}</p>
                  <p className="text-xl font-heading font-bold text-white">{wasteVal.toFixed(1)} kg</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground font-black">
                  Select Circular Size
                </span>
                <span className="text-[10px] font-mono text-glow-orange font-bold">
                  Active: {selectedSize}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {availableSizes && availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`h-12 rounded-xl font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer border flex items-center justify-center font-bold ${
                      selectedSize === sz
                        ? "bg-glow-orange/20 border-glow-orange text-glow-orange shadow-lg"
                        : "bg-white/5 border-white/10 text-white hover:border-glow-orange/50 hover:bg-white/10"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              {user ? (
                <motion.button
                  onClick={() => addToCart(product, 1, selectedSize)}
                  variants={hoverGlowButton}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-gradient-glow text-white px-8 py-5 font-mono text-[10px] tracking-widest uppercase font-black shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t("detailpage.add_to_cart")}
                </motion.button>
              ) : (
                <Link
                  to="/auth"
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-white/10 border border-white/20 text-white px-8 py-5 font-mono text-[10px] tracking-widest uppercase font-black hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
                >
                  <UserRound className="w-4 h-4" />
                  {t("detailpage.sign_in_cart")}
                </Link>
              )}
              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-mono font-bold">
                <Sparkles className="w-3 h-3 text-glow-orange animate-pulse" />
                <span>{t("detailpage.supports_restoration")}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="border-t border-white/10 pt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-3">
                  {t("detailpage.recommendations")}
                </p>
                <h2 className="text-3xl font-heading font-bold text-white">{t("detailpage.related_designs")}</h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-glow-orange transition-colors font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("detailpage.explore_all")}
              </Link>
            </div>

            <ProductCatalogueGrid
              products={relatedProducts}
              isLoading={false}
              error={null}
              emptyMessage="No related designs available."
            />
          </section>
        )}
      </div>
    </div>
  );
}
