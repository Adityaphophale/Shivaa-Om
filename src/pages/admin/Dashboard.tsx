import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  TrendingUp,
  Users,
  Settings,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Dashboard Sub-pages
import DashboardHome from "./DashboardHome";
import ManageInquiries from "./ManageInquiries";
import ManageProducts from "./ManageProducts";
import ManageBlogs from "./ManageBlogs";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
        if (!mounted) return;
        if (!res.ok) {
          setIsAdmin(false);
          navigate('/admin/login');
          return;
        }
        const body = await res.json();
        if (body.authenticated) setIsAdmin(true); else { setIsAdmin(false); navigate('/admin/login'); }
      } catch (err) {
        setIsAdmin(false);
        navigate('/admin/login');
      }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    toast.success("Logged out successfully.");
    navigate("/");
  };

  if (isAdmin === null) return <div className="h-screen flex items-center justify-center font-display uppercase tracking-widest text-brand-green-forest animate-pulse">Authenticating...</div>;

  const NAV_ITEMS = [
    { name: "Overview", icon: LayoutDashboard, path: "/admin" },
    { name: "Inquiries", icon: MessageSquare, path: "/admin/inquiries" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Blog Posts", icon: FileText, path: "/admin/blogs" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-brand-beige overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-brand-green-deep text-white transition-all duration-500 flex flex-col ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
           {sidebarOpen && <span className="font-display font-bold text-sm tracking-widest text-brand-gold">ADMIN PANEL</span>}
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-brand-gold">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 mx-auto" />}
           </button>
        </div>
        
        <nav className="flex-grow py-8 px-4 space-y-2">
           {NAV_ITEMS.map((item) => (
             <Link
               key={item.path}
               to={item.path}
               className={`flex items-center gap-4 p-3 rounded-lg transition-all group ${
                 location.pathname === item.path ? "bg-brand-gold text-brand-green-deep" : "hover:bg-white/5 text-brand-off-white/60"
               }`}
             >
               <item.icon className="w-5 h-5 shrink-0" />
               {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
             </Link>
           ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-4 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
           >
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Logout System</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
         <header className="h-20 bg-white border-b border-brand-green-forest/5 px-8 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
               <h2 className="text-lg font-display font-medium text-brand-green-forest uppercase tracking-widest">
                  {NAV_ITEMS.find(i => i.path === location.pathname)?.name || "Dashboard"}
               </h2>
            </div>
            <div className="flex items-center gap-6">
               <div className="relative">
                  <Bell className="w-5 h-5 text-brand-green-forest" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full" />
               </div>
               <div className="flex items-center gap-3 border-l pl-6 border-brand-green-forest/10">
                  <div className="w-10 h-10 bg-brand-green-forest flex items-center justify-center rounded-full text-brand-gold font-bold">P</div>
                  <div className="hidden md:block">
                     <p className="text-xs font-bold text-brand-green-deep">Praatik M.</p>
                     <p className="text-[10px] text-brand-green-deep/40 font-semibold uppercase tracking-wider">Director</p>
                  </div>
               </div>
            </div>
         </header>

        <div className="p-8 pb-24">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/inquiries" element={<ManageInquiries />} />
            <Route path="/products" element={<ManageProducts />} />
            <Route path="/blogs" element={<ManageBlogs />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
