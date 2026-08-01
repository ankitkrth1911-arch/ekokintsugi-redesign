import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { hoverCard } from "../lib/motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || t("Unable to send your message right now."));
      }

      setSubmitted(true);
      e.currentTarget.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || t("Unable to send your message right now."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-glow-orange/10 blur-[150px] pointer-events-none rounded-full translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-glow-orange uppercase">{t("contact.badge")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading text-white mb-8 font-bold leading-tight">
            {t("contact.title_part1")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-orange to-glow-pink">
              {t("contact.title_accent")}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground italic max-w-2xl mx-auto">
            {t("contact.desc")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 glass-panel border-glow-orange/20 rounded-[2.5rem] relative h-fit group hover:border-glow-orange/40 transition-all duration-300"
          >
            <div className="absolute top-0 right-12 w-20 h-1 bg-gradient-glow rounded-b-full shadow-[0_0_20px_rgba(255,87,34,0.8)]" />
            {!submitted ? (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-white/70 mb-3 font-mono uppercase tracking-widest">{t("contact.form.name")}</label>
                    <input required name="name" type="text" placeholder={t("contact.form.placeholder_name")} className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-glow-orange focus:ring-1 focus:ring-glow-orange outline-none transition-all font-medium text-white placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/70 mb-3 font-mono uppercase tracking-widest">{t("contact.form.email")}</label>
                    <input required name="email" type="email" placeholder="example@email.com" className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-glow-orange focus:ring-1 focus:ring-glow-orange outline-none transition-all font-medium text-white placeholder:text-muted-foreground/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/70 mb-3 font-mono uppercase tracking-widest">{t("contact.form.subject")}</label>
                  <input required name="subject" type="text" placeholder={t("contact.form.placeholder_subject")} className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-glow-orange focus:ring-1 focus:ring-glow-orange outline-none transition-all font-medium text-white placeholder:text-muted-foreground/50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/70 mb-3 font-mono uppercase tracking-widest">{t("contact.form.message")}</label>
                  <textarea required name="message" rows={5} placeholder={t("contact.form.placeholder_message")} className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-glow-orange focus:ring-1 focus:ring-glow-orange outline-none transition-all resize-none font-medium text-white placeholder:text-muted-foreground/50" />
                </div>
                {error && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-medium text-red-200">{error}</p>
                )}
                <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-gradient-glow text-white font-black text-[12px] tracking-widest uppercase rounded-xl flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(255,87,34,0.4)] transition-all group disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer">
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.send")} 
                  <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="inline-flex p-6 bg-glow-orange/10 rounded-full text-glow-orange mb-6">
                  <CheckCircle className="w-16 h-16" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white mb-4">{t("contact.success.title")}</h3>
                <p className="text-base text-muted-foreground italic">{t("contact.success.desc")}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-10 text-[10px] font-black uppercase tracking-widest text-glow-orange border-b border-glow-orange/50 hover:border-glow-orange pb-1 transition-colors cursor-pointer"
                >
                  {t("contact.success.btn")}
                </button>
              </motion.div>
            )}
          </motion.div>

          <div className="flex flex-col gap-10">
            <motion.div variants={hoverCard} initial="idle" whileHover="hover" className="p-8 sm:p-12 glass-panel border-glow-orange/30 rounded-[2.5rem] relative overflow-hidden group hover:border-glow-orange/60 transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-64 h-64 bg-glow-orange/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
              <div className="relative z-10">
                <h3 className="text-3xl font-heading mb-10 font-bold text-white border-l-4 border-glow-orange pl-4">{t("contact.direct")}</h3>
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-glow-orange group-hover:rotate-12 group-hover:bg-glow-orange/10 transition-all shrink-0">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase font-black text-white/50 mb-2">{t("contact.speak")}</p>
                      <a href="tel:+919359546639" className="text-2xl font-heading font-bold text-white hover:text-glow-orange transition-colors">+91 93595 46639</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-glow-orange group-hover:-rotate-12 group-hover:bg-glow-orange/10 transition-all shrink-0">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase font-black text-white/50 mb-2">{t("contact.digital")}</p>
                      <a href="mailto:info@ekokintsugi.com" className="text-xl sm:text-2xl font-heading font-bold text-white hover:text-glow-orange transition-colors break-all">info@ekokintsugi.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={hoverCard} initial="idle" whileHover="hover" className="p-8 sm:p-12 glass-card rounded-[2.5rem] group hover:border-white/30 relative overflow-hidden transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-6 relative z-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 shrink-0 group-hover:bg-white/10">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase font-black text-glow-orange mb-2">{t("contact.hub")}</p>
                  <p className="text-xl sm:text-2xl font-heading text-white leading-tight font-bold whitespace-pre-line">{t("contact.address")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
