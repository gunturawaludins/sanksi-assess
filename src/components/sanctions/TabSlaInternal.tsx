import { SanctionRecord, formatDate } from "@/lib/sanctionData";
import { Badge } from "@/components/ui/badge";

export function TabSlaInternal({ data }: { data: SanctionRecord[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
      <table className="w-full min-w-[2000px] text-xs border-separate border-spacing-0">
        <thead>
          <tr>
            <th rowSpan={2} className="bg-purple-600 text-white px-3 py-2">No</th>
            <th rowSpan={2} className="bg-purple-600 text-white px-3 py-2 text-left">Nomor Surat Sanksi</th>
            <th rowSpan={2} className="bg-purple-600 text-white px-3 py-2 text-left">Nama Pihak</th>
            <th colSpan={3} className="bg-purple-700 text-white px-3 py-2 border-l border-white/40">INPUT SIPO</th>
            <th colSpan={2} className="bg-slate-700 text-white px-3 py-2 border-l border-white/40">INPUT SIPM</th>
            <th colSpan={2} className="bg-purple-800 text-white px-3 py-2 border-l border-white/40">PENGIRIMAN FISIK</th>
            <th colSpan={2} className="bg-slate-800 text-white px-3 py-2 border-l border-white/40">PENGIRIMAN EMAIL</th>
            <th rowSpan={2} className="bg-purple-600 text-white px-3 py-2 text-left">PIC Kasus</th>
            <th rowSpan={2} className="bg-purple-600 text-white px-3 py-2 text-left">Reviewer Kasub/Kabag</th>
          </tr>
          <tr className="text-[10px] uppercase">
            <th className="bg-purple-700 text-white px-2 py-2 text-left">Nama & Tgl Input</th>
            <th className="bg-purple-700 text-white px-2 py-2 text-left">Review</th>
            <th className="bg-purple-700 text-white px-2 py-2 text-left">Approve</th>
            <th className="bg-slate-700 text-white px-2 py-2 text-left">Status</th>
            <th className="bg-slate-700 text-white px-2 py-2 text-left">PIC</th>
            <th className="bg-purple-800 text-white px-2 py-2 text-left">Status</th>
            <th className="bg-purple-800 text-white px-2 py-2 text-left">Tgl</th>
            <th className="bg-slate-800 text-white px-2 py-2 text-left">Status</th>
            <th className="bg-slate-800 text-white px-2 py-2 text-left">Tgl</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-b align-top hover:bg-muted/40">
              <td className="px-3 py-3 text-right border-b">{r.no}</td>
              <td className="px-3 py-3 text-left font-mono border-b">{r.nomorSuratSanksi}</td>
              <td className="px-3 py-3 text-left max-w-[220px] whitespace-normal break-words font-medium border-b">{r.namaPihak}</td>
              <td className="px-2 py-3 text-left border-b">
                <div className="font-medium">{r.sipoInputNama}</div>
                <div className="text-muted-foreground text-right">{formatDate(r.sipoInputTgl)}</div>
              </td>
              <td className="px-2 py-3 text-left border-b">{r.sipoReview}</td>
              <td className="px-2 py-3 text-left border-b">{r.sipoApprove}</td>
              <td className="px-2 py-3 border-b">
                <Badge className={r.sipmStatus === "Sudah Input" ? "bg-emerald-600" : "bg-amber-500"}>{r.sipmStatus}</Badge>
              </td>
              <td className="px-2 py-3 text-left border-b">{r.sipmPIC}</td>
              <td className="px-2 py-3 border-b">
                <Badge className={r.pengirimanFisikStatus === "Terkirim" ? "bg-emerald-600" : "bg-amber-500"}>{r.pengirimanFisikStatus}</Badge>
              </td>
              <td className="px-2 py-3 text-right whitespace-nowrap border-b">{formatDate(r.pengirimanFisikTgl)}</td>
              <td className="px-2 py-3 border-b">
                <Badge className="bg-emerald-600">{r.pengirimanEmailStatus}</Badge>
              </td>
              <td className="px-2 py-3 text-right whitespace-nowrap border-b">{formatDate(r.pengirimanEmailTgl)}</td>
              <td className="px-2 py-3 text-left border-b">{r.picKasus}</td>
              <td className="px-2 py-3 text-left border-b">{r.reviewerKasub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
