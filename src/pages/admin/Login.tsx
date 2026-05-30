import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ShieldAlert, LogIn, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Login failed');
      }
      toast.success('Welcome back, Admin.');
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-brand-green-forest/10 p-12 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-brand-green-deep rounded-full flex items-center justify-center mx-auto mb-8">
           <ShieldAlert className="w-10 h-10 text-brand-gold" />
        </div>
        <h1 className="text-3xl font-display font-medium mb-4 text-brand-green-deep">Admin Portal</h1>
        <p className="text-brand-green-deep/60 text-sm mb-12">
          Secure access for Shivaa Om Globe Trade administrators only. Unauthorized access attempts are logged.
        </p>
        
        <div className="space-y-3">
          <div className="text-left">
            <Label className="text-[10px] uppercase font-bold text-brand-green-forest/40">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-none" />
          </div>
          <div className="text-left">
            <Label className="text-[10px] uppercase font-bold text-brand-green-forest/40">Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-none" />
          </div>

          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full h-14 bg-brand-green-forest text-white hover:bg-brand-green-deep rounded-none uppercase text-xs font-bold tracking-[0.2em] transition-all gap-3"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Sign In</>}
          </Button>
        </div>

        <div className="mt-8 text-[10px] uppercase tracking-widest text-brand-green-forest/40 font-bold">
           Protected Area · 256-bit Encryption
        </div>
      </motion.div>
    </div>
  );
}
