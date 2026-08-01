import { motion } from "framer-motion";
import { BarChart3, TreePine } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { scrollReveal, hoverCard } from "../lib/motion";

export default function ImpactPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden text-left">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-glow-pink/10 blur-[150px] pointer-events-none rounded-full translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        
        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div 
            variants={scrollReveal}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-glow-orange uppercase">{t("impactpage.badge")}</span>
          </motion.div>
          <motion.h1 
            variants={scrollReveal}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight"
          >
            {t("impactpage.title")}
          </motion.h1>
          <motion.p 
            variants={scrollReveal}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted-foreground italic leading-relaxed"
          >
            {t("impactpage.subtitle")}
          </motion.p>
        </header>

        {/* Core Pillars Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
           <motion.div 
             variants={hoverCard}
             initial="idle"
             whileHover="hover"
             className="glass-card p-8 sm:p-12 rounded-[2.5rem] flex flex-col justify-center group cursor-pointer hover:border-glow-orange/30 transition-all text-left relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 relative z-10">{t("impactpage.loop.title")}</h3>
              <p className="text-base md:text-lg text-muted-foreground italic leading-relaxed mb-8 relative z-10">
                 {t("impactpage.loop.desc")}
              </p>
              
              <div className="space-y-4 text-sm font-semibold uppercase font-mono tracking-widest text-glow-orange relative z-10">
                 <p className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-glow-orange" />{t("impactpage.loop.item1")}</p>
                 <p className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-glow-orange" />{t("impactpage.loop.item2")}</p>
                 <p className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-glow-orange" />{t("impactpage.loop.item3")}</p>
              </div>
           </motion.div>

           <motion.div 
             variants={hoverCard}
             initial="idle"
             whileHover="hover"
             className="glass-panel border-glow-orange/20 hover:border-glow-orange/50 p-8 sm:p-12 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden group cursor-pointer transition-all text-left"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-glow-pink/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-white relative z-10">{t("impactpage.handshake.title")}</h3>
              <ul className="space-y-6 relative z-10">
                 <li className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-glow-orange mt-2 animate-pulse shrink-0 shadow-[0_0_10px_rgba(255,87,34,0.8)]" />
                    <p className="text-base md:text-lg text-muted-foreground"><strong className="text-white font-bold">{t("impactpage.handshake.item1_bold")}</strong>{t("impactpage.handshake.item1_text")}</p>
                 </li>
                 <li className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-glow-orange mt-2 animate-pulse shrink-0 shadow-[0_0_10px_rgba(255,87,34,0.8)]" />
                    <p className="text-base md:text-lg text-muted-foreground"><strong className="text-white font-bold">{t("impactpage.handshake.item2_bold")}</strong>{t("impactpage.handshake.item2_text")}</p>
                 </li>
                 <li className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-glow-orange mt-2 animate-pulse shrink-0 shadow-[0_0_10px_rgba(255,87,34,0.8)]" />
                    <p className="text-base md:text-lg text-muted-foreground"><strong className="text-white font-bold">{t("impactpage.handshake.item3_bold")}</strong>{t("impactpage.handshake.item3_text")}</p>
                 </li>
              </ul>
           </motion.div>
        </div>

        {/* Tree Parenting & Metrics */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
           <motion.div 
             variants={hoverCard}
             initial="idle"
             whileHover="hover"
             className="glass-card p-8 sm:p-12 rounded-[2.5rem] flex flex-col justify-center group cursor-pointer hover:border-white/30 transition-all text-left relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-white/10 relative z-10">
                 <BarChart3 className="text-white w-8 h-8" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-white mb-8 relative z-10">{t("impactpage.metrics.title")}</h3>
              <ul className="space-y-6 mt-4 relative z-10">
                 <li className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">{t("impactpage.metrics.waste")}</span>
                    <span className="text-2xl font-heading font-black text-white">250-400 <span className="text-sm font-sans tracking-normal opacity-50">{t("impactpage.metrics.waste_unit")}</span></span>
                 </li>
                 <li className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">{t("impactpage.metrics.carbon")}</span>
                    <span className="text-2xl font-heading font-black text-glow-orange">40-55%</span>
                 </li>
                 <li className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground font-bold">{t("impactpage.metrics.water")}</span>
                    <span className="text-xl font-heading font-bold text-white italic">{t("impactpage.metrics.water_val")}</span>
                 </li>
              </ul>
           </motion.div>

           <motion.div 
             variants={hoverCard}
             initial="idle"
             whileHover="hover"
             className="glass-panel border-glow-orange/30 p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group cursor-pointer hover:border-glow-orange/60 transition-all text-left"
           >
              <div className="absolute inset-0 bg-[url('/images/sections/forest.jpg')] bg-cover opacity-20 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-glow flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 shadow-[0_0_20px_rgba(255,87,34,0.3)]">
                       <TreePine className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight whitespace-pre-line">{t("impactpage.tree.title")}</h3>
                    <p className="text-sm text-white/70 italic mb-8 border-l-2 border-glow-orange pl-4">{t("impactpage.tree.subtitle")}</p>
                 </div>
                 
                 <div className="space-y-4 font-medium text-white/90 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-sm md:text-base">
                    <p className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-glow-orange" />{t("impactpage.tree.item1")}</p>
                    <p className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-glow-orange" />{t("impactpage.tree.item2")}</p>
                    <p className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-glow-orange" />{t("impactpage.tree.item3")}</p>
                    <p className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-glow-orange" />{t("impactpage.tree.item4")}</p>
                 </div>
              </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
}
