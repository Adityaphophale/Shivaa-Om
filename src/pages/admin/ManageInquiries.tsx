import { Button } from "@/components/ui/button";

export default function ManageInquiries() {
  return (
    <div className="space-y-8">
      <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-brand-green-forest mb-2">Inquiries Moved to WhatsApp</h3>
        <p className="text-brand-green-deep/70 text-sm">
          All customer inquiries are now handled directly via WhatsApp at +91 9152573356. 
          This admin panel is no longer needed as inquiries are sent directly to the team's WhatsApp without database storage.
        </p>
      </div>
    </div>
  );
}
