import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { hoverGlowButton, scrollReveal } from "../lib/motion";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const slides = [
    {
      id: 1,
      tag: t("hero.slide1.tag"),
      title: t("hero.slide1.title"),
      description: t("hero.slide1.desc"),
      image: "/images/hero/hero-1.jpg",
      actionText: t("hero.slide1.btn"),
      tagline: t("hero.slide1.tagline")
    },
    {
      id: 2,
      tag: t("hero.slide2.tag"),
      title: t("hero.slide2.title"),
      description: t("hero.slide2.desc"),
      image: "/images/products/wallet-zip.jpg",
      actionText: t("hero.slide2.btn"),
      tagline: t("hero.slide2.tagline")
    },
    {
      id: 3,
      tag: t("hero.slide3.tag"),
      title: t("hero.slide3.title"),
      description: t("hero.slide3.desc"),
      image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/indigo-floral-ballet-flats.jpeg",
      actionText: t("hero.slide3.btn"),
      tagline: t("hero.slide3.tagline")
    },
    {
      id: 4,
      tag: t("hero.slide4.tag"),
      title: t("hero.slide4.title"),
      description: t("hero.slide4.desc"),
      image: "/images/products/signature-sneaker.jpg",
      actionText: t("hero.slide4.btn"),
      tagline: t("hero.slide4.tagline")
    }
  ];

  useEffect(() => {
    if (isAutoplayPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoplayPaused, slides.length]);

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <motion.section 
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16"
    >
      <div 
        onMouseEnter={() => setIsAutoplayPaused(true)} 
        onMouseLeave={() => setIsAutoplayPaused(false)}
        className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden glass-panel group"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
              style={{ backgroundImage: `url(${slides[index].image})` }}
            />
            {/* Deep glow gradients for SaaS look */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <Sparkles className="w-4 h-4 text-glow-orange" />
                <span className="text-xs font-mono tracking-widest uppercase text-glow-orange font-bold">
                  {slides[index].tag}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight tracking-tight"
              >
                {slides[index].title.split(' ')[0]}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-orange to-glow-pink">
                  {slides[index].title.split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed line-clamp-3 md:line-clamp-none"
              >
                {slides[index].description}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6"
              >
                <motion.button 
                  variants={hoverGlowButton}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => navigate('/products')}
                  className="bg-gradient-glow text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg"
                >
                  {slides[index].actionText}
                </motion.button>
                <span className="hidden md:flex text-xs font-mono tracking-widest text-white/50 uppercase font-bold items-center gap-2">
                  {slides[index].tagline}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-glow-orange transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-glow-orange transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }} className="group flex flex-col items-center">
              <div className="w-12 h-1 rounded-full bg-white/20 mb-2 relative overflow-hidden">
                {i === index && (
                  <motion.div
                    key={`${index}-${isAutoplayPaused}`}
                    initial={{ width: 0 }}
                    animate={{ width: isAutoplayPaused ? "0%" : "100%" }}
                    transition={{ duration: isAutoplayPaused ? 0 : 4, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-glow-orange"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
