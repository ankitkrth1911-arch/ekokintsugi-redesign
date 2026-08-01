import { motion } from "framer-motion";
import { Cpu, Repeat, MapPin, Truck, CheckCircle2, Sparkles } from "lucide-react";
import { scrollReveal, hoverCard } from "../lib/motion";

export default function ProcessPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden text-left">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-glow-orange/10 blur-[150px] pointer-events-none rounded-full -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24 text-center">
          <motion.div 
            variants={scrollReveal}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-glow-orange" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-glow-orange uppercase">Operational Architecture</span>
          </motion.div>
          <motion.h1 
            variants={scrollReveal}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-heading text-white font-bold text-center mb-6"
          >
            Dual-State Efficiency.
          </motion.h1>
          <motion.p 
            variants={scrollReveal}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted-foreground italic text-center max-w-3xl mx-auto leading-relaxed"
          >
            A hybrid model that unlocks government subsidies, guarantees the lowest cost per pair, and ensures high quality consistency across India.
          </motion.p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-24">
          <motion.div 
            variants={hoverCard}
            initial="idle"
            whileHover="hover"
            className="p-8 sm:p-12 glass-card rounded-[2.5rem] relative overflow-hidden group cursor-pointer hover:border-glow-orange/30 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-glow-orange/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-glow-orange/20 group-hover:border-glow-orange/30">
              <MapPin className="text-glow-orange w-8 h-8" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-3">Jharkhand</h3>
            <p className="text-glow-orange font-mono text-[10px] font-bold tracking-widest uppercase mb-10">Processing & Recycling</p>
            
            <ul className="space-y-5 font-sans text-muted-foreground text-sm flex flex-col">
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-white/50 shrink-0 group-hover:text-glow-orange transition-colors" /> Waste sorting</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-white/50 shrink-0 group-hover:text-glow-orange transition-colors" /> Removal of contaminants</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-white/50 shrink-0 group-hover:text-glow-orange transition-colors" /> Leather mince conversion</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-white/50 shrink-0 group-hover:text-glow-orange transition-colors" /> Recycled mosaic sheet creation</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-white/50 shrink-0 group-hover:text-glow-orange transition-colors" /> Tribal workforce empowerment</li>
            </ul>
             <div className="mt-10 border-t border-white/10 pt-6">
              <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/10">Lead Time: 30 Days</span>
            </div>
          </motion.div>

          <motion.div 
            variants={hoverCard}
            initial="idle"
            whileHover="hover"
            className="p-8 sm:p-12 glass-panel rounded-[2.5rem] relative overflow-hidden group cursor-pointer border-glow-orange/20 hover:border-glow-orange/50 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-glow-pink/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-glow flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
              <MapPin className="text-white w-8 h-8" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-3">Uttar Pradesh</h3>
            <p className="text-glow-orange font-mono text-[10px] font-bold tracking-widest uppercase mb-10">Cutting, Assembly & Export</p>
            
            <ul className="space-y-5 font-sans text-muted-foreground text-sm flex flex-col">
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-glow-orange shrink-0" /> Upper construction</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-glow-orange shrink-0" /> Sole assembly</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-glow-orange shrink-0" /> Stitching</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-glow-orange shrink-0" /> Packaging</li>
              <li className="flex gap-4 items-center"><CheckCircle2 className="w-5 h-5 text-glow-orange shrink-0" /> Export documentation & logistics</li>
            </ul>
            <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-white/80 bg-white/5 px-4 py-2 rounded-full border border-white/10">Lead Time: 30 Days</span>
              <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-glow-orange flex items-center gap-2 bg-glow-orange/10 border border-glow-orange/30 px-4 py-2 rounded-full"><Truck className="w-3.5 h-3.5"/> Transport: 45 Days</span>
            </div>
          </motion.div>
        </div>

        <motion.section 
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-panel p-8 sm:p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-glow-orange/5 to-transparent pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-16 flex items-center justify-center gap-4 relative z-10">
            <Cpu className="w-10 h-10 text-glow-orange" /> The Technology Advantage
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
             {[
               { title: "AI-powered QC", desc: "Automating visual quality metrics for European compliance." },
               { title: "AI Waste Sorting", desc: "Predicting yields and enabling contaminant elimination algorithms." },
               { title: "Material Dashboard", desc: "Intelligent analytics for transparent closed-loop tracking." },
               { title: "DPP Ready", desc: "Built straight into the database for the 2026 Passport mandates." },
               { title: "Yield Analytics", desc: "Production forecasting down to the gram." },
               { title: "EU Exclusive", desc: "Exclusive technology access tailored for Taleco Handles GmbH." }
              ].map((tech, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="p-6 md:p-8 rounded-[2rem] bg-black/40 backdrop-blur-sm border border-white/10 hover:border-glow-orange/50 transition-all duration-300 group cursor-pointer text-left shadow-lg relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-glow-orange/5 rounded-full blur-[40px] -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <h4 className="font-bold text-white font-mono text-sm tracking-wide mb-3 flex items-center gap-3 relative z-10">
                     <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                       <Repeat className="w-3 h-3 text-glow-orange transition-transform duration-500 group-hover:rotate-180" />
                     </div>
                     {tech.title}
                   </h4>
                   <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed relative z-10">{tech.desc}</p>
                </motion.div>
              ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
