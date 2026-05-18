import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SANCTIONS } from "@/lib/sanctionData";
import { Filters, type FilterState } from "@/components/sanctions/Filters";
import { Dashboard } from "@/components/sanctions/Dashboard";
import { TabPengenaan } from "@/components/sanctions/TabPengenaan";
import { TabPembayaran } from "@/components/sanctions/TabPembayaran";
import { TabPenagihan } from "@/components/sanctions/TabPenagihan";
import { TabSlaInternal } from "@/components/sanctions/TabSlaInternal";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanction Management & Monitoring System — Tahun Buku 2026" },
      { name: "description", content: "Dashboard pengawasan pengenaan, pembayaran, penagihan, dan SLA sanksi pelaku pasar modal Indonesia tahun buku 2026." },
    ],
  }),
  component: SanctionDashboardPage,
});

function SanctionDashboardPage() {
  const [filters, setFilters] = useState<FilterState>({ jenis: "all", status: "all", pic: "all" });

  const filtered = useMemo(() => {
    return SANCTIONS.filter((r) => {
      if (filters.jenis !== "all" && r.jenisLaporan !== filters.jenis) return false;
      if (filters.status !== "all" && r.statusPembayaran !== filters.status) return false;
      if (filters.pic !== "all" && r.picKasus !== filters.pic) return false;
      return true;
    });
  }, [filters]);

  function exportCSV() {
    const headers = ["No", "Nama Pihak", "Jenis Laporan", "Nomor Surat Sanksi", "Sanksi Denda", "Status Pembayaran", "PIC"];
    const rows = filtered.map((r) => [r.no, r.namaPihak, r.jenisLaporan, r.nomorSuratSanksi, r.sanksiDenda, r.statusPembayaran, r.picKasus]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sanksi-tb2026-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card shadow-sm">
        <div className="mx-auto max-w-[1600px] px-6 py-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Sanction Management & Monitoring System</h1>
            <p className="text-sm text-muted-foreground">Pengawasan Pasar Modal Indonesia — Tahun Buku 2026</p>
          </div>
          <div className="ml-auto text-right text-xs text-muted-foreground">
            <div>Periode Pemantauan</div>
            <div className="font-semibold text-foreground">Jan – Dec 2026</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-5 px-6 py-6">
        <Filters value={filters} onChange={setFilters} onExport={exportCSV} />

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="dashboard" className="py-2">Dashboard</TabsTrigger>
            <TabsTrigger value="pengenaan" className="py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">2. Pengenaan Sanksi</TabsTrigger>
            <TabsTrigger value="pembayaran" className="py-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">3. Pembayaran & Keberatan</TabsTrigger>
            <TabsTrigger value="penagihan" className="py-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white">4. Upaya Penagihan</TabsTrigger>
            <TabsTrigger value="sla" className="py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">5. SLA Internal</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard"><Dashboard data={filtered} /></TabsContent>
          <TabsContent value="pengenaan"><TabPengenaan data={filtered} /></TabsContent>
          <TabsContent value="pembayaran"><TabPembayaran data={filtered} /></TabsContent>
          <TabsContent value="penagihan"><TabPenagihan data={filtered} /></TabsContent>
          <TabsContent value="sla"><TabSlaInternal data={filtered} /></TabsContent>
        </Tabs>

        <footer className="text-center text-xs text-muted-foreground pt-4">
          SLA dihitung dalam Hari Kerja (HK) — mengecualikan Sabtu, Minggu, dan hari libur nasional. Logika "Sejak" (H+0) & "Setelah" (H+1) sesuai ketentuan internal.
        </footer>
      </main>
    </div>
  );
}
