interface NotesProps {
  notes: string;
  setNotes: (value: string) => void;
}

export const Notes = ({ notes, setNotes }: NotesProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
        Notes
        <span className="text-slate-400 font-normal">(optional)</span>
      </label>
      <textarea
        rows={3}
        placeholder="Add your thoughts..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all resize-none"
      />
    </div>
  );
};
