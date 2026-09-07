"use client";
import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AbsensiExportRow = {
  name: string;
  nis: string;
  status: string; // already labeled (Hadir/Izin/Sakit/Alpha/Belum hadir)
  checkIn: string; // "HH:MM" or "—"
};

type ExportButtonProps = {
  className: string;
  date: string; // yyyy-mm-dd
  rows: AbsensiExportRow[];
};

export function AbsensiExportButton({ className, date, rows }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const onExport = async () => {
    setIsExporting(true);
    try {
      // Lazy-load so ExcelJS is not part of the initial bundle
      const ExcelJS = (await import("exceljs")).default;

      const workbook = new ExcelJS.Workbook();
      workbook.creator = "PKBM Al-Fitria";
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet("Rekap Absensi");
      worksheet.columns = [
        { header: "No", key: "no", width: 6 },
        { header: "Nama Siswa", key: "name", width: 32 },
        { header: "NIS", key: "nis", width: 16 },
        { header: "Status Kehadiran", key: "status", width: 20 },
        { header: "Jam Check-in (WIB)", key: "checkIn", width: 20 },
      ];

      rows.forEach((row, index) => {
        worksheet.addRow({
          no: index + 1,
          name: row.name,
          nis: row.nis,
          status: row.status,
          checkIn: row.checkIn,
        });
      });

      // Header styling: bold white on navy, matching the portal theme
      const header = worksheet.getRow(1);
      header.font = { bold: true, color: { argb: "FFFFFFFF" } };
      header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F2A52" } };
      header.alignment = { vertical: "middle" };
      header.height = 22;

      // Status cell tinting
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const cell = row.getCell("status");
        const value = String(cell.value ?? "");
        if (value === "Hadir") {
          cell.font = { color: { argb: "FF166534" }, bold: true };
        } else if (value === "Alpha" || value === "Belum hadir") {
          cell.font = { color: { argb: "FFB91C1C" }, bold: true };
        } else {
          cell.font = { color: { argb: "FF92400E" }, bold: true };
        }
      });

      // Borders on the whole table
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin", color: { argb: "FFD6DCE5" } },
            left: { style: "thin", color: { argb: "FFD6DCE5" } },
            bottom: { style: "thin", color: { argb: "FFD6DCE5" } },
            right: { style: "thin", color: { argb: "FFD6DCE5" } },
          };
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();

      // Trigger download client-side
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Rekap-Absensi-${className.replace(/[^\w-]+/g, "-")}-${date}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button variant="outline" onClick={onExport} disabled={isExporting || !rows.length}>
      {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
      Ekspor Excel
    </Button>
  );
}
