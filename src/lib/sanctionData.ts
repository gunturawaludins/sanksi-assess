// Mock data for Sanction Management & Monitoring System - Tahun Buku 2026
// Source of truth for all tabs. One ND Pelimpahan can penalize multiple parties.

export type JenisLaporan = "LKPPE" | "PLTE" | "EBUS" | "LBHU" | "MKBD";
export type StatusPembayaran = "Lunas" | "Belum Lunas" | "Dalam Proses";
export type StatusProses = "Selesai" | "On Process";
export type StatusTeguran = "Lunas" | "Belum Lunas" | "-";

export interface SanctionRecord {
  id: string;
  // Tab 2 - Pengenaan
  no: number;
  jenisLaporan: JenisLaporan;
  direktoratPelimpah: string;
  nomorNDPelimpahan: string;
  tanggalND: string;
  tanggalDiterima: string;
  dueDatePenyelesaian: string; // 15 HK
  permintaanInfoNo?: string;
  permintaanInfoTgl?: string;
  tanggapanInfoNo?: string;
  tanggapanInfoTgl?: string;
  penyelesaianNo?: string;
  penyelesaianTgl?: string;
  ketentuanDilanggar: string;
  detailPelanggaran: string;
  statusProses: StatusProses;

  // Tab 3 - Pembayaran
  namaPihak: string;
  selaku: string;
  nomorSuratSanksi: string;
  tanggalSuratSanksi: string;
  sanksiDenda: number;
  peringatanTertulis: boolean;
  statusPembayaran: StatusPembayaran;
  tanggalJatuhTempo30: string;
  tanggalBayar?: string;
  noBillingSIPO?: string;
  ajukanKeberatan: boolean;
  tanggapanKeberatanNo?: string;
  tanggapanKeberatanTgl?: string;
  tanggapanKeberatanStatus?: "Diterima" | "Ditolak";

  // Tab 4 - Penagihan
  teguran1?: TeguranData;
  teguran2?: TeguranData;
  teguran3?: TeguranData;
  piutangMacet?: PiutangMacet;

  // Tab 5 - SLA Internal
  sipoInputNama?: string;
  sipoInputTgl?: string;
  sipoReview?: string;
  sipoApprove?: string;
  sipmStatus?: string;
  sipmPIC?: string;
  pengirimanFisikStatus?: string;
  pengirimanFisikTgl?: string;
  pengirimanEmailStatus?: string;
  pengirimanEmailTgl?: string;
  picKasus: string;
  reviewerKasub: string;
}

export interface TeguranData {
  ndNo: string;
  ndTgl: string;
  nomorSurat: string;
  tanggalSurat: string;
  tanggalJatuhTempo: string;
  bunga: number;
  statusDendaBunga: StatusTeguran;
  suratTeguranInputSIPO: boolean;
}

export interface PiutangMacet {
  tanggalJatuhTempoPelimpahan: string;
  statusDendaSetelah1Tahun: string;
  ndPermintaanInfoPUPN?: string;
  ndPelimpahanPUPN?: string;
  statusCaseClose: "Open" | "Closed";
}

const PIC_LIST = ["Andini Pratiwi", "Budi Hartono", "Citra Lestari", "Dewi Anggraini", "Eko Saputra"];
const REVIEWER_LIST = ["Kasub Pengawasan I", "Kasub Pengawasan II", "Kabag Penindakan"];
const DIREKTORAT = ["Pengawasan Perusahaan Efek", "Pengawasan Manajer Investasi", "Pengawasan Transaksi Efek", "Pengawasan Lembaga Efek"];

const ENTITIES = [
  { nama: "PT Mirae Asset Sekuritas Indonesia", selaku: "Perusahaan Efek" },
  { nama: "PT Mandiri Manajemen Investasi", selaku: "Manajer Investasi" },
  { nama: "PT Trimegah Sekuritas Indonesia Tbk", selaku: "Perusahaan Efek" },
  { nama: "PT Schroder Investment Management Indonesia", selaku: "Manajer Investasi" },
  { nama: "PT Bahana TCW Investment Management", selaku: "Manajer Investasi" },
  { nama: "PT Indo Premier Sekuritas", selaku: "Perusahaan Efek" },
  { nama: "PT BNI Sekuritas", selaku: "Perusahaan Efek" },
  { nama: "PT Danareksa Investment Management", selaku: "Manajer Investasi" },
  { nama: "PT Mandiri Sekuritas", selaku: "Perusahaan Efek" },
  { nama: "PT Sucorinvest Asset Management", selaku: "Manajer Investasi" },
  { nama: "PT MNC Sekuritas", selaku: "Perusahaan Efek" },
  { nama: "PT Ashmore Asset Management Indonesia", selaku: "Manajer Investasi" },
  { nama: "PT CIMB Niaga Sekuritas", selaku: "Perusahaan Efek" },
  { nama: "PT Batavia Prosperindo Aset Manajemen", selaku: "Manajer Investasi" },
  { nama: "PT Panin Sekuritas Tbk", selaku: "Perusahaan Efek" },
  { nama: "PT Eastspring Investments Indonesia", selaku: "Manajer Investasi" },
  { nama: "PT BCA Sekuritas", selaku: "Perusahaan Efek" },
  { nama: "PT Manulife Aset Manajemen Indonesia", selaku: "Manajer Investasi" },
  { nama: "PT RHB Sekuritas Indonesia", selaku: "Perusahaan Efek" },
  { nama: "PT Syailendra Capital", selaku: "Manajer Investasi" },
];

const JENIS: JenisLaporan[] = ["LKPPE", "PLTE", "EBUS", "LBHU", "MKBD"];

const KETENTUAN_LIST = [
  "POJK No. 27/POJK.04/2019 Pasal 12 ayat (3)",
  "Peraturan Bapepam-LK No. X.K.1 angka 2",
  "POJK No. 14/POJK.04/2022 Pasal 8",
  "POJK No. 39/POJK.04/2025 Pasal 5 ayat (2)",
  "Peraturan BEI No. II-A Kep-00071/BEI/11-2013",
];

const DETAIL_LIST = [
  "Keterlambatan penyampaian Laporan Kegiatan Perusahaan Efek (LKPPE) untuk periode pelaporan triwulan III tahun 2025 sebanyak 14 hari kerja dari batas waktu yang ditentukan dalam ketentuan yang berlaku.",
  "Tidak menyampaikan Laporan Transaksi Efek (PLTE) atas transaksi obligasi korporasi senilai Rp 25.000.000.000 pada tanggal pelaporan yang telah ditetapkan oleh otoritas.",
  "Pelanggaran batas Modal Kerja Bersih Disesuaikan (MKBD) di bawah ketentuan minimum selama 3 hari kerja berturut-turut tanpa pemberitahuan terlebih dahulu kepada Bursa.",
  "Keterlambatan pelaporan posisi kepemilikan Efek Bersifat Utang dan Sukuk (EBUS) untuk periode bulanan sebanyak 7 hari kerja dari due date pelaporan.",
  "Tidak menyampaikan revisi Laporan Bulanan Hasil Underwriting (LBHU) setelah diminta klarifikasi oleh Departemen Pengawasan dalam batas waktu 5 hari kerja.",
];

function rp(amount: number) {
  return Math.round(amount);
}

function dateAdd(base: string, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const SANCTIONS: SanctionRecord[] = ENTITIES.map((entity, i) => {
  const jenis = JENIS[i % JENIS.length];
  const tanggalND = `2026-${String(((i % 9) + 1)).padStart(2, "0")}-${String(((i * 3) % 25) + 1).padStart(2, "0")}`;
  const tanggalDiterima = dateAdd(tanggalND, 1);
  const dueDate = dateAdd(tanggalDiterima, 21); // ~15 HK approx
  const tanggalSuratSanksi = dateAdd(tanggalDiterima, 14 + (i % 5));
  const jatuhTempo30 = dateAdd(tanggalSuratSanksi, 30);
  const denda = rp(50_000_000 + (i * 37_500_000) + (i % 4) * 125_000_000);

  // Distribute statuses for realism
  const statusBucket = i % 7;
  let statusPembayaran: StatusPembayaran;
  let statusProses: StatusProses;
  let tanggalBayar: string | undefined;
  let teguran1: TeguranData | undefined;
  let teguran2: TeguranData | undefined;
  let teguran3: TeguranData | undefined;
  let piutangMacet: PiutangMacet | undefined;

  if (statusBucket === 0 || statusBucket === 1) {
    statusPembayaran = "Lunas";
    statusProses = "Selesai";
    tanggalBayar = dateAdd(tanggalSuratSanksi, 15 + i);
  } else if (statusBucket === 2) {
    statusPembayaran = "Dalam Proses";
    statusProses = "On Process";
  } else if (statusBucket === 3) {
    statusPembayaran = "Belum Lunas";
    statusProses = "Selesai";
    teguran1 = {
      ndNo: `ND-${100 + i}/PE.2/2026`,
      ndTgl: dateAdd(jatuhTempo30, 3),
      nomorSurat: `S-${200 + i}/PE.2/2026`,
      tanggalSurat: dateAdd(jatuhTempo30, 5),
      tanggalJatuhTempo: dateAdd(jatuhTempo30, 35),
      bunga: rp(denda * 0.02),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
  } else if (statusBucket === 4) {
    statusPembayaran = "Belum Lunas";
    statusProses = "Selesai";
    teguran1 = {
      ndNo: `ND-${100 + i}/PE.2/2026`,
      ndTgl: dateAdd(jatuhTempo30, 3),
      nomorSurat: `S-${200 + i}/PE.2/2026`,
      tanggalSurat: dateAdd(jatuhTempo30, 5),
      tanggalJatuhTempo: dateAdd(jatuhTempo30, 35),
      bunga: rp(denda * 0.02),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
    teguran2 = {
      ndNo: `ND-${300 + i}/PE.2/2026`,
      ndTgl: dateAdd(jatuhTempo30, 40),
      nomorSurat: `S-${400 + i}/PE.2/2026`,
      tanggalSurat: dateAdd(jatuhTempo30, 42),
      tanggalJatuhTempo: dateAdd(jatuhTempo30, 72),
      bunga: rp(denda * 0.04),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
  } else if (statusBucket === 5) {
    statusPembayaran = "Belum Lunas";
    statusProses = "Selesai";
    teguran1 = {
      ndNo: `ND-${100 + i}/PE.2/2026`,
      ndTgl: dateAdd(jatuhTempo30, 3),
      nomorSurat: `S-${200 + i}/PE.2/2026`,
      tanggalSurat: dateAdd(jatuhTempo30, 5),
      tanggalJatuhTempo: dateAdd(jatuhTempo30, 35),
      bunga: rp(denda * 0.02),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
    teguran2 = {
      ndNo: `ND-${300 + i}/PE.2/2026`,
      ndTgl: dateAdd(jatuhTempo30, 40),
      nomorSurat: `S-${400 + i}/PE.2/2026`,
      tanggalSurat: dateAdd(jatuhTempo30, 42),
      tanggalJatuhTempo: dateAdd(jatuhTempo30, 72),
      bunga: rp(denda * 0.04),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
    teguran3 = {
      ndNo: `ND-${500 + i}/PE.2/2026`,
      ndTgl: dateAdd(jatuhTempo30, 75),
      nomorSurat: `S-${600 + i}/PE.2/2026`,
      tanggalSurat: dateAdd(jatuhTempo30, 78),
      tanggalJatuhTempo: dateAdd(jatuhTempo30, 108),
      bunga: rp(denda * 0.06),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
  } else {
    // PUPN / Piutang Macet case
    statusPembayaran = "Belum Lunas";
    statusProses = "Selesai";
    teguran1 = {
      ndNo: `ND-${100 + i}/PE.2/2025`,
      ndTgl: "2025-02-10",
      nomorSurat: `S-${200 + i}/PE.2/2025`,
      tanggalSurat: "2025-02-15",
      tanggalJatuhTempo: "2025-03-17",
      bunga: rp(denda * 0.02),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
    teguran2 = {
      ndNo: `ND-${300 + i}/PE.2/2025`,
      ndTgl: "2025-03-22",
      nomorSurat: `S-${400 + i}/PE.2/2025`,
      tanggalSurat: "2025-03-25",
      tanggalJatuhTempo: "2025-04-25",
      bunga: rp(denda * 0.04),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
    teguran3 = {
      ndNo: `ND-${500 + i}/PE.2/2025`,
      ndTgl: "2025-05-02",
      nomorSurat: `S-${600 + i}/PE.2/2025`,
      tanggalSurat: "2025-05-05",
      tanggalJatuhTempo: "2025-06-05",
      bunga: rp(denda * 0.06),
      statusDendaBunga: "Belum Lunas",
      suratTeguranInputSIPO: true,
    };
    piutangMacet = {
      tanggalJatuhTempoPelimpahan: "2026-02-15",
      statusDendaSetelah1Tahun: "Belum Lunas - Lewat 1 Tahun",
      ndPermintaanInfoPUPN: `ND-PUPN-${700 + i}/PE.2/2026`,
      ndPelimpahanPUPN: `ND-PUPN-${800 + i}/PE.2/2026`,
      statusCaseClose: "Open",
    };
  }

  const pic = PIC_LIST[i % PIC_LIST.length];

  return {
    id: `SNC-${String(i + 1).padStart(4, "0")}`,
    no: i + 1,
    jenisLaporan: jenis,
    direktoratPelimpah: DIREKTORAT[i % DIREKTORAT.length],
    nomorNDPelimpahan: `ND-${1000 + i}/PM.2/2026`,
    tanggalND,
    tanggalDiterima,
    dueDatePenyelesaian: dueDate,
    permintaanInfoNo: i % 4 === 0 ? `ND-INF-${i}/PE.2/2026` : undefined,
    permintaanInfoTgl: i % 4 === 0 ? dateAdd(tanggalDiterima, 3) : undefined,
    tanggapanInfoNo: i % 4 === 0 && i % 8 !== 0 ? `S-INF-${i}/2026` : undefined,
    tanggapanInfoTgl: i % 4 === 0 && i % 8 !== 0 ? dateAdd(tanggalDiterima, 8) : undefined,
    penyelesaianNo: statusProses === "Selesai" ? `ND-SLS-${i}/PE.2/2026` : undefined,
    penyelesaianTgl: statusProses === "Selesai" ? dateAdd(tanggalDiterima, 12) : undefined,
    ketentuanDilanggar: KETENTUAN_LIST[i % KETENTUAN_LIST.length],
    detailPelanggaran: DETAIL_LIST[i % DETAIL_LIST.length],
    statusProses,
    namaPihak: entity.nama,
    selaku: entity.selaku,
    nomorSuratSanksi: `S-${700 + i}/PE.2/2026`,
    tanggalSuratSanksi,
    sanksiDenda: denda,
    peringatanTertulis: i % 3 === 0,
    statusPembayaran,
    tanggalJatuhTempo30: jatuhTempo30,
    tanggalBayar,
    noBillingSIPO: tanggalBayar ? `BIL-${2026000 + i}` : undefined,
    ajukanKeberatan: i % 6 === 2,
    tanggapanKeberatanNo: i % 6 === 2 ? `S-KBR-${i}/PE.2/2026` : undefined,
    tanggapanKeberatanTgl: i % 6 === 2 ? dateAdd(tanggalSuratSanksi, 18) : undefined,
    tanggapanKeberatanStatus: i % 6 === 2 ? (i % 12 === 2 ? "Diterima" : "Ditolak") : undefined,
    teguran1,
    teguran2,
    teguran3,
    piutangMacet,
    sipoInputNama: pic,
    sipoInputTgl: dateAdd(tanggalSuratSanksi, 1),
    sipoReview: REVIEWER_LIST[i % REVIEWER_LIST.length],
    sipoApprove: REVIEWER_LIST[(i + 1) % REVIEWER_LIST.length],
    sipmStatus: i % 2 === 0 ? "Sudah Input" : "Pending",
    sipmPIC: pic,
    pengirimanFisikStatus: i % 3 === 0 ? "Terkirim" : "Dalam Proses",
    pengirimanFisikTgl: dateAdd(tanggalSuratSanksi, 2),
    pengirimanEmailStatus: "Terkirim",
    pengirimanEmailTgl: dateAdd(tanggalSuratSanksi, 1),
    picKasus: pic,
    reviewerKasub: REVIEWER_LIST[i % REVIEWER_LIST.length],
  };
});

export const PIC_OPTIONS = PIC_LIST;
export const JENIS_OPTIONS = JENIS;

export function formatRp(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function formatDate(s?: string): string {
  if (!s) return "-";
  const d = new Date(s);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

// Working day calculation excluding weekends + Indonesian national holidays (2026 sample)
const HOLIDAYS_2026 = new Set([
  "2026-01-01", "2026-02-17", "2026-03-19", "2026-03-20", "2026-04-03",
  "2026-04-14", "2026-05-01", "2026-05-14", "2026-05-21", "2026-06-01",
  "2026-06-26", "2026-08-17", "2026-12-25",
]);

export function workingDaysBetween(start: string, end: string, mode: "sejak" | "setelah" = "setelah"): number {
  const s = new Date(start);
  const e = new Date(end);
  if (mode === "setelah") s.setDate(s.getDate() + 1);
  let count = 0;
  const cur = new Date(s);
  while (cur <= e) {
    const day = cur.getDay();
    const iso = cur.toISOString().slice(0, 10);
    if (day !== 0 && day !== 6 && !HOLIDAYS_2026.has(iso)) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export function slaStatus(rec: SanctionRecord): { hk: number; effective: number; flag: "ok" | "warn" | "over" } {
  const today = new Date("2026-06-15"); // demo "today"
  const todayIso = today.toISOString().slice(0, 10);
  const endIso = rec.statusProses === "Selesai" && rec.penyelesaianTgl ? rec.penyelesaianTgl : todayIso;
  const total = workingDaysBetween(rec.tanggalDiterima, endIso, "sejak");
  // Clock stop: subtract days between permintaan info and tanggapan info
  let paused = 0;
  if (rec.permintaanInfoTgl && rec.tanggapanInfoTgl) {
    paused = workingDaysBetween(rec.permintaanInfoTgl, rec.tanggapanInfoTgl, "setelah");
  } else if (rec.permintaanInfoTgl && !rec.tanggapanInfoTgl) {
    paused = workingDaysBetween(rec.permintaanInfoTgl, endIso, "setelah");
  }
  const effective = Math.max(0, total - paused);
  let flag: "ok" | "warn" | "over" = "ok";
  if (effective > 15) flag = "over";
  else if (rec.statusProses === "On Process" && effective >= 12) flag = "warn";
  return { hk: total, effective, flag };
}
