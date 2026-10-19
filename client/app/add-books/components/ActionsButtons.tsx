import Link from "next/link";

interface ActionsButtonsProps {
  saving: boolean;
}

export const ActionsButtons = ({ saving }: ActionsButtonsProps) => {
  return (
    <div className="mt-10 flex flex-col-reverse items-stretch justify-end gap-3 border-t border-slate-50 pt-4 sm:flex-row sm:items-center">
      <Link
        href="/"
        className="rounded-xl border border-slate-200 px-6 py-2.5 text-center text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
      >
        Cancel
      </Link>
      <button
        type="submit"
        disabled={saving}
        aria-busy={saving}
        className="rounded-xl bg-[#2D6A4F] px-6 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#23533E] disabled:cursor-wait disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Book"}
      </button>
    </div>
  );
};
