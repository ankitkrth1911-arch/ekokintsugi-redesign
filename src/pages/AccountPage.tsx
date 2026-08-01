import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Award, 
  Wallet, 
  LogOut, 
  Calendar, 
  Leaf, 
  Download, 
  QrCode,
  UserRound
} from "lucide-react";

type Order = {
  id: string;
  created_at: string;
  quantity: number;
  total_price: number;
  product: {
    name: string;
    base_price: number;
    category?: string;
    image_url?: string;
  };
};

type ImpactStats = {
  totalCo2: number;
  totalWaste: number;
  treeCount: number;
  credits: number;
};

export default function AccountPage() {
  const { user, displayName, session, signOut, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<ImpactStats>({ totalCo2: 0, totalWaste: 0, treeCount: 0, credits: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const walletSuffix = user?.id?.split("-")[0]?.toUpperCase() ?? "VISITOR";
  const certificateName = displayName || "Artisan Voyager";

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth?mode=signin&next=account");
      return;
    }

    async function loadAccountData() {
      setLoading(true);
      setError("");
      
      try {
        const headers = session?.access_token
          ? { Authorization: `Bearer ${session.access_token}` }
          : undefined;

        const [statsRes, ordersRes] = await Promise.all([
          fetch("/api/impact", { headers }),
          fetch("/api/orders", { headers })
        ]);

        if (!statsRes.ok || !ordersRes.ok) {
          throw new Error("Unable to synchronize with the circular ledger.");
        }

        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();

        setStats({
          totalCo2: Number(statsData.totalCo2 ?? 0),
          totalWaste: Number(statsData.totalWaste ?? 0),
          treeCount: Number(statsData.treeCount ?? 0),
          credits: Number(statsData.credits ?? 0)
        });
        setOrders(ordersData);
      } catch (err: any) {
        setError(err.message || "Failed to load account details.");
      } finally {
        setLoading(false);
      }
    }

    loadAccountData();
  }, [user, authLoading, session?.access_token, navigate]);

  const downloadCertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, "#0a0a0f");
    bgGrad.addColorStop(1, "#15151f");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    ctx.lineWidth = 16;
    ctx.strokeStyle = "#ff5722";
    ctx.strokeRect(20, 20, 1160, 760);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffb347";
    ctx.strokeRect(36, 36, 1128, 728);

    const drawOrnament = (x: number, y: number) => {
      ctx.fillStyle = "#ffb347";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    };
    drawOrnament(36, 36);
    drawOrnament(1164, 36);
    drawOrnament(36, 764);
    drawOrnament(1164, 764);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#ffb347";
    ctx.font = "bold 13px monospace";
    ctx.fillText("OFFICIAL ESG CARBON OFFSET CERTIFICATE", 600, 120);

    ctx.fillStyle = "#ffffff";
    ctx.font = "italic bold 40px Georgia, serif";
    ctx.fillText("Certificate of Environmental Stewardship", 600, 200);

    ctx.fillStyle = "#aaaaaa";
    ctx.font = "16px sans-serif";
    ctx.fillText("This is proudly presented to", 600, 280);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px Georgia, serif";
    ctx.fillText(certificateName, 600, 350);

    ctx.beginPath();
    ctx.moveTo(450, 400);
    ctx.lineTo(750, 400);
    ctx.strokeStyle = "#ff5722";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#cccccc";
    ctx.font = "italic 18px Georgia, serif";
    ctx.fillText("In recognition of the verified diversion of", 600, 440);

    ctx.fillStyle = "#ffb347";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(`${stats.totalCo2.toFixed(1)} KG CO2 & ${stats.totalWaste.toFixed(1)} KG WASTE`, 600, 495);

    ctx.fillStyle = "#cccccc";
    ctx.font = "italic 16px Georgia, serif";
    ctx.fillText("diverted safely from landfills, contributing to organic soil regeneration and reforestation.", 600, 540);

    ctx.fillStyle = "#ff5722";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`OFFICIALLY ASSIGNED PLANTATION RESERVE: ${stats.treeCount} ACTIVE SAPLINGS`, 600, 590);

    ctx.fillStyle = "#777777";
    ctx.font = "11px monospace";
    const serial = `EK-CERT-${(user?.id || "DEMO").substring(0, 8).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    ctx.fillText(`VERIFIED BLOCK ID: ${serial}`, 600, 640);

    ctx.font = "italic 14px Georgia, serif";
    ctx.fillStyle = "#aaaaaa";
    ctx.fillText("EkoKintsugi Audit Committee", 350, 715);
    ctx.fillText("Global Reforestation Initiative", 850, 715);

    ctx.beginPath();
    ctx.moveTo(230, 695);
    ctx.lineTo(470, 695);
    ctx.moveTo(730, 695);
    ctx.lineTo(970, 695);
    ctx.strokeStyle = "#ff5722";
    ctx.lineWidth = 1;
    ctx.stroke();

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `ekokintsugi-esg-certificate.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSignOutClick = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || (loading && !error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
        <span className="w-12 h-12 rounded-full border-4 border-glow-orange border-t-transparent animate-spin" />
        <p className="text-xs font-mono tracking-widest uppercase text-glow-orange font-bold">Synchronizing Circular Vault...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-glow-orange/5 blur-[150px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 space-y-12 md:space-y-20 relative z-10"
      >
        
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-10 border-b border-white/10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-orange/30 bg-glow-orange/10 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-glow-orange uppercase">Premium Member Portal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight">
              My Circular Heritage
            </h1>
            <p className="text-base md:text-lg text-muted-foreground italic max-w-xl">
              Manage your ecological credentials, download certified ESG certificates, and review your circular purchase invoices.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-full text-white backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <UserRound className="w-4 h-4 text-glow-orange" />
              </div>
              <div>
                <p className="text-sm font-heading font-bold leading-none mb-1">{displayName}</p>
                <p className="text-[10px] font-mono opacity-60">Citizen #{walletSuffix}</p>
              </div>
            </div>
            
            <button
              onClick={handleSignOutClick}
              className="p-4 rounded-full border border-white/10 text-muted-foreground hover:text-white hover:border-red-500/50 hover:bg-red-500/20 transition-all bg-white/5 cursor-pointer shadow-lg shrink-0"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {error && (
          <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-3xl text-center max-w-md mx-auto space-y-6">
            <p className="text-red-200 font-mono text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-red-500 text-white font-mono text-xs tracking-widest uppercase font-bold rounded-full hover:bg-red-600 transition-colors"
            >
              Retry Sync
            </button>
          </div>
        )}

        {!error && (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-4">
                <ShoppingBag className="text-glow-orange w-6 h-6" /> Purchase Ledger
              </h2>
              
              <div className="space-y-6">
                <AnimatePresence>
                  {orders.map((order, idx) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className="glass-card p-6 sm:p-8 rounded-[2rem] hover:border-glow-orange/30 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-glow-orange text-xl relative overflow-hidden shrink-0">
                          {order.product.image_url ? (
                            <img src={order.product.image_url} alt={order.product.name} className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
                          ) : (
                            <ShoppingBag className="w-6 h-6" />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-glow-orange">
                            {order.product.category || "Circular Craft"}
                          </span>
                          <h3 className="text-lg sm:text-xl font-heading font-bold text-white leading-tight">{order.product.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-white/50" /> {new Date(order.created_at).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>Qty: {order.quantity}</span>
                            <span>•</span>
                            <span className="bg-white/10 border border-white/10 text-white font-mono text-[9px] px-3 py-1 rounded-full font-bold uppercase shrink-0">
                              Size: {order.size || "One Size"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                        <p className="text-2xl font-heading font-black text-white">${order.total_price.toFixed(2)}</p>
                        <p className="text-[9px] font-mono tracking-widest text-white/40 mt-1 font-bold uppercase">ID: {order.id.split('-')[0].toUpperCase()}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {orders.length === 0 && (
                    <div className="glass-card p-12 sm:p-20 rounded-[2.5rem] text-center space-y-6">
                      <ShoppingBag className="w-12 h-12 text-white/20 mx-auto" />
                      <p className="text-base text-muted-foreground italic">No purchases recorded on this circular credential yet.</p>
                      <button
                        onClick={() => navigate("/products")}
                        className="bg-gradient-glow text-white px-8 py-4 rounded-full text-[10px] font-mono tracking-widest uppercase font-black hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
                      >
                        Explore Products
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-12">
              
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-4">
                  <Wallet className="text-glow-orange w-6 h-6" /> Carbon Wallet
                </h2>
                
                <motion.div 
                  whileHover={{ y: -6 }}
                  className="glass-panel border-glow-orange/30 p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-glow-orange/50 transition-all"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-glow-orange/20 rounded-full blur-[80px] -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-150" />
                  
                  <div className="relative z-10 flex justify-between items-start mb-10">
                    <div>
                      <p className="font-mono text-[9px] tracking-widest uppercase text-glow-orange font-bold mb-3">Available Balance</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-heading font-black text-white">{stats.credits.toFixed(3)}</span>
                        <span className="text-white/50 font-black text-sm tracking-widest uppercase">CC</span>
                      </div>
                    </div>
                    <Wallet className="w-8 h-8 opacity-40 text-glow-orange" />
                  </div>

                  <div className="relative z-10 flex gap-4 border-t border-white/10 pt-6 justify-between items-center bg-black/20 p-4 rounded-2xl">
                    <div>
                      <p className="text-[9px] font-mono tracking-widest uppercase text-white/50 mb-1">Contract Address</p>
                      <p className="text-xs font-mono text-white font-bold tracking-wider">0x71C...9A23{walletSuffix}</p>
                    </div>
                    <QrCode className="w-6 h-6 text-glow-orange opacity-80" />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-4">
                  <Award className="text-glow-orange w-6 h-6" /> Certificates
                </h2>
                
                {stats.totalCo2 > 0 ? (
                  <motion.div 
                     whileHover={{ y: -6 }}
                     className="glass-card p-8 rounded-[2.5rem] group hover:border-white/30 transition-all duration-300 space-y-8"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-glow-orange group-hover:bg-glow-orange/10 group-hover:border-glow-orange/30 transition-all">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-2 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-bold uppercase tracking-widest">
                        <Leaf className="w-3 h-3" /> VERIFIED ESG
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-heading font-bold text-white">Stewardship Certificate</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Acknowledging the verified diversion of <strong className="text-glow-orange">{stats.totalCo2.toFixed(1)} kg CO2</strong> emissions and <strong className="text-white">{stats.totalWaste.toFixed(1)} kg</strong> landfill waste.
                      </p>
                    </div>

                    <button
                      onClick={downloadCertificate}
                      className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/10 border border-white/20 text-white px-6 py-4 font-mono text-[10px] tracking-widest uppercase font-black hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer shadow-lg"
                    >
                      <Download className="w-4 h-4" /> Download Certificate
                    </button>
                  </motion.div>
                ) : (
                  <div className="glass-card p-10 rounded-[2.5rem] text-center space-y-6">
                    <Award className="w-10 h-10 text-white/20 mx-auto" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      Complete checkout purchases to verify carbon offsets and generate certificates.
                    </p>
                  </div>
                )}
              </div>

            </div>
            
          </div>
        )}

      </motion.div>
    </div>
  );
}
