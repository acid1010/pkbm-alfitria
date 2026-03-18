import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function PageShell({ title, description, rightSlot, children, className }: PageShellProps) {
  return (
    <section className={cn("flex flex-col min-h-[calc(100vh-200px)]", className)}>
      {/* Page Header — oxford-950 with gold accent, consistent with landing hero */}
      <header className="bg-oxford-950 relative overflow-hidden text-center py-20 md:py-28 pt-24 md:pt-32">
        {/* Decorative elements matching landing page */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-oxford-400/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        {/* Gold accent bar at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-[1200px]">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-oxford-300 font-medium leading-relaxed">
            {description}
          </p>
          {rightSlot && <div className="mt-6 flex justify-center">{rightSlot}</div>}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="bg-oxford-50/50 flex-1 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
          {children}
        </div>
      </div>
    </section>
  );
}
