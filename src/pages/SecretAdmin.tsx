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
import { Download } from "lucide-react";

interface SurveyRow {
  id: string;
  wallet_address: string;
  points: number;
  network: string;
  created_at: string;
}

const SecretAdmin = () => {
  const [rows, setRows] = useState<SurveyRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("survey_results")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setRows(data);
      setLoading(false);
    };
    load();
  }, []);

  const exportCSV = () => {
    const header = "ID,Wallet Address,Points,Network,Created At\n";
    const csv =
      header +
      rows
        .map(
          (r) =>
            `${r.id},${r.wallet_address},${r.points},${r.network},${r.created_at}`
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "survey_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <Button onClick={exportCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <div className="glass-card p-4 mb-6 grid grid-cols-2 gap-4 max-w-md">
          <div>
            <p className="text-sm text-muted-foreground">Total Submissions</p>
            <p className="text-2xl font-bold text-primary">{rows.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Points</p>
            <p className="text-2xl font-bold text-primary">
              {rows.reduce((s, r) => s + r.points, 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-muted-foreground animate-pulse">
              Loading…
            </p>
          ) : rows.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">
              No submissions yet.
            </p>
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
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">
                      {r.id.slice(0, 8)}…
                    </TableCell>
                    <TableCell className="font-mono text-xs max-w-[200px] truncate">
                      {r.wallet_address}
                    </TableCell>
                    <TableCell>{r.points.toLocaleString()}</TableCell>
                    <TableCell>{r.network}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default SecretAdmin;
