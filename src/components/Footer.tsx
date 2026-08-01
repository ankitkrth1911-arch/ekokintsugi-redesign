import { Link, useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../lib/productCatalog";
import { useLanguage } from "../lib/LanguageContext";
import SocialLinks from "./SocialLinks";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <footer className="pt-24 pb-12 bg-[#0a0a0f] border-t border-white/10 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-glow-orange opacity-5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          
          <div className="sm:col-span-2">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-2 group">
                <Sparkles className="w-8 h-8 text-glow-orange transition-transform duration-500 group-hover:rotate-180" />
                <span className="text-2xl font-heading font-semibold tracking-wide text-foreground">
                  Eko<span className="text-glow-orange">AI</span>
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
              {t("footer.tagline")}
            </p>
            <SocialLinks className="flex gap-4" />
          </div>

          <div>
            <h4 className="font-semibold text-white text-lg mb-6">{t("footer.quick_links")}</h4>
            <ul className="space-y-4">
              {[
                { name: t("nav.home"), path: "/" },
                { name: t("nav.about"), path: "/about" },
                { name: t("nav.products"), path: "/products" },
                { name: t("nav.process"), path: "/process" },
                { name: t("nav.impact"), path: "/impact" },
                { name: t("nav.contact"), path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-glow-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-lg mb-6">{t("footer.products")}</h4>
            <ul className="space-y-4">
              {[...PRODUCT_CATEGORIES, { slug: "", shortTitle: t("footer.view_all_products") }].map((product) => (
                <li key={product.slug || product.shortTitle}>
                  <button
                    onClick={() => {
                      if (product.slug) {
                        navigate(`/products/category/${product.slug}`);
                      } else {
                        navigate("/products");
                      }
                    }}
                    className="text-sm text-muted-foreground hover:text-glow-orange transition-colors text-left"
                  >
                    {product.shortTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground">
            © {currentYear} EkoKintsugi LLP. {t("footer.copyright")}
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden sm:block">Stay updated</span>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full pl-4 pr-1 py-1">
              <input type="email" placeholder="Email address" className="bg-transparent border-none outline-none text-sm w-40 text-foreground placeholder:text-muted-foreground" />
              <button className="w-8 h-8 rounded-full bg-gradient-to-r from-glow-orange to-glow-pink flex items-center justify-center text-white hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
