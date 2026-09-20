import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

function getSelfieUploadDir(): string {
  return process.env.SELFIE_UPLOAD_DIR ?? path.join(process.cwd(), "data", "selfies");
}

export function getSelfieUrl(relativePath: string): string {
  return `/api/guru/absensi/selfie/${relativePath.split("/").map(encodeURIComponent).join("/")}`;
}

export function getSelfieFilePath(relativePath: string): string {
  const normalizedPath = path.normalize(relativePath);
  if (
    path.isAbsolute(relativePath) ||
    normalizedPath !== relativePath ||
    normalizedPath.startsWith(`..${path.sep}`)
  ) {
    throw new Error("Invalid selfie path.");
  }

  return path.join(getSelfieUploadDir(), normalizedPath);
}

export async function saveSelfie(relativePath: string, data: Uint8Array): Promise<void> {
  const filePath = getSelfieFilePath(relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, data, { flag: "wx" });
}

export async function removeSelfie(relativePath: string): Promise<void> {
  await rm(getSelfieFilePath(relativePath), { force: true });
}

export async function readSelfie(relativePath: string): Promise<Buffer> {
  return readFile(getSelfieFilePath(relativePath));
}
