import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { 
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Dashboard Sub-pages
import ManageInquiries from "./ManageInquiries";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'same-origin' });
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
      const API_URL = import.meta.env.VITE_API_URL || '';
      await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error(err);
    }
    toast.success("Logged out successfully.");
    navigate("/");
  };

  if (isAdmin === null) return <div className="h-screen flex items-center justify-center font-display uppercase tracking-widest text-brand-green-forest animate-pulse">Authenticating...</div>;

  return (
    <div className="flex flex-col h-screen bg-brand-beige overflow-hidden">
      {/* Top Header */}
      <header className="bg-brand-green-deep text-white flex-shrink-0 z-50 relative">
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
          <div className="flex-1"></div>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-display font-bold text-sm tracking-widest text-brand-gold">ADMIN PANEL</span>
          </div>

          <div className="flex-1 flex justify-end">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-8 pb-24">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/inquiries" replace />} />
          <Route path="/inquiries" element={<ManageInquiries />} />
        </Routes>
      </main>
    </div>
  );
}
