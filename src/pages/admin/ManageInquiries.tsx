import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Mail, Phone, MoreVertical, Eye, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/enquiries', { credentials: 'same-origin' });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!mounted) return;
        setInquiries(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(`Status updated to ${newStatus}`);
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE', credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to delete');
      setInquiries(prev => prev.filter(i => i.id !== id));
      toast.success('Inquiry deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete inquiry');
    }
  };

  if (loading) return <div className="p-8 text-center font-display uppercase tracking-widest text-brand-green-forest/40">Loading Ledger Data...</div>;

  return (
    <div className="bg-white border border-brand-green-forest/5 shadow-sm rounded-none overflow-hidden">
      <Table>
        <TableHeader className="bg-brand-beige/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Contact Detail</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Organization</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Product Interest</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Inquiry Message</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Status</TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-brand-green-deep pr-8 text-brand-gold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-brand-green-deep/30">No inquiries received yet.</TableCell>
            </TableRow>
          )}
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} className="hover:bg-brand-beige/20 transition-colors">
              <TableCell>
                 <div className="flex flex-col">
                    <span className="font-semibold text-brand-green-deep">{inquiry.full_name || inquiry.name}</span>
                    <span className="text-[10px] text-brand-green-deep/40 flex items-center gap-1">
                       <Mail className="w-2.5 h-2.5" /> {inquiry.email}
                    </span>
                    <span className="text-[10px] text-brand-green-deep/40 flex items-center gap-1">
                       <Phone className="w-2.5 h-2.5" /> {inquiry.phone || 'N/A'}
                    </span>
                 </div>
              </TableCell>
              <TableCell>
                 <div className="flex flex-col">
                    <span className="text-sm font-medium">{inquiry.organization || inquiry.company || 'N/A'}</span>
                    <span className="text-[9px] font-bold uppercase text-brand-gold tracking-widest">{inquiry.country || 'N/A'}</span>
                 </div>
              </TableCell>
              <TableCell>
                  <Badge variant="outline" className="rounded-none border-brand-green-forest/10 text-[9px] uppercase tracking-widest font-bold">
                    {inquiry.product_interest || inquiry.productInterest || 'General'}
                  </Badge>
              </TableCell>
              <TableCell className="max-w-[300px]">
                 <p className="text-xs text-brand-green-deep/60 line-clamp-2">"{inquiry.message || inquiry.message_text || ''}"</p>
              </TableCell>
              <TableCell>
                 <Badge 
                    className={`rounded-none text-[9px] uppercase tracking-widest font-bold ${
                       inquiry.status === 'New' ? "bg-red-100 text-red-700 hover:bg-red-100" :
                       inquiry.status === 'Contacted' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                       "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    }`}
                 >
                   {inquiry.status}
                 </Badge>
              </TableCell>
              <TableCell className="text-right pr-8">
                 <DropdownMenu>
                    <DropdownMenuTrigger>
                       <Button variant="ghost" className="h-8 w-8 p-0 text-brand-green-deep/40">
                          <MoreVertical className="h-5 w-5" />
                       </Button>
                    </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-brand-green-forest/10 rounded-none w-40">
                        <DropdownMenuItem onClick={() => setSelectedInquiry(inquiry)} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer">
                          <Eye className="w-3.5 h-3.5" /> View Details
                        </DropdownMenuItem>
                        {inquiry.status !== 'Contacted' && (
                          <DropdownMenuItem onClick={() => updateStatus(inquiry.id, 'Contacted')} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer">
                            <Mail className="w-3.5 h-3.5" /> Mark Contacted
                          </DropdownMenuItem>
                        )}
                        {inquiry.status !== 'Closed' && (
                          <DropdownMenuItem onClick={() => updateStatus(inquiry.id, 'Closed')} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer">
                            <CheckCircle className="w-3.5 h-3.5" /> Mark Closed
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => deleteInquiry(inquiry.id)} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer text-red-600">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                 </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Inquiry Detail Modal */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="max-w-xl rounded-none border-brand-green-forest/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-display uppercase tracking-widest text-brand-green-deep border-b pb-4">
              Inquiry Details
            </DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-1">Name</span> {selectedInquiry.full_name || selectedInquiry.name}</div>
                <div><span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-1">Organization</span> {selectedInquiry.organization || selectedInquiry.company || 'N/A'}</div>
                <div><span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-1">Email</span> {selectedInquiry.email}</div>
                <div><span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-1">Phone</span> {selectedInquiry.phone || 'N/A'}</div>
                <div><span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-1">Country</span> {selectedInquiry.country || 'N/A'}</div>
                <div><span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-1">Date</span> {new Date(selectedInquiry.created_at).toLocaleString()}</div>
                <div className="col-span-2"><span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-1">Product Interest</span> {selectedInquiry.product_interest || selectedInquiry.productInterest || 'General'}</div>
              </div>
              <div>
                <span className="font-bold text-xs uppercase tracking-widest text-brand-green-deep/60 block mb-2">Message</span>
                <div className="bg-brand-beige/20 p-4 border border-brand-green-forest/10 text-sm whitespace-pre-wrap">
                  {selectedInquiry.message || selectedInquiry.message_text || 'No message provided.'}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                {selectedInquiry.status !== 'Contacted' && <Button onClick={() => { updateStatus(selectedInquiry.id, 'Contacted'); setSelectedInquiry(null); }} className="rounded-none uppercase text-xs tracking-widest">Mark Contacted</Button>}
                {selectedInquiry.status !== 'Closed' && <Button onClick={() => { updateStatus(selectedInquiry.id, 'Closed'); setSelectedInquiry(null); }} variant="outline" className="rounded-none uppercase text-xs tracking-widest border-brand-green-forest text-brand-green-forest">Mark Closed</Button>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
