import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ManageProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    origin: "",
    route: "",
    desc: "",
    status: "Active",
    image: ""
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const openModal = (product: any = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        category: product.category || "",
        origin: product.origin || "",
        route: product.route || "",
        desc: product.description || "",
        status: product.status || "Active",
        image: product.image || ""
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: "",
        category: "",
        origin: "",
        route: "",
        desc: "",
        status: "Active",
        image: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentProduct ? `/api/products/${currentProduct.id}` : '/api/products';
      const method = currentProduct ? 'PUT' : 'POST';
      
      const payload = {
        name: formData.name,
        category: formData.category,
        origin: formData.origin,
        route: formData.route,
        description: formData.desc,
        status: formData.status,
        image: formData.image
      };

      const res = await fetch(url, {
        method,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to save product');
      toast.success(currentProduct ? "Product updated!" : "Product added!");
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE', credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <div>
             <h3 className="text-xl font-display font-medium text-brand-green-forest uppercase tracking-widest">Global Catalog</h3>
             <p className="text-xs text-brand-green-deep/40 font-semibold uppercase tracking-wider mt-1">Manage all trade commodities</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <Button onClick={() => openModal()} className="bg-brand-green-forest text-white rounded-none uppercase text-[10px] font-bold tracking-widest h-12 px-8">
                 <Plus className="w-4 h-4 mr-2" /> Add New Commodity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none">
              <DialogHeader>
                <DialogTitle className="text-xl font-display uppercase tracking-widest text-brand-green-deep border-b pb-4">
                  {currentProduct ? "Edit Commodity" : "Add New Commodity"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Product Name</label>
                    <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Category</label>
                    <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">Select Category...</option>
                      <option value="Agro Commodities">Agro Commodities</option>
                      <option value="Electric Mobility">Electric Mobility</option>
                      <option value="Industrial Products">Industrial Products</option>
                      <option value="Chemicals">Chemicals</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Origin</label>
                    <Input required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Route</label>
                    <Input required value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} className="rounded-none" placeholder="e.g. India → Africa" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Description</label>
                  <Textarea required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="rounded-none min-h-[100px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Product Image</label>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="rounded-none" />
                    {formData.image && (
                      <div className="mt-2 relative inline-block">
                        <img src={formData.image} alt="Preview" className="h-20 object-contain border p-1" />
                        <button type="button" onClick={() => setFormData({...formData, image: ""})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X className="w-3 h-3" /></button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-none uppercase tracking-widest text-xs">Cancel</Button>
                  <Button type="submit" className="rounded-none uppercase tracking-widest text-xs bg-brand-green-forest">{currentProduct ? "Update Product" : "Save Product"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
       </div>
       
       <div className="bg-white border border-brand-green-forest/5 shadow-sm rounded-none overflow-hidden">
         <Table>
            <TableHeader className="bg-brand-beige/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-16">Image</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Product Name</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Category</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Origin/Route</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Status</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-brand-green-deep pr-8 text-brand-gold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : products.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-brand-green-deep/40 uppercase tracking-widest text-xs font-bold">No products found.</TableCell></TableRow>
              ) : (
                products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      {p.image ? <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border" /> : <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-400 text-xs"><Package className="w-5 h-5"/></div>}
                    </TableCell>
                    <TableCell className="font-medium text-brand-green-deep">{p.name}</TableCell>
                    <TableCell className="text-xs">{p.category}</TableCell>
                    <TableCell>
                      <div className="text-xs font-semibold">{p.origin}</div>
                      <div className="text-[10px] text-brand-green-deep/50">{p.route}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal(p)} className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
         </Table>
       </div>
    </div>
  );
}