import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../lib/productCatalog";
import { scrollReveal, hoverCard } from "../lib/motion";

export default function ProductSection() {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-glow-pink/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6">
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">Eko Luxury Products</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-6 font-bold">Browse By Category</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto italic leading-relaxed">
            Explore dedicated product pages for leather backpacks, leather bags, wallets, accessories, and distinct
            men's and women's footwear collections. Each category opens into a focused page with only the relevant
            products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCT_CATEGORIES.map((category, idx) => (
            <motion.button
              key={category.slug}
              type="button"
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(`/products/category/${category.slug}`)}
              className="group glass-card overflow-hidden flex flex-col md:flex-row h-full text-left hover:border-glow-orange/50 transition-all cursor-pointer relative"
            >
              <div className="w-full md:w-2/5 h-56 md:h-auto overflow-hidden relative shrink-0 flex items-center justify-center bg-white/5">
                <img
                  src={category.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-20 scale-110 pointer-events-none mix-blend-luminosity"
                />
                <img
                  src={category.image}
                  alt={category.shortTitle}
                  className="relative z-10 max-w-full max-h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: category.imagePosition ?? "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20 md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 pointer-events-none z-20 hidden md:block" />
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow justify-center relative z-30">
                <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-4">
                  {category.eyebrow}
                </p>
                <h3 className="text-2xl sm:text-3xl font-heading text-white mb-4 font-bold">{category.shortTitle}</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-8 flex-grow leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-auto flex items-center font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold text-glow-orange justify-between pt-6 border-t border-white/10">
                  <span>View Products</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
