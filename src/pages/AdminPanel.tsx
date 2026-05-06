import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Shield, Plus, Minus, RefreshCw } from "lucide-react";
import { Navigate } from "react-router-dom";

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  display_name: string | null;
  points: number;
  created_at: string;
}

const AdminPanel = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [pointInputs, setPointInputs] = useState<Record<string, string>>({});

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load users.");
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const modifyPoints = async (userId: string, amount: number) => {
    const profile = users.find((u) => u.user_id === userId);
    if (!profile) return;

    const newPoints = Math.max(0, profile.points + amount);
    const { error } = await supabase
      .from("profiles")
      .update({ points: newPoints })
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to update points.");
      return;
    }

    toast.success(`Points updated: ${profile.email || userId}`);
    setUsers((prev) =>
      prev.map((u) => (u.user_id === userId ? { ...u, points: newPoints } : u))
    );
    setPointInputs((prev) => ({ ...prev, [userId]: "" }));
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
          </div>
          <Button onClick={fetchUsers} variant="outline" size="sm" disabled={loading} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="glass-card p-4 mb-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold text-primary">{users.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Points Issued</p>
            <p className="text-2xl font-bold text-primary">
              {users.reduce((s, u) => s + u.points, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-card overflow-hidden">
          {users.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">No users yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Manage Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => {
                  const inputVal = pointInputs[u.user_id] || "";
                  const pts = parseInt(inputVal, 10) || 0;

                  return (
                    <TableRow key={u.id}>
                      <TableCell className="font-mono text-xs">{u.email || "—"}</TableCell>
                      <TableCell>{u.display_name || "—"}</TableCell>
                      <TableCell className="font-bold text-primary">{u.points.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(u.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Pts"
                            value={inputVal}
                            onChange={(e) =>
                              setPointInputs((prev) => ({ ...prev, [u.user_id]: e.target.value }))
                            }
                            className="w-20 h-8 text-xs bg-background/50 border-primary/30"
                            min={1}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1 text-green-400 border-green-500/30 hover:bg-green-500/10"
                            disabled={pts <= 0}
                            onClick={() => modifyPoints(u.user_id, pts)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1 text-red-400 border-red-500/30 hover:bg-red-500/10"
                            disabled={pts <= 0}
                            onClick={() => modifyPoints(u.user_id, -pts)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AdminPanel;
