import { useState, useEffect } from "react";
import { db, handleFirestoreError, OperationType } from "../../lib/firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
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

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "inquiries");
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "inquiries", id), { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, "inquiries");
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
                    <span className="font-semibold text-brand-green-deep">{inquiry.name}</span>
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
                    <span className="text-sm font-medium">{inquiry.company}</span>
                    <span className="text-[9px] font-bold uppercase text-brand-gold tracking-widest">{inquiry.country}</span>
                 </div>
              </TableCell>
              <TableCell>
                 <Badge variant="outline" className="rounded-none border-brand-green-forest/10 text-[9px] uppercase tracking-widest font-bold">
                    {inquiry.productInterest}
                 </Badge>
              </TableCell>
              <TableCell className="max-w-[300px]">
                 <p className="text-xs text-brand-green-deep/60 line-clamp-2">"{inquiry.message}"</p>
              </TableCell>
              <TableCell>
                 <Badge 
                    className={`rounded-none text-[9px] uppercase tracking-widest font-bold ${
                       inquiry.status === 'New' ? "bg-red-100 text-red-700 hover:bg-red-100" :
                       inquiry.status === 'Read' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                       "bg-green-100 text-green-700 hover:bg-green-100"
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
                       <DropdownMenuItem onClick={() => updateStatus(inquiry.id, 'Read')} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer">
                          <Eye className="w-3.3 h-3.3" /> Mark Read
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => updateStatus(inquiry.id, 'Replied')} className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer text-green-600">
                          <CheckCircle className="w-3.3 h-3.3" /> Replied
                       </DropdownMenuItem>
                       <DropdownMenuItem className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer text-red-600">
                          <Trash2 className="w-3.3 h-3.3" /> Archive
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
