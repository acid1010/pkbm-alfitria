import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  description?: string;
};

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="rounded-2xl border-oxford-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-heading text-4xl font-bold text-oxford-950">{value}</div>
        {description ? <p className="mt-1 text-xs text-oxford-500">{description}</p> : null}
      </CardContent>
    </Card>
  );
}
