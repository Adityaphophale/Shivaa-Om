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
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Mail, Phone, MoreVertical, Eye, Trash2, CheckCircle, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/enquiries`, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/enquiries/${id}/status`, {
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
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/enquiries/${id}`, { method: 'DELETE', credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to delete');
      setInquiries(prev => prev.filter(i => i.id !== id));
      toast.success('Inquiry deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete inquiry');
    }
  };

  const totalEnquiries = inquiries.length;
  const newEnquiries = inquiries.filter(i => i.status === 'New').length;
  const recentEnquiries = inquiries.filter(i => {
    const diff = new Date().getTime() - new Date(i.created_at).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = (i.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (i.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (i.organization?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-8 text-center font-display uppercase tracking-widest text-brand-green-forest/40">Loading Inquiries...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-medium text-brand-green-forest uppercase tracking-widest">Trade Inquiries</h3>
        <p className="text-xs text-brand-green-deep/40 font-semibold uppercase tracking-wider mt-1">Manage quotations and customer requests</p>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-brand-green-forest/10 p-6 flex flex-col justify-center items-center text-center shadow-sm">
           <span className="text-4xl font-display text-brand-green-deep">{totalEnquiries}</span>
           <span className="text-[10px] uppercase tracking-widest font-bold text-brand-green-deep/40 mt-2">Total Enquiries</span>
        </div>
        <div className="bg-brand-green-forest/5 border border-brand-green-forest/10 p-6 flex flex-col justify-center items-center text-center shadow-sm">
           <span className="text-4xl font-display text-brand-green-forest">{newEnquiries}</span>
           <span className="text-[10px] uppercase tracking-widest font-bold text-brand-green-deep/40 mt-2">New Enquiries</span>
        </div>
        <div className="bg-white border border-brand-green-forest/10 p-6 flex flex-col justify-center items-center text-center shadow-sm">
           <span className="text-4xl font-display text-brand-green-deep">{recentEnquiries}</span>
           <span className="text-[10px] uppercase tracking-widest font-bold text-brand-green-deep/40 mt-2">Recent (7 Days)</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 border border-brand-green-forest/5 shadow-sm">
        <div className="relative w-full md:max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-green-deep/40" />
           <Input 
             placeholder="Search by name, email or company..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="pl-10 h-10 rounded-none border-brand-green-forest/10 focus-visible:ring-1 focus-visible:ring-brand-green-forest"
           />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
           <Filter className="w-4 h-4 text-brand-green-deep/40" />
           <select 
             value={statusFilter} 
             onChange={(e) => setStatusFilter(e.target.value)}
             className="h-10 border border-brand-green-forest/10 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green-forest bg-white rounded-none w-full md:w-auto"
           >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
           </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-green-forest/5 shadow-sm rounded-none overflow-hidden">
        <Table>
          <TableHeader className="bg-brand-beige/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Contact Detail</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Organization</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Product Interest</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Date</TableHead>
              <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-brand-green-deep pr-8 text-brand-gold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-brand-green-deep/30 text-sm">No inquiries found.</TableCell>
              </TableRow>
            )}
            {filteredInquiries.map((inquiry) => (
              <TableRow key={inquiry.id} className="hover:bg-brand-beige/20 transition-colors">
                <TableCell>
                   <div className="flex flex-col">
                      <span className="font-semibold text-brand-green-deep">{inquiry.full_name}</span>
                      <span className="text-[10px] text-brand-green-deep/60 flex items-center gap-1 mt-1">
                         <Mail className="w-3 h-3" /> {inquiry.email}
                      </span>
                   </div>
                </TableCell>
                <TableCell>
                   <div className="flex flex-col">
                      <span className="text-sm font-medium">{inquiry.organization || 'N/A'}</span>
                      <span className="text-[9px] font-bold uppercase text-brand-gold tracking-widest mt-1">{inquiry.country || 'N/A'}</span>
                   </div>
                </TableCell>
                <TableCell>
                    <Badge variant="outline" className="rounded-none border-brand-green-forest/10 text-[9px] uppercase tracking-widest font-bold">
                      {inquiry.product_interest || 'General'}
                    </Badge>
                </TableCell>
                <TableCell>
                   <Badge 
                      className={`rounded-none text-[9px] uppercase tracking-widest font-bold ${
                         inquiry.status === 'New' ? "bg-red-100 text-red-700 hover:bg-red-100 border-none" :
                         inquiry.status === 'Contacted' ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-none" :
                         "bg-gray-100 text-gray-700 hover:bg-gray-100 border-none"
                      }`}
                   >
                     {inquiry.status}
                   </Badge>
                </TableCell>
                <TableCell className="text-xs text-brand-green-deep/60 font-medium">
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right pr-8">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="h-8 w-8 p-0 text-brand-green-deep/40 hover:text-brand-green-deep">
                            <MoreVertical className="h-5 w-5" />
                         </Button>
                      </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-brand-green-forest/10 rounded-none w-48 shadow-lg">
                          <DropdownMenuItem onClick={() => setSelectedInquiry(inquiry)} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer py-3 focus:bg-brand-beige/30">
                            <Eye className="w-3.5 h-3.5" /> View Details
                          </DropdownMenuItem>
                          {inquiry.status !== 'Contacted' && (
                            <DropdownMenuItem onClick={() => updateStatus(inquiry.id, 'Contacted')} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer py-3 text-blue-600 focus:bg-blue-50 focus:text-blue-700">
                              <Phone className="w-3.5 h-3.5" /> Mark Contacted
                            </DropdownMenuItem>
                          )}
                          {inquiry.status !== 'Closed' && (
                            <DropdownMenuItem onClick={() => updateStatus(inquiry.id, 'Closed')} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer py-3 text-gray-600 focus:bg-gray-50 focus:text-gray-700">
                              <CheckCircle className="w-3.5 h-3.5" /> Mark Closed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => deleteInquiry(inquiry.id)} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer py-3 text-red-600 focus:bg-red-50 focus:text-red-700">
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
          <DialogContent className="max-w-2xl rounded-none border-brand-green-forest/10">
            <DialogHeader>
              <DialogTitle className="text-xl font-display uppercase tracking-widest text-brand-green-deep border-b pb-4">
                Inquiry Details
              </DialogTitle>
            </DialogHeader>
            {selectedInquiry && (
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-brand-green-deep">{selectedInquiry.full_name}</h4>
                    <p className="text-sm text-brand-green-deep/60">{selectedInquiry.organization || 'No Company'}</p>
                  </div>
                  <Badge 
                    className={`rounded-none text-[10px] uppercase tracking-widest font-bold ${
                       selectedInquiry.status === 'New' ? "bg-red-100 text-red-700 border-none" :
                       selectedInquiry.status === 'Contacted' ? "bg-blue-100 text-blue-700 border-none" :
                       "bg-gray-100 text-gray-700 border-none"
                    }`}
                  >
                    {selectedInquiry.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm bg-brand-beige/20 p-4 border border-brand-green-forest/5">
                  <div><span className="font-bold text-[10px] uppercase tracking-widest text-brand-green-deep/60 block mb-1">Email</span> <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">{selectedInquiry.email}</a></div>
                  <div><span className="font-bold text-[10px] uppercase tracking-widest text-brand-green-deep/60 block mb-1">Phone</span> {selectedInquiry.phone || 'N/A'}</div>
                  <div><span className="font-bold text-[10px] uppercase tracking-widest text-brand-green-deep/60 block mb-1">Country</span> {selectedInquiry.country || 'N/A'}</div>
                  <div><span className="font-bold text-[10px] uppercase tracking-widest text-brand-green-deep/60 block mb-1">Submitted On</span> {new Date(selectedInquiry.created_at).toLocaleString()}</div>
                  <div className="col-span-2"><span className="font-bold text-[10px] uppercase tracking-widest text-brand-green-deep/60 block mb-1">Product Interest</span> {selectedInquiry.product_interest || 'General'}</div>
                  {selectedInquiry.source_page && (
                    <div className="col-span-2"><span className="font-bold text-[10px] uppercase tracking-widest text-brand-green-deep/60 block mb-1">Source Page</span> <a href={selectedInquiry.source_page} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{selectedInquiry.source_page}</a></div>
                  )}
                </div>

                <div>
                  <span className="font-bold text-[10px] uppercase tracking-widest text-brand-green-deep/60 block mb-2">Message Content</span>
                  <div className="bg-white p-4 border border-brand-green-forest/10 text-sm whitespace-pre-wrap text-brand-green-deep leading-relaxed">
                    {selectedInquiry.message || 'No message provided.'}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-brand-green-forest/10">
                  {selectedInquiry.status !== 'Contacted' && <Button onClick={() => { updateStatus(selectedInquiry.id, 'Contacted'); setSelectedInquiry(null); }} className="rounded-none uppercase text-xs tracking-widest bg-blue-600 hover:bg-blue-700 text-white">Mark Contacted</Button>}
                  {selectedInquiry.status !== 'Closed' && <Button onClick={() => { updateStatus(selectedInquiry.id, 'Closed'); setSelectedInquiry(null); }} variant="outline" className="rounded-none uppercase text-xs tracking-widest border-brand-green-forest text-brand-green-forest hover:bg-brand-green-forest/5">Mark Closed</Button>}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
