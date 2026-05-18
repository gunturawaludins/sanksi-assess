import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { JENIS_OPTIONS, PIC_OPTIONS } from "@/lib/sanctionData";

export interface FilterState {
  jenis: string;
  status: string;
  pic: string;
}

interface Props {
  value: FilterState;
  onChange: (v: FilterState) => void;
  onExport: () => void;
}

export function Filters({ value, onChange, onExport }: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Jenis Laporan</label>
        <Select value={value.jenis} onValueChange={(v) => onChange({ ...value, jenis: v })}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Jenis</SelectItem>
            {JENIS_OPTIONS.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Status Pembayaran</label>
        <Select value={value.status} onValueChange={(v) => onChange({ ...value, status: v })}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Lunas">Lunas</SelectItem>
            <SelectItem value="Belum Lunas">Belum Lunas</SelectItem>
            <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">PIC</label>
        <Select value={value.pic} onValueChange={(v) => onChange({ ...value, pic: v })}>
          <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua PIC</SelectItem>
            {PIC_OPTIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-auto">
        <Button onClick={onExport} variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>
    </div>
  );
}
