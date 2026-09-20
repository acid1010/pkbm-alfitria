import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  accent?: string;
};

export function StatCard({ title, value, description, accent = "bg-gold-500" }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-xl border-oxford-100 bg-white shadow-none">
      <span className={`absolute inset-y-0 left-0 w-1 ${accent}`} aria-hidden="true" />
      <CardHeader className="pb-1 pl-6">
        <CardTitle className="text-sm font-semibold text-oxford-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-6">
        <div className="text-4xl font-bold tracking-tight text-oxford-950">{value}</div>
        {description ? <p className="mt-1 text-xs leading-5 text-oxford-500">{description}</p> : null}
      </CardContent>
    </Card>
  );
}
