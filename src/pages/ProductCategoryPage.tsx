import { ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import ProductCatalogueGrid from "../components/ProductCatalogueGrid";
import { useProductsCatalog } from "../hooks/useProductsCatalog";
import { useLanguage } from "../lib/LanguageContext";
import { getCategoryBySlug, getProductsForCategory, PRODUCT_CATEGORIES } from "../lib/productCatalog";
import { scrollReveal } from "../lib/motion";

export default function ProductCategoryPage() {
  const { slug } = useParams();
  const rawCategory = getCategoryBySlug(slug);
  const { products, isLoading, error } = useProductsCatalog();
  const { t } = useLanguage();

  const getLocalizedCategory = (category: any) => {
    if (!category) return null;
    switch (category.slug) {
      case "belts": return { ...category, title: t("category.belts.title"), shortTitle: t("category.belts.short"), eyebrow: t("category.belts.eyebrow"), description: t("category.belts.desc") };
      case "accessories": return { ...category, title: t("category.accessories.title"), shortTitle: t("category.accessories.short"), eyebrow: t("category.accessories.eyebrow"), description: t("category.accessories.desc") };
      case "handbag-collections": return { ...category, title: t("category.handbags.title"), shortTitle: t("category.handbags.short"), eyebrow: t("category.handbags.eyebrow"), description: t("category.handbags.desc") };
      case "jackets": return { ...category, title: t("category.jackets.title"), shortTitle: t("category.jackets.short"), eyebrow: t("category.jackets.eyebrow"), description: t("category.jackets.desc") };
      case "laptop-bags": return { ...category, title: t("category.laptopbags.title"), shortTitle: t("category.laptopbags.short"), eyebrow: t("category.laptopbags.eyebrow"), description: t("category.laptopbags.desc") };
      case "mens-footwear": return { ...category, title: t("category.mens.title"), shortTitle: t("category.mens.short"), eyebrow: t("category.mens.eyebrow"), description: t("category.mens.desc") };
      case "wallets": return { ...category, title: t("category.wallets.title"), shortTitle: t("category.wallets.short"), eyebrow: t("category.wallets.eyebrow"), description: t("category.wallets.desc") };
      case "womens-footwear": return { ...category, title: t("category.womens.title"), shortTitle: t("category.womens.short"), eyebrow: t("category.womens.eyebrow"), description: t("category.womens.desc") };
      default: return category;
    }
  };

  const category = getLocalizedCategory(rawCategory);
  const filteredProducts = rawCategory ? getProductsForCategory(products, rawCategory) : [];

  if (!category) {
    return (
      <div className="py-32 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card p-14 text-center rounded-[2.5rem]">
            <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-4">
              {t("categorypage.not_found_eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-white font-bold mb-6">{t("categorypage.not_found_title")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              {t("categorypage.not_found_desc")}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-glow text-white px-8 py-4 text-[10px] font-mono tracking-widest uppercase font-bold transition-all shadow-lg hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("categorypage.back_btn")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-left relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-pink/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-10 flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-widest uppercase font-bold text-white/50">
          <Link to="/products" className="hover:text-glow-orange transition-colors">
            {t("nav.products")}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-glow-orange">{category.shortTitle}</span>
        </div>

        <motion.section 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-panel border-glow-orange/20 rounded-[2.5rem] overflow-hidden mb-20 relative"
        >
          <div className="grid lg:grid-cols-[1.2fr_1fr] items-stretch relative z-10">
            <div className="relative min-h-[20rem] lg:min-h-[30rem] bg-white/5 border-r border-white/10 overflow-hidden">
              <img
                src={category.image}
                alt={category.shortTitle}
                className="w-full h-full object-cover mix-blend-luminosity opacity-70"
                style={{ objectPosition: category.imagePosition ?? "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a0a0f]/90 via-[#0a0a0f]/40 to-transparent" />
            </div>

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white/5">
              <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-4">
                {category.eyebrow}
              </p>
              <h1 className="text-4xl md:text-5xl font-heading text-white font-bold mb-6">{category.title}</h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-10">{category.description}</p>
              <div className="flex flex-wrap gap-3">
                {PRODUCT_CATEGORIES.map((itemRaw) => {
                  const item = getLocalizedCategory(itemRaw);
                  if (!item) return null;
                  const isActive = item.slug === category.slug;
                  return (
                    <Link
                      key={item.slug}
                      to={`/products/category/${item.slug}`}
                      className={`rounded-full px-5 py-3 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-glow text-white shadow-lg"
                          : "bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {item.shortTitle}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        <section>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b border-white/10 pb-6">
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-3">
                {t("categorypage.filtered_eyebrow")}
              </p>
              <h2 className="text-3xl font-heading font-bold text-white">{t("categorypage.filtered_title")} {category.shortTitle}</h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-glow-orange transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("categorypage.all_btn")}
            </Link>
          </div>

          <ProductCatalogueGrid
            products={filteredProducts}
            isLoading={isLoading}
            error={error}
            emptyMessage={`No ${category.shortTitle.toLowerCase()} are available right now.`}
          />
        </section>
      </div>
    </div>
  );
}
