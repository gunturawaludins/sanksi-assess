import { SanctionRecord, formatDate, slaStatus } from "@/lib/sanctionData";
import { Badge } from "@/components/ui/badge";

export function TabPengenaan({ data }: { data: SanctionRecord[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
      <table className="w-full min-w-[1800px] text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <Th>No</Th>
            <Th>Jenis Laporan</Th>
            <Th>Direktorat Pelimpah</Th>
            <Th>Nomor ND Pelimpahan</Th>
            <Th>Tgl ND</Th>
            <Th>Tgl Diterima / Dispo</Th>
            <Th>Due Date (15 HK)</Th>
            <Th>Permintaan Informasi (No & Tgl)</Th>
            <Th>Tanggapan Permintaan Info (No & Tgl)</Th>
            <Th>Penyelesaian (No & Tgl)</Th>
            <Th>Ketentuan Dilanggar</Th>
            <Th>Detail Pelanggaran</Th>
            <Th>Status Proses</Th>
            <Th>Ket. SLA</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => {
            const sla = slaStatus(r);
            return (
              <tr key={r.id} className="border-b align-top hover:bg-muted/40">
                <Td className="text-right">{r.no}</Td>
                <Td><Badge variant="outline">{r.jenisLaporan}</Badge></Td>
                <Td className="text-left max-w-[200px] whitespace-normal break-words">{r.direktoratPelimpah}</Td>
                <Td className="text-left font-mono text-xs">{r.nomorNDPelimpahan}</Td>
                <Td className="text-right whitespace-nowrap">{formatDate(r.tanggalND)}</Td>
                <Td className="text-right whitespace-nowrap">{formatDate(r.tanggalDiterima)}</Td>
                <Td className="text-right whitespace-nowrap">{formatDate(r.dueDatePenyelesaian)}</Td>
                <Td className="text-left text-xs">
                  {r.permintaanInfoNo ? (<><div className="font-mono">{r.permintaanInfoNo}</div><div className="text-muted-foreground">{formatDate(r.permintaanInfoTgl)}</div></>) : "-"}
                </Td>
                <Td className="text-left text-xs">
                  {r.tanggapanInfoNo ? (<><div className="font-mono">{r.tanggapanInfoNo}</div><div className="text-muted-foreground">{formatDate(r.tanggapanInfoTgl)}</div></>) : "-"}
                </Td>
                <Td className="text-left text-xs">
                  {r.penyelesaianNo ? (<><div className="font-mono">{r.penyelesaianNo}</div><div className="text-muted-foreground">{formatDate(r.penyelesaianTgl)}</div></>) : "-"}
                </Td>
                <Td className="text-left max-w-[220px] whitespace-normal break-words text-xs">{r.ketentuanDilanggar}</Td>
                <Td className="text-left max-w-[320px] whitespace-normal break-words text-xs">{r.detailPelanggaran}</Td>
                <Td>
                  <Badge className={r.statusProses === "Selesai" ? "bg-emerald-600" : "bg-amber-600"}>{r.statusProses}</Badge>
                </Td>
                <Td>
                  {sla.flag === "over" && <Badge className="bg-rose-600 whitespace-nowrap">Lewat SLA ({sla.effective} HK)</Badge>}
                  {sla.flag === "warn" && <Badge className="bg-amber-500 whitespace-nowrap">H-{Math.max(0, 15 - sla.effective)} ({sla.effective} HK)</Badge>}
                  {sla.flag === "ok" && <Badge variant="outline" className="whitespace-nowrap">{sla.effective} HK</Badge>}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-3 text-left font-semibold text-xs uppercase tracking-wide whitespace-normal">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-3 align-top ${className}`}>{children}</td>;
}
