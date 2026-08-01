import { type Variants } from 'framer-motion';

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const hoverCard: Variants = {
  idle: { scale: 1, y: 0, boxShadow: "0 10px 30px -10px rgba(0,0,0,0)" },
  hover: { 
    scale: 1.02, 
    y: -5,
    boxShadow: "0 20px 40px -10px rgba(255, 123, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const hoverGlowButton: Variants = {
  idle: { scale: 1, boxShadow: "0 0 0px rgba(255, 123, 0, 0)" },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 20px rgba(255, 123, 0, 0.4)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};
