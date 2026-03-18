"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

type PPDBRow = {
  registrationNumber: string;
  name: string;
  phone: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

const statusVariant: Record<PPDBRow["status"], "warning" | "success" | "danger"> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
};

export const adminPpdbColumns: ColumnDef<PPDBRow>[] = [
  {
    accessorKey: "registrationNumber",
    header: "No. Registrasi",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "phone",
    header: "No. HP",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.original.status;
      return <Badge variant={statusVariant[value]}>{value}</Badge>;
    },
  },
];
