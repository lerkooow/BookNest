import { ChevronDown } from "lucide-react";

interface StatusDropdownProps {
  status: string;
  handleStatusChange: (value: string) => void;
}

export const StatusDropdown = ({
  status,
  handleStatusChange,
}: StatusDropdownProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700">Status</label>
      <div className="relative">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all pr-10 cursor-pointer font-medium"
        >
          <option value="WANT_TO_READ">🟠 Want to Read</option>
          <option value="CURRENTLY_READING">🔵 Currently Reading</option>
          <option value="FINISHED">🟢 Finished</option>
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
