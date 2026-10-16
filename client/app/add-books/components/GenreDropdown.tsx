import { ChevronDown } from "lucide-react";
import { genresData } from "../hooks/useAddBooks";

export const GenreDropdown = ({
  genre,
  setGenre,
}: {
  genre: string;
  setGenre: (genre: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700">
        Genre <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all pr-10 cursor-pointer"
        >
          <option value="" disabled hidden>
            Select genre
          </option>
          {genresData.slice(1).map((genreOption) => (
            <option key={genreOption} value={genreOption}>
              {genreOption}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
