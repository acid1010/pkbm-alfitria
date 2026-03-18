"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, Upload, CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

import { ppdbSchema, type PpdbInput } from "@/lib/validations/ppdb";
import { submitPpdbAction } from "@/app/(public)/ppdb/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const steps = [
  { label: "Data Pribadi", icon: ClipboardList },
  { label: "Upload Dokumen", icon: Upload },
  { label: "Konfirmasi", icon: CheckCircle2 },
];

export function PpdbForm() {
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();

  const form = useForm<PpdbInput>({
    resolver: zodResolver(ppdbSchema),
    defaultValues: {
      name: "",
      birthdate: "",
      address: "",
      phone: "",
      documents: [],
    },
  });

  const onSubmit = (values: PpdbInput) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("birthdate", values.birthdate);
    formData.set("address", values.address);
    formData.set("phone", values.phone);

    values.documents.forEach((doc) => formData.append("documents", doc));

    selectedFiles.forEach((file) => {
      formData.append("fileUpload", file);
    });

    startTransition(async () => {
      const result = await submitPpdbAction(formData);
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(`${result.message} No registrasi: ${result.registrationNumber}`);
      form.reset();
      setSelectedFiles([]);
      setStep(0);
    });
  };

  return (
    <div className="rounded-2xl border border-oxford-100 bg-white shadow-sm overflow-hidden">
      {/* Step indicator */}
      <div className="border-b border-oxford-100 bg-oxford-50/30 px-6 py-5 md:px-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    i <= step
                      ? "bg-oxford-900 text-gold-400 shadow-md"
                      : "bg-oxford-100 text-oxford-400"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-xs font-semibold transition-colors duration-300 ${
                    i <= step ? "text-oxford-900" : "text-oxford-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden sm:block w-16 h-px mx-2 mb-5 transition-colors duration-300 ${
                    i < step ? "bg-gold-400" : "bg-oxford-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="p-6 md:p-8 lg:p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 0 ? (
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford-800 font-semibold">Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama calon siswa"
                          className="h-12 rounded-xl border-oxford-200 focus:border-gold-400 focus:ring-gold-400/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford-800 font-semibold">Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-12 rounded-xl border-oxford-200 focus:border-gold-400 focus:ring-gold-400/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford-800 font-semibold">Alamat</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alamat lengkap"
                          className="h-12 rounded-xl border-oxford-200 focus:border-gold-400 focus:ring-gold-400/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford-800 font-semibold">No. HP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="08xxxx"
                          className="h-12 rounded-xl border-oxford-200 focus:border-gold-400 focus:ring-gold-400/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : null}

            {step === 1 ? (
              <FormField
                control={form.control}
                name="documents"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-oxford-800 font-semibold">Dokumen Pendukung</FormLabel>
                    <FormControl>
                      <div className="rounded-xl border-2 border-dashed border-oxford-200 hover:border-gold-300 transition-colors duration-300 p-8 text-center">
                        <Upload className="h-10 w-10 text-oxford-300 mx-auto mb-3" />
                        <p className="text-oxford-500 text-sm mb-3">Seret file ke sini atau klik untuk memilih</p>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          className="h-12 rounded-xl border-oxford-200 cursor-pointer"
                          onChange={(event) => {
                            const files = Array.from(event.target.files ?? []);
                            const docs = files.map((file) => file.name);
                            setSelectedFiles(files);
                            form.setValue("documents", docs, { shouldValidate: true });
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-oxford-400">
                      Unggah dokumen pendukung (PDF/JPG/PNG/DOC). Maks. 5 file.
                    </FormDescription>
                    {selectedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {selectedFiles.map((file) => (
                          <div key={file.name} className="flex items-center gap-2 text-sm text-oxford-600 bg-oxford-50 rounded-lg px-3 py-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-oxford-100 bg-oxford-50/50 p-5">
                  <h3 className="font-semibold text-oxford-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold-500" />
                    Ringkasan Data Pendaftaran
                  </h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between border-b border-oxford-100 pb-2">
                      <span className="text-oxford-500">Nama</span>
                      <span className="font-medium text-oxford-800">{form.getValues("name") || "-"}</span>
                    </div>
                    <div className="flex justify-between border-b border-oxford-100 pb-2">
                      <span className="text-oxford-500">Tanggal Lahir</span>
                      <span className="font-medium text-oxford-800">{form.getValues("birthdate") || "-"}</span>
                    </div>
                    <div className="flex justify-between border-b border-oxford-100 pb-2">
                      <span className="text-oxford-500">Alamat</span>
                      <span className="font-medium text-oxford-800 text-right max-w-[200px]">{form.getValues("address") || "-"}</span>
                    </div>
                    <div className="flex justify-between border-b border-oxford-100 pb-2">
                      <span className="text-oxford-500">No. HP</span>
                      <span className="font-medium text-oxford-800">{form.getValues("phone") || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-oxford-500">Dokumen</span>
                      <span className="font-medium text-oxford-800">{selectedFiles.length} file</span>
                    </div>
                  </div>
                </div>
                <p className="text-oxford-500 text-sm text-center">
                  Periksa kembali data di atas sebelum mengirim pendaftaran.
                </p>
              </div>
            ) : null}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-oxford-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                disabled={step === 0}
                className="rounded-full border-oxford-200 text-oxford-700 hover:bg-oxford-50 font-semibold px-6 h-12 transition-all duration-300"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Kembali
              </Button>
              {step < 2 ? (
                <Button
                  type="button"
                  onClick={() => setStep((prev) => Math.min(2, prev + 1))}
                  className="bg-gold-500 hover:bg-gold-400 text-oxford-950 font-bold rounded-full px-6 h-12 shadow-md transition-all duration-300"
                >
                  Lanjut
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-gold-500 hover:bg-gold-400 text-oxford-950 font-bold rounded-full px-8 h-12 shadow-md transition-all duration-300"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Kirim Pendaftaran"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
