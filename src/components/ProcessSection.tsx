import { Recycle, Cpu, Scissors, Package, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { scrollReveal, staggerContainer, hoverCard } from "../lib/motion";

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Recycle,
      step: "01",
      location: t("step1.loc"),
      title: t("step1.title"),
      description: t("step1.desc")
    },
    {
      icon: Cpu,
      step: "02",
      location: t("step2.loc"),
      title: t("step2.title"),
      description: t("step2.desc")
    },
    {
      icon: Scissors,
      step: "03",
      location: t("step3.loc"),
      title: t("step3.title"),
      description: t("step3.desc")
    },
    {
      icon: Package,
      step: "04",
      location: t("step4.loc"),
      title: t("step4.title"),
      description: t("step4.desc")
    }
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-black/40 border-y border-white/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">{t("process.badge")}</span>
          </motion.div>
          <motion.h2 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6 font-bold"
          >
            {t("process.title")}
          </motion.h2>
          <motion.p 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t("process.desc")}
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-24"
        >
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              variants={hoverCard}
              initial="idle"
              whileHover="hover"
              className="p-8 sm:p-10 glass-card relative overflow-hidden group text-left"
            >
              <div className="absolute -top-4 -right-4 text-[10rem] font-black text-white/5 select-none pointer-events-none group-hover:text-glow-orange/10 transition-colors leading-none font-heading italic">
                {item.step}
              </div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-glow-orange group-hover:bg-gradient-glow group-hover:text-white transition-all shrink-0">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-glow-orange uppercase font-black mb-1">{item.location}</p>
                    <h3 className="text-2xl font-heading text-white font-bold leading-tight">{item.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-video relative z-10 border border-white/10">
              <img 
                src="/images/sections/ai-tech.jpg" 
                alt="AI Technology"
                className="w-full h-full object-cover mix-blend-luminosity opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-glow-orange/20 to-transparent mix-blend-overlay" />
            </div>
            <div className="absolute -inset-4 border border-glow-orange/20 rounded-[2.5rem] -z-10" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3 className="text-3xl md:text-4xl font-heading text-white mb-6 font-bold leading-tight">{t("process.ai_intel")}</h3>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed italic border-l-2 border-white/20 pl-4">
              {t("process.ai_quote")}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-card group hover:border-glow-orange/50 transition-all">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-glow-orange to-glow-pink transition-all">35%</p>
                <p className="text-[10px] font-mono tracking-widest uppercase font-black text-glow-orange">{t("process.faster_sorting")}</p>
              </div>
              <div className="p-6 rounded-2xl glass-card group hover:border-glow-orange/50 transition-all">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-glow-orange to-glow-pink transition-all">40%</p>
                <p className="text-[10px] font-mono tracking-widest uppercase font-black text-glow-orange">{t("process.lower_rejection")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
