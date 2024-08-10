import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function MultiSelectDropdown({
  data,
  onChange,
  label,
  parseSelectionToJSON,
}) {
  const [selection, setSelection] = useState([]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white text-[14px] flex rounded-[4px] border border-neutral-100 overflow-hidden px-4 py-2">
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {data.map((opt, index) => (
          <DropdownMenuItem
            key={index}
            className={`${selection.includes(JSON.stringify(opt)) ? "bg-primary text-white" : "text-gray-800"} hover:bg-primary hover:text-white text-[0.84rem] mb-1 font-[300] p-2 cursor-pointer`}
          >
            <div
              className="w-full"
              onClick={() => {
                if (selection.includes(JSON.stringify(opt))) {
                  setSelection(
                    selection.filter((item) => item !== JSON.stringify(opt)),
                  );
                } else {
                  setSelection([...selection, JSON.stringify(opt)]);
                }
                onChange({
                  selection: parseSelectionToJSON
                    ? selection.map((item) => JSON.parse(item))
                    : selection,
                  selected: opt,
                });
              }}
            >
              {opt.description}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
