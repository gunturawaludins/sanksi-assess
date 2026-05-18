import { SanctionRecord, formatDate, formatRp } from "@/lib/sanctionData";
import { Badge } from "@/components/ui/badge";

export function TabPembayaran({ data }: { data: SanctionRecord[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
      <table className="w-full min-w-[1900px] text-sm">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <Th>No</Th>
            <Th>Nama Pihak / Lembaga</Th>
            <Th>Selaku</Th>
            <Th>Nomor Surat Sanksi</Th>
            <Th>Tgl Surat Sanksi</Th>
            <Th>Sanksi Denda (Rp)</Th>
            <Th>Peringatan Tertulis</Th>
            <Th>Status Pembayaran</Th>
            <Th>Jatuh Tempo (30 Hari)</Th>
            <Th>Tgl Bayar</Th>
            <Th>No. Billing SIPO</Th>
            <Th>Ajukan Keberatan</Th>
            <Th>Tanggapan Keberatan</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => {
            const keberatanFreeze = r.ajukanKeberatan && r.tanggapanKeberatanStatus !== "Ditolak";
            return (
              <tr key={r.id} className="border-b align-top hover:bg-muted/40">
                <Td className="text-right">{r.no}</Td>
                <Td className="text-left max-w-[240px] whitespace-normal break-words font-medium">{r.namaPihak}</Td>
                <Td className="text-left">{r.selaku}</Td>
                <Td className="text-left font-mono text-xs">{r.nomorSuratSanksi}</Td>
                <Td className="text-right whitespace-nowrap">{formatDate(r.tanggalSuratSanksi)}</Td>
                <Td className="text-right font-semibold whitespace-nowrap">{formatRp(r.sanksiDenda)}</Td>
                <Td>{r.peringatanTertulis ? <Badge className="bg-amber-500">Ya</Badge> : <Badge variant="outline">Tidak</Badge>}</Td>
                <Td>
                  {r.statusPembayaran === "Lunas" && <Badge className="bg-emerald-600">Lunas</Badge>}
                  {r.statusPembayaran === "Belum Lunas" && <Badge className="bg-rose-600">Belum Lunas</Badge>}
                  {r.statusPembayaran === "Dalam Proses" && <Badge className="bg-amber-500">Dalam Proses</Badge>}
                </Td>
                <Td className="text-right whitespace-nowrap">
                  {formatDate(r.tanggalJatuhTempo30)}
                  {keberatanFreeze && <div className="text-[10px] text-amber-600 font-medium">⏸ Frozen (Keberatan)</div>}
                </Td>
                <Td className="text-right whitespace-nowrap">{formatDate(r.tanggalBayar)}</Td>
                <Td className="text-left font-mono text-xs">{r.noBillingSIPO ?? "-"}</Td>
                <Td>{r.ajukanKeberatan ? <Badge className="bg-purple-600">Ya</Badge> : <Badge variant="outline">Tidak</Badge>}</Td>
                <Td className="text-left text-xs max-w-[220px] whitespace-normal break-words">
                  {r.tanggapanKeberatanNo ? (
                    <>
                      <div className="font-mono">{r.tanggapanKeberatanNo}</div>
                      <div className="text-muted-foreground">{formatDate(r.tanggapanKeberatanTgl)}</div>
                      <Badge className={r.tanggapanKeberatanStatus === "Diterima" ? "bg-emerald-600" : "bg-rose-600"}>{r.tanggapanKeberatanStatus}</Badge>
                    </>
                  ) : "-"}
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
