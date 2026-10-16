interface BookDetailsProps {
  title: string;
  setTitle: (title: string) => void;
  author: string;
  setAuthor: (author: string) => void;
}

export const BookDetails = ({
  title,
  setTitle,
  author,
  setAuthor,
}: BookDetailsProps & {
  author: string;
  setAuthor: (author: string) => void;
}) => {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700">
          Author <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
        />
      </div>
    </>
  );
};
