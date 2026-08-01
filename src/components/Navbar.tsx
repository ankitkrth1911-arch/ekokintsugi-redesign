import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { LogOut, Moon, Sun, UserRound, ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useCart } from "../lib/CartContext";
import { useLanguage } from "../lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { hoverGlowButton } from "../lib/motion";

export default function Navbar({ onImpactClick }: { onImpactClick: () => void }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { totalItems, setCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), path: '/' },
    { name: t("nav.about"), path: '/about' },
    { name: t("nav.products"), path: '/products' },
    { name: t("nav.process"), path: '/process' },
    { name: t("nav.impact"), path: '/impact' },
    { name: t("nav.contact"), path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        
        {/* Left Side: Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group z-50">
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
            <Sparkles className="w-6 h-6 text-glow-orange" />
          </motion.div>
          <span className="text-xl font-heading font-semibold tracking-wide text-foreground">
            Eko<span className="text-glow-orange">AI</span>
          </span>
        </Link>

        {/* Center: Minimalist Nav Links (Desktop only) */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = link.path === "/products"
              ? location.pathname === "/products" || location.pathname.startsWith("/products/")
              : location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-colors hover:text-glow-orange ${isActive ? 'text-glow-orange' : 'text-foreground/80'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-glow-orange"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Control Panel */}
        <div className="flex items-center gap-4 z-50">
          {/* Integrated Preferences Control Pill (Theme + Language) - Desktop only */}
          <div className="hidden lg:flex items-center rounded-full px-3 py-1.5 gap-2 bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setLanguage(language === "en" ? "de" : "en")}
              className="text-[10px] font-mono tracking-wider font-bold transition-colors hover:text-glow-orange"
              title={language === "en" ? "Switch to German" : "Auf Englisch wechseln"}
            >
              <span className={language === "en" ? "text-glow-orange" : ""}>EN</span>
              <span className="text-white/20 mx-1">|</span>
              <span className={language === "de" ? "text-glow-orange" : ""}>DE</span>
            </button>
            <div className="w-px h-3 bg-white/20" />
            <button onClick={toggleTheme} className="hover:text-glow-orange transition-colors">
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Cart Button */}
          {user && (
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-glow-orange transition-colors"
            >
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <motion.span
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute -top-1.5 -right-1.5 bg-glow-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-background shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          )}

          {/* Compact 'My Impact' Action Button */}
          <motion.button 
            variants={hoverGlowButton}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={onImpactClick}
            className="hidden lg:flex items-center text-xs font-semibold px-5 py-2 rounded-full bg-gradient-glow text-white"
          >
            {t("nav.my_impact")}
          </motion.button>

          {/* User Account / Authentication Buttons */}
          {user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/account" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-glow-orange transition-colors">
                <UserRound size={16} />
              </Link>
              <button onClick={signOut} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-glow-orange transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden lg:flex px-5 py-2 rounded-full text-sm font-semibold bg-white text-background hover:bg-glow-orange transition-colors">
              {t("nav.sign_in")}
            </Link>
          )}

          {/* Mobile Hamburger Toggle Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden p-2 text-foreground hover:text-glow-orange transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="absolute top-[105%] left-4 right-4 p-6 glass-panel flex flex-col gap-6 lg:hidden z-40 text-left"
            >
              <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-bold transition-colors ${isActive ? "text-glow-orange" : "text-foreground hover:text-glow-orange"}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase text-muted-foreground">Preferences</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLanguage(language === "en" ? "de" : "en")} className="text-xs font-bold hover:text-glow-orange">
                    {language === "en" ? "EN" : "DE"}
                  </button>
                  <button onClick={toggleTheme} className="hover:text-glow-orange">
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setIsOpen(false); onImpactClick(); }}
                  className="w-full py-3 rounded-full bg-gradient-glow text-white font-bold text-sm"
                >
                  {t("nav.my_impact")}
                </button>
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-full border border-white/10 text-center text-sm font-bold hover:bg-white/5">
                      {t("nav.view_account")}
                    </Link>
                    <button onClick={() => { setIsOpen(false); signOut(); }} className="w-full py-3 rounded-full border border-red-500/50 text-red-500 text-center text-sm font-bold hover:bg-red-500/10">
                      {t("nav.sign_out")}
                    </button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-full bg-white text-background text-center text-sm font-bold">
                    {t("nav.sign_in")}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
