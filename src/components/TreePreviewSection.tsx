import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useEffect, useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { motion } from "framer-motion";
import { scrollReveal, hoverGlowButton } from "../lib/motion";
import { Sparkles } from "lucide-react";

export default function TreePreviewSection() {
  const { session, user } = useAuth();
  const [treeCount, setTreeCount] = useState(4);
  const { t } = useLanguage();

  useEffect(() => {
    if (!user) {
      setTreeCount(4);
      return;
    }
    const controller = new AbortController();
    fetch("/api/impact", {
      signal: controller.signal,
      headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : undefined
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.treeCount === "number") {
          setTreeCount(data.treeCount);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [user, session?.access_token]);

  return (
    <section className="py-24 md:py-32 bg-black/40 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6">
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">{t("tree.preview.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">{t("dashboard.tree.title")}</h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground italic leading-relaxed">
            {t("tree.preview.desc")}
          </p>
        </motion.div>

        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-3 space-y-8">
            <div className="glass-card p-4 rounded-3xl aspect-video relative overflow-hidden group">
              <img src="/images/sections/reforestation-map.jpg" alt="Reforestation map" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-x-5 bottom-5 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 font-mono text-[10px] tracking-widest text-glow-orange uppercase font-bold flex items-center justify-between">
                <span>{user ? t("dashboard.tree.map_live") : t("dashboard.tree.map_demo")}</span>
                <div className="w-2 h-2 rounded-full bg-glow-orange animate-pulse" />
              </div>
            </div>

            <div className="glass-card p-8 sm:p-10 rounded-3xl text-left">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">{t("dashboard.tree.stats_title")}</h3>
                  <p className="text-sm font-mono text-glow-orange font-bold mt-1">{t("dashboard.tree.allocated")}: {treeCount}</p>
                </div>
                <div className="bg-glow-orange/20 border border-glow-orange/30 px-4 py-2 rounded-full text-glow-orange text-[10px] font-black uppercase tracking-widest w-fit">
                  {t("dashboard.tree.active_growth")}
                </div>
              </div>

              <div className="flex justify-between items-end gap-2 h-24">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <div
                    key={value}
                    className={`flex-1 rounded-t-lg transition-all duration-1000 ${value <= Math.min(treeCount, 10) ? "bg-gradient-to-t from-glow-orange to-glow-pink" : "bg-white/10"}`}
                    style={{ height: `${value * 10}%` }}
                  />
                ))}
              </div>

              <p className="text-center mt-6 text-xs font-mono text-muted-foreground uppercase font-bold tracking-widest">
                {treeCount > 0 ? t("dashboard.tree.factor_healthy") : t("dashboard.tree.factor_awaiting")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video lg:aspect-[3/4] glass-card rounded-3xl flex items-center justify-center overflow-hidden relative">
              <img src="/images/sections/forest.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 hover:mix-blend-normal hover:opacity-100 transition-all duration-700" alt="Tree canopy" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
            </div>

            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden text-left border-glow-orange/30">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-glow-orange/20 blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-black mb-4">{t("tree.preview.sub")}</p>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">{t("tree.preview.dpp")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  {t("tree.preview.desc")}
                </p>
                <motion.div variants={hoverGlowButton} initial="idle" whileHover="hover" whileTap="tap">
                  <Link
                    to="/?impact=open"
                    className="inline-flex rounded-full bg-gradient-glow px-8 py-4 text-xs font-mono uppercase tracking-widest font-black text-white w-full sm:w-auto justify-center"
                  >
                    {t("tree.preview.btn")}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
