"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, RefreshCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SelfieCaptureProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

export function SelfieCapture({ value, onChange, disabled = false }: SelfieCaptureProps) {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraFailed, setCameraFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const previewUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const stopCamera = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.srcObject = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  useEffect(() => {
    if (!cameraOpen || !videoRef.current || !streamRef.current) return;

    const video = videoRef.current;
    const stream = streamRef.current;
    video.srcObject = stream;
    video.muted = true;

    const startVideo = () => {
      video.play().catch(() => {
        setCameraFailed(true);
        stopCamera();
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      startVideo();
    } else {
      video.addEventListener("loadedmetadata", startVideo, { once: true });
    }

    return () => video.removeEventListener("loadedmetadata", startVideo);
  }, [cameraOpen]);

  useEffect(() => () => stopCamera(), []);

  const openCamera = async () => {
    setCameraFailed(false);
    onChange(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraFailed(true);
      return;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setCameraOpen(true);
    } catch {
      setCameraFailed(true);
    }
  };

  const snap = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onChange(new File([blob], "selfie.jpg", { type: "image/jpeg" }));
        stopCamera();
      },
      "image/jpeg",
      0.9,
    );
  };

  return (
    <div className="block text-sm font-semibold text-oxford-800">Selfie kehadiran
      {cameraOpen ? (
        <div className="mt-2 space-y-3">
          <div className="overflow-hidden rounded-xl border border-oxford-200 bg-oxford-950">
            <video ref={videoRef} playsInline muted autoPlay className="w-full -scale-x-100" />
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={snap} className="h-12 flex-1 bg-gold-500 font-bold text-oxford-950 hover:bg-gold-400">
              <Camera className="mr-2 h-4 w-4" /> Ambil Foto
            </Button>
            <Button type="button" variant="outline" onClick={stopCamera} className="h-12">
              <X className="mr-1 h-4 w-4" /> Tutup
            </Button>
          </div>
        </div>
      ) : value && previewUrl ? (
        <div className="mt-2 space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Pratinjau selfie" className="w-44 rounded-xl border border-oxford-200" />
          <Button type="button" variant="outline" onClick={openCamera} disabled={disabled} className="h-12">
            <RefreshCw className="mr-2 h-4 w-4" /> Ambil Ulang
          </Button>
        </div>
      ) : cameraFailed ? (
        <>
          <Input type="file" accept="image/*" capture="user" className="mt-2 h-12 cursor-pointer rounded-xl border-oxford-200" onChange={(event) => onChange(event.target.files?.[0] ?? null)} disabled={disabled} />
          <span className="mt-2 block text-xs font-normal text-oxford-500">Kamera tidak tersedia — gunakan tombol di atas untuk membuka kamera perangkat. JPG/PNG, maksimal 5 MB.</span>
        </>
      ) : (
        <>
          <Button type="button" onClick={openCamera} disabled={disabled} className="mt-2 h-12 w-full bg-oxford-900 hover:bg-oxford-800">
            <Camera className="mr-2 h-5 w-5" /> Buka Kamera
          </Button>
          <span className="mt-2 block text-xs font-normal text-oxford-500">Foto hanya dapat diambil langsung dari kamera (JPG, maksimal 5 MB). Unggah berkas tidak diizinkan.</span>
        </>
      )}
      {value && !previewUrl ? <p className="mt-2 rounded-lg bg-oxford-50 px-3 py-2 text-sm font-normal text-oxford-700">Foto dipilih: {value.name}</p> : null}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
