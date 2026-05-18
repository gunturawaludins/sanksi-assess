import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SanctionRecord, formatRp, slaStatus } from "@/lib/sanctionData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";
import { Banknote, CheckCircle2, Clock, Users, AlertTriangle } from "lucide-react";

const PIE_COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function Dashboard({ data }: { data: SanctionRecord[] }) {
  const totalDenda = data.reduce((a, r) => a + r.sanksiDenda, 0);
  const totalLunas = data.filter((r) => r.statusPembayaran === "Lunas").reduce((a, r) => a + r.sanksiDenda, 0);
  const totalBelum = totalDenda - totalLunas;
  const dalamProses = data.filter((r) => r.statusProses === "On Process").length;
  const uniquePihak = new Set(data.map((r) => r.namaPihak)).size;
  const lewatSLA = data.filter((r) => slaStatus(r).flag === "over").length;

  const jenisCounts = data.reduce<Record<string, number>>((acc, r) => {
    acc[r.jenisLaporan] = (acc[r.jenisLaporan] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(jenisCounts).map(([name, value]) => ({ name, value }));

  const barData = [
    { name: "Realisasi Denda", Dilunasi: totalLunas, "Belum Dilunasi": totalBelum },
  ];

  const funnelData = [
    { stage: "Teguran I", count: data.filter((r) => r.teguran1 && !r.teguran2).length },
    { stage: "Teguran II", count: data.filter((r) => r.teguran2 && !r.teguran3).length },
    { stage: "Teguran III", count: data.filter((r) => r.teguran3 && !r.piutangMacet).length },
    { stage: "PUPN / Piutang Macet", count: data.filter((r) => r.piutangMacet).length },
  ];

  const kpis = [
    { label: "Total Denda Dikenakan", value: formatRp(totalDenda), icon: Banknote, accent: "text-blue-600" },
    { label: "Total Denda Dilunasi", value: formatRp(totalLunas), icon: CheckCircle2, accent: "text-emerald-600" },
    { label: "Sanksi Dalam Proses", value: dalamProses.toString(), icon: Clock, accent: "text-amber-600" },
    { label: "Total Pihak Disanksi", value: uniquePihak.toString(), icon: Users, accent: "text-purple-600" },
    { label: "Kasus Lewat SLA 15 HK", value: lewatSLA.toString(), icon: AlertTriangle, accent: "text-rose-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{k.label}</CardTitle>
              <k.icon className={`h-4 w-4 ${k.accent}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold tracking-tight">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Realisasi Pembayaran Denda</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis tickFormatter={(v) => `Rp ${(v / 1_000_000_000).toFixed(1)}M`} className="text-xs" />
                <Tooltip formatter={(v: number) => formatRp(v)} />
                <Legend />
                <Bar dataKey="Dilunasi" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Belum Dilunasi" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Breakdown Jenis Laporan</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Escalation Funnel — Upaya Penagihan</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" className="text-xs" />
              <YAxis type="category" dataKey="stage" width={180} className="text-xs" />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
