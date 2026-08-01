import { motion } from 'framer-motion';
import { hoverGlowButton, scrollReveal, hoverCard } from '../lib/motion';

export default function StyleShowcase() {
  return (
    <div className="min-h-screen bg-background text-foreground p-20 flex flex-col items-center justify-center gap-12 relative overflow-hidden">
      
      {/* Background Glow to test blend modes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-glow-orange via-glow-red to-glow-pink blur-[100px] opacity-20 pointer-events-none rounded-full" />

      <motion.div 
        variants={scrollReveal}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl font-bold font-heading mb-4">Design System Showcase</h1>
        <p className="text-muted-foreground">Dark mode, glassmorphism, and warm glows.</p>
      </motion.div>

      <div className="flex gap-12 relative z-10">
        {/* Sample Card */}
        <motion.div
          variants={hoverCard}
          initial="idle"
          whileHover="hover"
          className="glass-card p-8 w-80 flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-glow flex items-center justify-center text-white font-bold">
            AI
          </div>
          <h3 className="text-xl font-bold">Glassmorphism Card</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This card features a subtle backdrop blur, semi-transparent background, and lifts with an orange shadow on hover.
          </p>
        </motion.div>

        {/* Sample Interactive Elements */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 justify-center"
        >
          <motion.button
            variants={hoverGlowButton}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 rounded-full bg-gradient-glow text-white font-semibold flex items-center justify-center gap-2"
          >
            Primary Action
          </motion.button>
          
          <button className="px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-semibold">
            Secondary Action
          </button>
          
          <div className="p-4 glass-panel text-sm text-muted-foreground border-glow-orange/30">
            A deeper glass panel, useful for inputs or code blocks.
          </div>
        </motion.div>
      </div>

    </div>
  );
}
