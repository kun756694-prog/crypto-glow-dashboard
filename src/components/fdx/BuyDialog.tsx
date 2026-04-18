import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Mail, User, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BuyDialog = ({ price }: { price: number }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", wallet: "", amount: 1000 });

  const total = form.amount * price;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order received",
      description: `We'll contact ${form.email} with payment instructions for ${form.amount.toLocaleString()} FDX.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-fdx text-fdx-black font-bold text-base shadow-[0_0_40px_hsl(var(--fdx-gold)/0.5)] hover:scale-105 active:scale-95 transition-transform">
          <ShoppingCart className="w-5 h-5" />
          Buy FDX
          <span className="absolute -inset-1 rounded-full bg-fdx-gold/30 blur-lg -z-10 group-hover:bg-fdx-gold/50 transition-colors" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-fdx-black border-fdx-gold/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-fdx-gold text-xl">Reserve FDX Coin</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4 mt-2">
          <div>
            <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <User className="w-3 h-3" /> Full name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-fdx-black/60 border border-fdx-gold/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fdx-gold/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-fdx-black/60 border border-fdx-gold/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fdx-gold/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <Wallet className="w-3 h-3" /> Wallet address (optional)
            </label>
            <input
              value={form.wallet}
              onChange={(e) => setForm({ ...form, wallet: e.target.value })}
              placeholder="0x..."
              className="w-full bg-fdx-black/60 border border-fdx-gold/20 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-fdx-gold/60"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Amount (FDX)</label>
            <input
              type="number"
              min="100"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-fdx-black/60 border border-fdx-gold/20 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-fdx-gold/60"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-fdx-gold/10 border border-fdx-gold/30">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold text-fdx-gold">${total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-fdx text-fdx-black font-bold text-sm hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            Submit Order
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
