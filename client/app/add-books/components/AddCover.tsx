import { ChangeEvent, useRef } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";

interface AddCoverProps {
  coverUrl: string;
  setCoverUrl: (url: string) => void;
  onError: (message: string) => void;
}

const maxCoverSize = 2 * 1024 * 1024;
const allowedCoverTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const AddCover = ({
  coverUrl,
  setCoverUrl,
  onError,
}: AddCoverProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!allowedCoverTypes.includes(file.type)) {
      onError("Choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > maxCoverSize) {
      onError("The cover image must be 2 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCoverUrl(reader.result);
      } else {
        onError("Could not read the selected image.");
      }
    };
    reader.onerror = () => onError("Could not read the selected image.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="md:col-span-5 flex flex-col items-center">
      <div className="w-full border border-slate-200/80 rounded-2xl p-4 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
        <div className="relative aspect-[5/4] w-full rounded-xl bg-[#F8FAFC] border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt="Book cover preview"
              fill
              unoptimized
              sizes="(max-width: 768px) 90vw, 40vw"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 text-slate-500">
                <ImageIcon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <p className="text-xs text-slate-400 max-w-[160px] leading-relaxed mb-4">
                Add a cover image using a URL or upload one from your device
              </p>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            aria-label="Upload a book cover from your device"
            className="sr-only"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20"
          >
            <Upload aria-hidden="true" size={15} />
            Upload from device
          </button>
          {coverUrl && (
            <button
              type="button"
              onClick={() => setCoverUrl("")}
              aria-label="Remove cover image"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
            >
              <X aria-hidden="true" size={16} />
            </button>
          )}
        </div>
        <p className="mt-1.5 text-center text-[11px] text-slate-400">
          JPEG, PNG, WebP, or GIF. Maximum size: 2 MB.
        </p>
        <input
          type="url"
          placeholder="https://example.com/cover.jpg"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          aria-label="Cover image URL"
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
        />
      </div>
    </div>
  );
};
