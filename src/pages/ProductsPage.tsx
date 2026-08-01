import { ArrowRight, Layers3, PackageOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useProductsCatalog } from "../hooks/useProductsCatalog";
import { useLanguage } from "../lib/LanguageContext";
import { scrollReveal } from "../lib/motion";
import {
  getCategoryFromQuery,
  getProductCountByCategory,
  PRODUCT_CATEGORIES
} from "../lib/productCatalog";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const matchedCategory = getCategoryFromQuery(categoryQuery);
  const { products, isLoading, error } = useProductsCatalog();
  const categoryCounts = getProductCountByCategory(products);
  const { t } = useLanguage();

  const getLocalizedCategory = (category: any) => {
    if (!category) return null;
    switch (category.slug) {
      case "belts":
        return { ...category, title: t("category.belts.title"), shortTitle: t("category.belts.short"), eyebrow: t("category.belts.eyebrow"), description: t("category.belts.desc") };
      case "accessories":
        return { ...category, title: t("category.accessories.title"), shortTitle: t("category.accessories.short"), eyebrow: t("category.accessories.eyebrow"), description: t("category.accessories.desc") };
      case "handbag-collections":
        return { ...category, title: t("category.handbags.title"), shortTitle: t("category.handbags.short"), eyebrow: t("category.handbags.eyebrow"), description: t("category.handbags.desc") };
      case "jackets":
        return { ...category, title: t("category.jackets.title"), shortTitle: t("category.jackets.short"), eyebrow: t("category.jackets.eyebrow"), description: t("category.jackets.desc") };
      case "laptop-bags":
        return { ...category, title: t("category.laptopbags.title"), shortTitle: t("category.laptopbags.short"), eyebrow: t("category.laptopbags.eyebrow"), description: t("category.laptopbags.desc") };
      case "mens-footwear":
        return { ...category, title: t("category.mens.title"), shortTitle: t("category.mens.short"), eyebrow: t("category.mens.eyebrow"), description: t("category.mens.desc") };
      case "wallets":
        return { ...category, title: t("category.wallets.title"), shortTitle: t("category.wallets.short"), eyebrow: t("category.wallets.eyebrow"), description: t("category.wallets.desc") };
      case "womens-footwear":
        return { ...category, title: t("category.womens.title"), shortTitle: t("category.womens.short"), eyebrow: t("category.womens.eyebrow"), description: t("category.womens.desc") };
      default:
        return category;
    }
  };

  if (matchedCategory) {
    return <Navigate to={`/products/category/${matchedCategory.slug}`} replace />;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-orange/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-24">
          <motion.div 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">{t("productspage.badge")}</span>
          </motion.div>
          <motion.h1 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-heading text-white font-bold mb-6"
          >
            {t("productspage.title")}
          </motion.h1>
          <motion.p 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground italic max-w-3xl mx-auto"
          >
            {t("productspage.subtitle")}
          </motion.p>
        </header>

        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-[2.5rem] mb-20 relative overflow-hidden border-glow-orange/20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Layers3 className="w-6 h-6 text-glow-orange" />
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-glow-orange font-bold">
                  {t("productspage.nav_eyebrow")}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading text-white font-bold mb-4">
                {t("productspage.nav_title")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("productspage.nav_desc")}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl px-8 py-6 min-w-56 text-left relative z-10">
              <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-glow-orange mb-2 font-bold">{t("productspage.status_eyebrow")}</p>
              <p className="text-3xl sm:text-4xl font-heading font-bold mb-2 text-white">
                {isLoading ? t("productspage.syncing") : error ? t("productspage.offline") : `${products.length} ${t("productspage.products_suffix")}`}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{t("productspage.status_desc")}</p>
            </div>
          </div>
        </motion.div>

        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
            <PackageOpen className="text-glow-orange w-6 h-6 shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white flex-grow">{t("productspage.browse_title")}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PRODUCT_CATEGORIES.map((cat, idx) => {
              const category = getLocalizedCategory(cat);
              if (!category) return null;

              return (
                <motion.article
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group glass-card rounded-[2.5rem] overflow-hidden flex flex-col text-left hover:border-glow-orange/50 transition-all cursor-pointer relative"
                >
                  <div className="grid sm:grid-cols-[1fr_1.2fr] md:grid-cols-[1fr_1.3fr] h-full relative z-10">
                    <div className="relative min-h-60 sm:min-h-0 overflow-hidden bg-white/5 border-r border-white/10">
                      <img
                        src={category.image}
                        alt={category.shortTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity opacity-80"
                        style={{ objectPosition: category.imagePosition ?? "center" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute left-6 bottom-6 right-6">
                        <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-2">
                          {category.eyebrow}
                        </p>
                        <h3 className="text-2xl font-heading text-white font-bold">{category.shortTitle}</h3>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between bg-white/5">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-8">{category.description}</p>
                      <div>
                        <div className="flex items-center justify-between gap-4 py-4 border-y border-white/10 mb-8">
                          <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-muted-foreground font-bold">
                            {t("productspage.category_count_label")}
                          </span>
                          <span className="text-2xl font-heading text-white font-bold">
                            {isLoading ? "--" : error ? "0" : categoryCounts[category.slug] ?? 0}
                          </span>
                        </div>
                        <Link
                          to={`/products/category/${category.slug}`}
                          className="w-full inline-flex items-center justify-between gap-4 rounded-full bg-white/10 border border-white/20 px-6 py-4 text-[10px] font-mono tracking-widest uppercase font-bold text-white group-hover:bg-gradient-glow transition-all duration-300 shadow-lg"
                        >
                          {t("productspage.view_products_btn")}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
