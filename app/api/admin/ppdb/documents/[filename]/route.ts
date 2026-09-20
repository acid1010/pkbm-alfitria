import { readFile } from "node:fs/promises";
import path from "node:path";

import { auth } from "@/lib/auth";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: Request,
  props: { params: Promise<{ filename: string }> },
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return Response.json({ message: "Tidak diizinkan." }, { status: 403 });
  }

  const { filename } = await props.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpe?g|png|pdf)$/i.test(filename)) {
    return Response.json({ message: "Nama berkas tidak valid." }, { status: 400 });
  }

  const uploadDir = process.env.PPDB_UPLOAD_DIR ?? path.join(process.cwd(), "data", "ppdb-uploads");
  const filePath = path.join(uploadDir, filename);
  try {
    const file = await readFile(filePath);
    const contentType = contentTypes[path.extname(filename).toLowerCase()] ?? "application/octet-stream";
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return Response.json({ message: "Berkas tidak ditemukan." }, { status: 404 });
  }
}
