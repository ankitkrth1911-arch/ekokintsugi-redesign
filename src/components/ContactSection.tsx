import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { scrollReveal, hoverGlowButton } from "../lib/motion";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-16 md:mb-24 text-center">
          <motion.div 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-xs font-mono font-bold tracking-widest text-glow-orange uppercase">{t("contactsection.badge")}</span>
          </motion.div>
          <motion.h2 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading text-white font-bold mb-6"
          >
            {t("contactsection.title")}
          </motion.h2>
          <motion.p 
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed"
          >
            {t("contactsection.desc")}
          </motion.p>
        </header>

        <motion.div 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-panel p-8 sm:p-12 md:p-16 flex flex-col md:flex-row gap-12 md:gap-20 relative border-glow-orange/20"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-glow-orange/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />

          <div className="flex-1 relative z-10 space-y-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white leading-tight">{t("contactsection.together")}</h3>
              <p className="text-base text-muted-foreground italic border-l-2 border-glow-orange pl-4">{t("contactsection.invite")}</p>
            </div>

            <ul className="space-y-6">
              {[
                t("contactsection.item1"),
                t("contactsection.item2"),
                t("contactsection.item3"),
                t("contactsection.item4")
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-sm sm:text-base font-medium border-b border-white/10 pb-4 text-white/80"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-glow-orange shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground text-xs font-mono mt-8 leading-relaxed">
              {t("contactsection.respect")}
            </p>
          </div>

          <div className="flex-1 relative z-10 w-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl mx-auto md:mx-0">
            <h3 className="text-2xl font-heading font-bold mb-8 text-white">{t("contactsection.reach")}</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <MapPin className="text-glow-orange mt-1 w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold text-white text-sm sm:text-base">{t("contact.hub")} Head Office</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">326-C SpaceGreen, Shastripuram<br/>Agra UP INDIA</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-glow-orange w-5 h-5 shrink-0" />
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{t("contact.speak")}</p>
                  <p className="font-bold text-white text-sm sm:text-base">+91 9359546639</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-glow-orange w-5 h-5 shrink-0" />
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{t("contact.digital")}</p>
                  <p className="font-bold text-white text-sm sm:text-base">Dushyant Singh</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder={t("contact.form.placeholder_name")} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-glow-orange transition-colors" />
              <input type="email" placeholder="example@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-glow-orange transition-colors" />
              <motion.button 
                variants={hoverGlowButton}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                type="submit" 
                className="w-full bg-gradient-glow text-white rounded-full py-4 text-[10px] font-mono tracking-widest uppercase font-black shadow-lg"
              >
                {t("contactsection.form.btn")}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
