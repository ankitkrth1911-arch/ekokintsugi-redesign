import { Brain, Heart, Earth, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { scrollReveal, hoverCard } from "../lib/motion";

export default function AboutSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t("about.feat_ai_title"),
      description: t("about.feat_ai_desc")
    },
    {
      icon: Heart,
      title: t("about.feat_artisan_title"),
      description: t("about.feat_artisan_desc")
    },
    {
      icon: Earth,
      title: t("about.feat_impact_title"),
      description: t("about.feat_impact_desc")
    },
    {
      icon: Award,
      title: t("about.feat_quality_title"),
      description: t("about.feat_quality_desc")
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-glow-orange/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-8">
              <Sparkles className="w-4 h-4 text-glow-orange" />
              <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">{t("about.badge")}</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
              {t("about.title_part1")} <br />
              {t("about.title_part2")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-orange to-glow-pink">
                {t("about.title_accent")}
              </span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-base md:text-lg mb-12 leading-relaxed">
              <p className="border-l-2 border-glow-orange pl-6 italic text-white/80">
                {t("about.quote")}
              </p>
              <p>
                {t("about.description")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={hoverCard}
                  initial="idle"
                  whileHover="hover"
                  className="p-6 rounded-2xl glass-card flex flex-col gap-4 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-glow-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] border border-white/10 relative z-10">
              <video
  src="/about-workshop.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover dark:mix-blend-luminosity dark:opacity-80"
/>
<div className="absolute inset-0 dark:bg-gradient-to-t dark:from-[#0a0a0f] dark:via-transparent dark:to-transparent" />
            </div>
            
            {/* Ambient glows behind the image */}
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-glow-pink/20 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-glow-orange/20 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
