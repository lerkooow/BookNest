import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface AddCoverProps {
  coverUrl: string;
  setCoverUrl: (url: string) => void;
}

export const AddCover = ({ coverUrl, setCoverUrl }: AddCoverProps) => {
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
                Add a cover image URL below
              </p>
            </>
          )}
        </div>

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
