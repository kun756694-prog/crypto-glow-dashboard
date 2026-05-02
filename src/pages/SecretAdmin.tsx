import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface SurveyRow {
  id: string;
  wallet_address: string;
  points: number;
  network: string;
  created_at: string;
}

interface WithdrawalRow {
  id: string;
  wallet_address: string;
  network: string;
  points: number;
  status: string;
  created_at: string;
}

const SecretAdmin = () => {
  const [surveys, setSurveys] = useState<SurveyRow[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [surveyRes, withdrawRes] = await Promise.all([
      supabase.from("survey_results").select("*").order("created_at", { ascending: false }),
      supabase.from("withdrawals").select("*").order("created_at", { ascending: false }),
    ]);
    if (surveyRes.data) setSurveys(surveyRes.data);
    if (withdrawRes.data) setWithdrawals(withdrawRes.data as WithdrawalRow[]);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const markPaid = async (id: string) => {
    const { error } = await (supabase.from("withdrawals") as any).update({ status: "completed" }).eq("id", id);
    if (error) {
      toast.error("Failed to update status.");
      return;
    }
    toast.success("Marked as paid!");
    setWithdrawals((prev) => prev.map((w) => (w.id === id ? { ...w, status: "completed" } : w)));
  };

  const exportCSV = (type: "surveys" | "withdrawals") => {
    let csv: string;
    let filename: string;
    if (type === "surveys") {
      csv = "ID,Wallet Address,Points,Network,Created At\n" +
        surveys.map((r) => `${r.id},${r.wallet_address},${r.points},${r.network},${r.created_at}`).join("\n");
      filename = "survey_results.csv";
    } else {
      csv = "ID,Wallet Address,Network,Points,Status,Created At\n" +
        withdrawals.map((r) => `${r.id},${r.wallet_address},${r.network},${r.points},${r.status},${r.created_at}`).join("\n");
      filename = "withdrawals.csv";
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="glass-card p-4 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Survey Submissions</p>
            <p className="text-2xl font-bold text-primary">{surveys.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Survey Points</p>
            <p className="text-2xl font-bold text-primary">{surveys.reduce((s, r) => s + r.points, 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Withdrawal Requests</p>
            <p className="text-2xl font-bold text-primary">{withdrawals.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending Withdrawals</p>
            <p className="text-2xl font-bold text-yellow-500">{withdrawals.filter((w) => w.status === "pending").length}</p>
          </div>
        </div>

        {/* Withdrawal Requests */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary">💸 Withdrawal Requests</h2>
            <Button onClick={() => exportCSV("withdrawals")} variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </div>
          <div className="glass-card overflow-hidden">
            {loading ? (
              <p className="p-8 text-center text-muted-foreground animate-pulse">Loading…</p>
            ) : withdrawals.length === 0 ? (
              <p className="p-8 text-center text-muted-foreground">No withdrawal requests yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Wallet Address</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((w) => (
                    <TableRow key={w.id}>
                      <TableCell className="font-mono text-xs">{w.id.slice(0, 8)}…</TableCell>
                      <TableCell className="font-mono text-xs max-w-[180px] truncate">{w.wallet_address}</TableCell>
                      <TableCell>{w.network}</TableCell>
                      <TableCell>{w.points.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={w.status === "completed" ? "default" : "secondary"} className={w.status === "pending" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : ""}>
                          {w.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{new Date(w.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {w.status === "pending" && (
                          <Button size="sm" variant="outline" onClick={() => markPaid(w.id)} className="gap-1 text-green-400 border-green-500/30 hover:bg-green-500/10">
                            <CheckCircle className="w-3.5 h-3.5" /> Paid
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        {/* Survey Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary">📊 Survey Completions</h2>
            <Button onClick={() => exportCSV("surveys")} variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </div>
          <div className="glass-card overflow-hidden">
            {loading ? (
              <p className="p-8 text-center text-muted-foreground animate-pulse">Loading…</p>
            ) : surveys.length === 0 ? (
              <p className="p-8 text-center text-muted-foreground">No submissions yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Wallet Address</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {surveys.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id.slice(0, 8)}…</TableCell>
                      <TableCell className="font-mono text-xs max-w-[200px] truncate">{r.wallet_address}</TableCell>
                      <TableCell>{r.points.toLocaleString()}</TableCell>
                      <TableCell>{r.network}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default SecretAdmin;
