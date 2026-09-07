"use client";
import { useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { saveGradesAction } from "./actions";

export type GradeStudentRow = {
  id: string;
  nis: string;
  name: string;
  existingScore: number | null;
};

type GradeFormProps = {
  classId: string;
  subjectId: string;
  semester: number;
  type: "UH" | "UTS" | "UAS";
  students: GradeStudentRow[];
};

export function GradeForm({ classId, subjectId, semester, type, students }: GradeFormProps) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    const scores = students
      .map((student) => ({
        studentId: student.id,
        score: formData.get(`score_${student.id}`),
      }))
      .filter((item) => item.score !== null && String(item.score).trim() !== "")
      .map((item) => ({ studentId: item.studentId, score: Number(item.score) }));

    startTransition(async () => {
      const result = await saveGradesAction({ classId, subjectId, semester, type, scores });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-oxford-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-oxford-100 bg-oxford-50/60 text-left">
              <th className="px-4 py-3 font-semibold text-oxford-800">Siswa</th>
              <th className="px-4 py-3 font-semibold text-oxford-800">NIS</th>
              <th className="w-40 px-4 py-3 font-semibold text-oxford-800">Nilai (0–100)</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-oxford-50 last:border-0">
                <td className="px-4 py-2.5 font-medium text-oxford-900">{student.name}</td>
                <td className="px-4 py-2.5 text-oxford-500">{student.nis}</td>
                <td className="px-4 py-2.5">
                  <Input
                    name={`score_${student.id}`}
                    type="number"
                    min={0}
                    max={100}
                    step="0.5"
                    defaultValue={student.existingScore ?? ""}
                    placeholder="—"
                    className="h-9 w-28"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} className="bg-oxford-900 hover:bg-oxford-800">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Nilai
        </Button>
      </div>
    </form>
  );
}
