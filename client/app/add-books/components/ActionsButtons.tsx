import Link from "next/link";

interface ActionsButtonsProps {
  saving: boolean;
}

export const ActionsButtons = ({ saving }: ActionsButtonsProps) => {
  return (
    <div className="flex items-center justify-end gap-3 mt-10 pt-4 border-t border-slate-50">
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-xs hover:bg-slate-50 transition-colors"
      >
        Cancel
      </Link>
      <button
        type="submit"
        disabled={saving}
        aria-busy={saving}
        className="px-6 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#23533E] text-white font-medium text-xs transition-colors shadow-sm disabled:cursor-wait disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Book"}
      </button>
    </div>
  );
};
