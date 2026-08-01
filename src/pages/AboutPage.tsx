import { motion } from "framer-motion";
import { Handshake, Target, Globe, ShieldCheck, QrCode, Download, Sparkles } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { scrollReveal, hoverCard } from "../lib/motion";

export default function AboutPage() {
  const { t } = useLanguage();

  const qrPattern = [
    "111111101111111",
    "100000101000001",
    "101110101011101",
    "101110101011101",
    "101110101011101",
    "100000101000001",
    "111111101111111",
    "000000000000000",
    "110011000110011",
    "001100111001100",
    "111001001001111",
    "001111000111100",
    "110000111000011",
    "100000101000001",
    "111111101111111"
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden text-left">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-glow-pink/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6">
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">{t("aboutpage.badge")}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading text-white font-bold mb-6">{t("aboutpage.title")}</h1>
          <p className="text-xl text-muted-foreground italic">
            {t("aboutpage.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          <motion.div 
            variants={hoverCard}
            initial="idle"
            whileHover="hover"
            className="p-8 sm:p-12 glass-panel rounded-[2.5rem] relative overflow-hidden group cursor-pointer border-glow-orange/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-glow-orange/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
            <Target className="w-12 h-12 text-glow-orange mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            <h2 className="text-3xl font-heading font-bold mb-4 text-white">{t("aboutpage.mission.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("aboutpage.mission.desc")}
            </p>
          </motion.div>

          <motion.div 
            variants={hoverCard}
            initial="idle"
            whileHover="hover"
            className="p-8 sm:p-12 glass-card rounded-[2.5rem] relative overflow-hidden group cursor-pointer hover:border-white/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150 group-hover:bg-white/10" />
            <Globe className="w-12 h-12 text-white mb-8 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110" />
            <h2 className="text-3xl font-heading font-bold text-white mb-4">{t("aboutpage.vision.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("aboutpage.vision.desc")}
            </p>
          </motion.div>
        </div>

        <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-heading text-white font-bold mb-6">{t("aboutpage.focus.title")}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t("aboutpage.focus.desc")}
            </p>
          </div>

          <div className="glass-panel border-white/10 rounded-[2.5rem] p-8 sm:p-12 overflow-hidden shadow-2xl relative text-left">
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-pink/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />
            
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-10 text-center flex items-center justify-center gap-4 relative z-10">
              <Handshake className="text-glow-orange shrink-0" /> {t("aboutpage.partnership.title")}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-10 items-stretch bg-black/40 border border-white/10 p-8 sm:p-10 rounded-3xl relative z-10 backdrop-blur-xl">
              <div>
                <h4 className="font-bold text-white mb-6 text-lg tracking-wide">{t("aboutpage.strengths.title")}</h4>
                <ul className="space-y-4 font-mono text-sm text-muted-foreground">
                  {[
                    { label: t("strength.circular"), icon: ShieldCheck, color: "text-glow-orange" },
                    { label: t("strength.qc"), icon: ShieldCheck, color: "text-glow-orange" },
                    { label: t("strength.cost"), icon: ShieldCheck, color: "text-glow-orange" },
                    { label: t("strength.esg"), icon: ShieldCheck, color: "text-glow-orange" },
                    { label: t("strength.manufacturing"), icon: ShieldCheck, color: "text-glow-orange" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 group/li hover:text-white transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/li:scale-110 group-hover/li:rotate-12">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 md:border-t-0 md:border-l pt-8 md:pt-0 pl-0 md:pl-10">
                <h4 className="font-bold text-white mb-6 text-lg tracking-wide">{t("aboutpage.partners.title")}</h4>
                <ul className="space-y-4 font-mono text-sm text-muted-foreground">
                  {[
                    { label: t("partner.dist"), icon: Globe, color: "text-white/70" },
                    { label: t("partner.insights"), icon: Globe, color: "text-white/70" },
                    { label: t("partner.trust"), icon: Globe, color: "text-white/70" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 group/li hover:text-white transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/li:scale-110 group-hover/li:rotate-12">
                        <item.icon className={`w-4 h-4 ${item.color} group-hover/li:text-white`} />
                      </div>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden group">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10 text-center lg:text-left">
              <div className="flex-1 w-full">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-glow-orange uppercase">{t("aboutpage.qr.badge")}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">{t("aboutpage.qr.title")}</h3>
                <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {t("aboutpage.qr.desc")}
                </p>
                <div className="inline-flex items-center gap-3 rounded-full bg-gradient-glow text-white px-8 py-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 group/btn">
                  <Download className="w-4 h-4 transition-transform duration-500 group-hover/btn:-translate-y-1" />
                  <span className="font-mono text-xs tracking-widest uppercase font-bold">{t("aboutpage.qr.btn")}</span>
                </div>
                <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-white/40">
                  {t("aboutpage.qr.placeholder")}
                </p>
              </div>

              <div className="shrink-0 bg-white/5 border border-white/10 rounded-[2rem] p-6 transition-all duration-500 group-hover:bg-white/10 group-hover:border-glow-orange/30 mx-auto backdrop-blur-md">
                <div className="bg-white rounded-2xl p-5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
                  <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[2px] w-[200px] h-[200px]">
                    {qrPattern.flatMap((row, rowIndex) =>
                      row.split("").map((cell, cellIndex) => (
                        <div
                          key={`${rowIndex}-${cellIndex}`}
                          className={cell === "1" ? "bg-black rounded-[2px]" : "bg-transparent"}
                        />
                      ))
                    )}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <QrCode className="w-5 h-5 text-glow-orange transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-white">{t("aboutpage.qr.demo")}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
