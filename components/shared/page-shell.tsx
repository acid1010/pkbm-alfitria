import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: "public" | "portal";
};

export function PageShell({ title, description, rightSlot, children, className, variant = "public" }: PageShellProps) {
  if (variant === "portal") {
    return (
      <section className={cn("min-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-oxford-100 bg-[#f7f8f4]", className)}>
        <header className="border-b border-oxford-100 px-5 py-7 md:flex md:items-end md:justify-between md:gap-8 md:px-8 md:py-9">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-oxford-950 md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-oxford-600 md:text-base">{description}</p>
          </div>
          {rightSlot ? <div className="mt-5 flex shrink-0 items-center gap-2 md:mt-0">{rightSlot}</div> : null}
        </header>
        <div className="space-y-6 px-5 py-6 md:px-8 md:py-8">{children}</div>
      </section>
    );
  }

  return (
    <section className={cn("flex min-h-[calc(100vh-200px)] flex-col", className)}>
      <header className="relative overflow-hidden bg-oxford-950 py-10 pt-14 text-center md:py-14 md:pt-16">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-gold-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/3 rounded-full bg-oxford-400/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
        <div className="container relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
          <h1 className="mb-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">{title}</h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-oxford-300 md:text-lg">{description}</p>
          {rightSlot ? <div className="mt-6 flex justify-center">{rightSlot}</div> : null}
        </div>
      </header>
      <div className="flex-1 bg-oxford-50/50 py-10 lg:py-14">
        <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">{children}</div>
      </div>
    </section>
  );
}
