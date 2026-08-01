import { TrendingDown, Leaf, Users, Award, Rocket, Scale, Sprout, CircleCheckBig, Globe2, Landmark, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { hoverCard, scrollReveal } from "../lib/motion";

function CertificationLogo({ mark, accent, icon: Icon }: { mark: string; accent: string; icon: typeof Globe2 }) {
  return (
    <div className="flex items-center gap-3 text-white">
      <Icon className="w-6 h-6 text-glow-orange shrink-0" strokeWidth={1.8} />
      <div className="leading-none text-left">
        <div className="font-mono text-[9px] tracking-[0.38em] uppercase text-white/50">
          {accent}
        </div>
        <div className="font-heading text-xl font-bold tracking-widest text-white/90">
          {mark}
        </div>
      </div>
    </div>
  );
}

export default function ImpactSection() {
  const { t } = useLanguage();

  const metrics = [
    { icon: TrendingDown, value: "5.3kg", label: t("impactsection.metrics.co2"), desc: t("impactsection.metrics.co2_desc") },
    { icon: Leaf, value: "70%", label: t("impactsection.metrics.circular"), desc: t("impactsection.metrics.circular_desc") },
    { icon: Users, value: "500+", label: t("impactsection.metrics.artisans"), desc: t("impactsection.metrics.artisans_desc") },
    { icon: Award, value: "100%", label: t("impactsection.metrics.traceable"), desc: t("impactsection.metrics.traceable_desc") }
  ];

  const certs = [
    { title: "EU Digital Product Passport", mark: "DPP", icon: Globe2, accent: "EU", desc: t("impactsection.certs.dpp_desc") },
    { title: "MSME-Udyam Certified", mark: "MSME", icon: Landmark, accent: "UDYAM", desc: t("impactsection.certs.msme_desc") },
    { title: "Startup India Recognized", mark: "SI", icon: Rocket, accent: "INDIA", desc: t("impactsection.certs.startup_desc") },
    { title: "ISO Quality Standards", mark: "ISO", icon: CircleCheckBig, accent: "9001", desc: t("impactsection.certs.iso_desc") },
    { title: "Fair Trade Practices", mark: "FT", icon: Scale, accent: "FAIR", desc: t("impactsection.certs.fair_desc") },
    { title: "Carbon Neutral Operations", mark: "CN", icon: Sprout, accent: "ZERO", desc: t("impactsection.certs.carbon_desc") }
  ];

  return (
    <section id="impact" className="py-24 md:py-32 relative overflow-hidden bg-background border-t border-white/10 text-center">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-glow-orange/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6">
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">{t("impactsection.badge")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            {t("impactsection.title")}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed italic">
            {t("impactsection.desc")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              variants={hoverCard}
              initial="idle"
              whileHover="hover"
              className="p-8 md:p-10 text-center glass-card relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-glow-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="p-4 rounded-[2rem] bg-white/5 border border-white/10 text-glow-orange group-hover:bg-gradient-glow group-hover:text-white transition-all group-hover:rotate-12 group-hover:scale-110">
                    <item.icon className="w-8 h-8 shrink-0" />
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-black font-heading mb-3 tracking-tighter text-white">{item.value}</p>
                <p className="text-sm font-bold mb-4 uppercase tracking-widest text-glow-orange">
                  {item.label}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-8 md:p-16 glass-panel border border-glow-orange/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-glow-pink/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <div className="hidden sm:block h-px flex-1 bg-white/10" />
              <h3 className="text-2xl md:text-3xl font-heading text-center font-bold px-6 leading-tight">{t("impactsection.certs.title")}</h3>
              <div className="hidden sm:block h-px flex-1 bg-white/10" />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {certs.map((cert, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 p-6 rounded-2xl border border-white/5 bg-white/5 group hover:border-glow-orange/30 hover:bg-white/10 transition-all"
                >
                  <div className="shrink-0 group-hover:scale-110 transition-transform">
                    <CertificationLogo mark={cert.mark} accent={cert.accent} icon={cert.icon} />
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] tracking-widest uppercase font-black text-white/80 group-hover:text-glow-orange transition-colors">
                      {cert.title}
                    </span>
                    <span className="block mt-2 text-xs text-muted-foreground italic leading-relaxed">
                      {cert.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
