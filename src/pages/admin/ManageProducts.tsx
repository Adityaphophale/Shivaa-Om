import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

export default function ManageProducts() {
  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <div>
             <h3 className="text-xl font-display font-medium text-brand-green-forest uppercase tracking-widest">Global Catalog</h3>
             <p className="text-xs text-brand-green-deep/40 font-semibold uppercase tracking-wider mt-1">Manage all trade commodities</p>
          </div>
          <Button className="bg-brand-green-forest text-white rounded-none uppercase text-[10px] font-bold tracking-widest h-12 px-8">
             <Plus className="w-4 h-4 mr-2" /> Add New Commodity
          </Button>
       </div>
       
       <div className="bg-white border border-brand-green-forest/5 p-12 text-center rounded-xl bg-brand-beige/20 border-dashed border-2">
          <Package className="w-12 h-12 text-brand-green-forest/20 mx-auto mb-4" />
          <p className="text-sm font-display uppercase tracking-widest text-brand-green-deep/40">Product management module coming soon.</p>
       </div>
    </div>
  );
}
