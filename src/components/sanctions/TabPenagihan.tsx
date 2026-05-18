import { SanctionRecord, TeguranData, formatDate, formatRp } from "@/lib/sanctionData";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export function TabPenagihan({ data }: { data: SanctionRecord[] }) {
  const today = new Date("2026-06-15");

  return (
    <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
      <table className="w-full min-w-[2600px] text-xs border-separate border-spacing-0">
        <thead>
          <tr>
            <th rowSpan={2} className="bg-amber-600 text-white px-3 py-2 sticky left-0 z-10">No</th>
            <th rowSpan={2} className="bg-amber-600 text-white px-3 py-2 text-left">Nama Pihak</th>
            <th rowSpan={2} className="bg-amber-600 text-white px-3 py-2">Sanksi Denda Pokok</th>
            <th colSpan={7} className="bg-amber-500 text-white px-3 py-2 border-l border-white/40">TEGURAN I</th>
            <th colSpan={7} className="bg-amber-700 text-white px-3 py-2 border-l border-white/40">TEGURAN II</th>
            <th colSpan={7} className="bg-orange-700 text-white px-3 py-2 border-l border-white/40">TEGURAN III</th>
            <th colSpan={5} className="bg-rose-700 text-white px-3 py-2 border-l border-white/40">PIUTANG MACET / PUPN</th>
          </tr>
          <tr className="text-[10px] uppercase tracking-wide">
            {[1, 2, 3].map((n) => (
              <TeguranSubHead key={n} bg={n === 1 ? "bg-amber-500" : n === 2 ? "bg-amber-700" : "bg-orange-700"} />
            ))}
            <th className="bg-rose-700 text-white px-2 py-2">Tgl Jatuh Tempo Pelimpahan</th>
            <th className="bg-rose-700 text-white px-2 py-2">Status Setelah 1 Tahun</th>
            <th className="bg-rose-700 text-white px-2 py-2">ND Permintaan Info PUPN</th>
            <th className="bg-rose-700 text-white px-2 py-2">ND Pelimpahan PUPN</th>
            <th className="bg-rose-700 text-white px-2 py-2">Status Case</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => {
            const t1Due = r.teguran1 ? new Date(r.teguran1.tanggalJatuhTempo) : null;
            const t2Unlocked = !!r.teguran1 && t1Due! < today && r.teguran1!.statusDendaBunga === "Belum Lunas";
            const t2Due = r.teguran2 ? new Date(r.teguran2.tanggalJatuhTempo) : null;
            const t3Unlocked = !!r.teguran2 && t2Due! < today && r.teguran2!.statusDendaBunga === "Belum Lunas";
            return (
              <tr key={r.id} className="border-b align-top hover:bg-muted/40">
                <td className="px-3 py-3 text-right border-b sticky left-0 bg-card">{r.no}</td>
                <td className="px-3 py-3 text-left max-w-[220px] whitespace-normal break-words font-medium border-b">{r.namaPihak}</td>
                <td className="px-3 py-3 text-right font-semibold whitespace-nowrap border-b">{formatRp(r.sanksiDenda)}</td>
                <TeguranCells data={r.teguran1} locked={false} />
                <TeguranCells data={r.teguran2} locked={!t2Unlocked && !r.teguran2} />
                <TeguranCells data={r.teguran3} locked={!t3Unlocked && !r.teguran3} />
                <td className="px-2 py-3 text-right whitespace-nowrap border-b">{formatDate(r.piutangMacet?.tanggalJatuhTempoPelimpahan)}</td>
                <td className="px-2 py-3 text-left max-w-[180px] whitespace-normal break-words border-b">
                  {r.piutangMacet ? <Badge className="bg-rose-700">{r.piutangMacet.statusDendaSetelah1Tahun}</Badge> : "-"}
                </td>
                <td className="px-2 py-3 text-left font-mono border-b">{r.piutangMacet?.ndPermintaanInfoPUPN ?? "-"}</td>
                <td className="px-2 py-3 text-left font-mono border-b">{r.piutangMacet?.ndPelimpahanPUPN ?? "-"}</td>
                <td className="px-2 py-3 border-b">
                  {r.piutangMacet ? (
                    <Badge className={r.piutangMacet.statusCaseClose === "Closed" ? "bg-emerald-600" : "bg-rose-600"}>
                      {r.piutangMacet.statusCaseClose}
                    </Badge>
                  ) : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TeguranSubHead({ bg }: { bg: string }) {
  return (
    <>
      {["ND (No & Tgl)", "Nomor Surat", "Tgl Surat", "Jatuh Tempo", "Bunga (Rp)", "Status", "Input SIPO"].map((h) => (
        <th key={h} className={`${bg} text-white px-2 py-2 text-left font-semibold whitespace-normal`}>{h}</th>
      ))}
    </>
  );
}

function TeguranCells({ data, locked }: { data?: TeguranData; locked: boolean }) {
  if (locked) {
    return (
      <td colSpan={7} className="px-3 py-3 text-center bg-muted/30 text-muted-foreground border-b">
        <div className="inline-flex items-center gap-2 text-xs"><Lock className="h-3 w-3" /> Locked — menunggu jatuh tempo Teguran sebelumnya</div>
      </td>
    );
  }
  if (!data) {
    return (
      <td colSpan={7} className="px-3 py-3 text-center text-muted-foreground border-b text-xs">— Belum diperlukan —</td>
    );
  }
  return (
    <>
      <td className="px-2 py-3 text-left text-xs border-b"><div className="font-mono">{data.ndNo}</div><div className="text-muted-foreground">{formatDate(data.ndTgl)}</div></td>
      <td className="px-2 py-3 text-left font-mono text-xs border-b">{data.nomorSurat}</td>
      <td className="px-2 py-3 text-right whitespace-nowrap border-b">{formatDate(data.tanggalSurat)}</td>
      <td className="px-2 py-3 text-right whitespace-nowrap border-b">{formatDate(data.tanggalJatuhTempo)}</td>
      <td className="px-2 py-3 text-right whitespace-nowrap border-b">{formatRp(data.bunga)}</td>
      <td className="px-2 py-3 border-b">
        <Badge className={data.statusDendaBunga === "Lunas" ? "bg-emerald-600" : "bg-rose-600"}>{data.statusDendaBunga}</Badge>
      </td>
      <td className="px-2 py-3 border-b">{data.suratTeguranInputSIPO ? <Badge variant="outline" className="border-emerald-600 text-emerald-700">✓</Badge> : <Badge variant="outline">✗</Badge>}</td>
    </>
  );
}
