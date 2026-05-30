import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    publish_date: "",
    content: "",
    status: "Draft",
    featured_image: ""
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/blogs`, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, featured_image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const openModal = (blog: any = null) => {
    if (blog) {
      setCurrentBlog(blog);
      setFormData({
        title: blog.title,
        category: blog.category || "",
        author: blog.author || "",
        publish_date: blog.publish_date ? blog.publish_date.split('T')[0] : "",
        content: blog.content || "",
        status: blog.status || "Draft",
        featured_image: blog.featured_image || ""
      });
    } else {
      setCurrentBlog(null);
      setFormData({
        title: "",
        category: "",
        author: "",
        publish_date: new Date().toISOString().split('T')[0],
        content: "",
        status: "Draft",
        featured_image: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const url = currentBlog ? `${API_URL}/api/blogs/${currentBlog.id}` : `${API_URL}/api/blogs`;
      const method = currentBlog ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to save blog');
      toast.success(currentBlog ? "Blog updated!" : "Blog added!");
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save blog.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE', credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success("Blog deleted");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <div>
             <h3 className="text-xl font-display font-medium text-brand-green-forest uppercase tracking-widest">Trade Insights</h3>
             <p className="text-xs text-brand-green-deep/40 font-semibold uppercase tracking-wider mt-1">Manage corporate news and market updates</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <Button onClick={() => openModal()} className="bg-brand-green-forest text-white rounded-none uppercase text-[10px] font-bold tracking-widest h-12 px-8">
                 <Plus className="w-4 h-4 mr-2" /> New Publication
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none">
              <DialogHeader>
                <DialogTitle className="text-xl font-display uppercase tracking-widest text-brand-green-deep border-b pb-4">
                  {currentBlog ? "Edit Publication" : "New Publication"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Blog Title</label>
                  <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Category</label>
                    <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">Select Category...</option>
                      <option value="Corporate Profile">Corporate Profile</option>
                      <option value="Electric Mobility">Electric Mobility</option>
                      <option value="Agro Commodities">Agro Commodities</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Market Trends">Market Trends</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Author</label>
                    <Input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="rounded-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Publish Date</label>
                    <Input type="date" required value={formData.publish_date} onChange={e => setFormData({...formData, publish_date: e.target.value})} className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Content</label>
                  <Textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="rounded-none min-h-[150px]" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-green-deep/60">Featured Image</label>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="rounded-none" />
                  {formData.featured_image && (
                    <div className="mt-2 relative inline-block">
                      <img src={formData.featured_image} alt="Preview" className="h-20 object-contain border p-1" />
                      <button type="button" onClick={() => setFormData({...formData, featured_image: ""})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-none uppercase tracking-widest text-xs">Cancel</Button>
                  <Button type="submit" className="rounded-none uppercase tracking-widest text-xs bg-brand-green-forest">{currentBlog ? "Update Publication" : "Save Publication"}</Button>
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
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Title</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Category / Author</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Date</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-brand-green-deep">Status</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-brand-green-deep pr-8 text-brand-gold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : blogs.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-brand-green-deep/40 uppercase tracking-widest text-xs font-bold">No publications found.</TableCell></TableRow>
              ) : (
                blogs.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      {b.featured_image ? <img src={b.featured_image} alt={b.title} className="w-10 h-10 object-cover rounded border" /> : <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-400 text-xs"><FileText className="w-5 h-5"/></div>}
                    </TableCell>
                    <TableCell className="font-medium text-brand-green-deep">{b.title}</TableCell>
                    <TableCell>
                      <div className="text-xs font-semibold">{b.category}</div>
                      <div className="text-[10px] text-brand-green-deep/50">by {b.author}</div>
                    </TableCell>
                    <TableCell className="text-xs">{new Date(b.publish_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${b.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{b.status}</span>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal(b)} className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(b.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></Button>
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