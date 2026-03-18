import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-oxford-50 flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
