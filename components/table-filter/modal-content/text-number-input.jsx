import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";
import "react-range-slider-input/dist/style.css";

export default function TextNumberInputContent({onCancel, filter, value, onSave, type="number" }) {
  const [inputValue, setInputValue] = useState(value ?? null);

  function handleSave() {
    onSave({
      query: `${filter?.key}=${inputValue}`,
      filter,
      display: `${filter?.label}: ${inputValue}`,
    });
  }

  return (
    <div className="">
      <Input
        value={inputValue}
        onChange={({ target: { value } }) => {
          console.log(value);
          setInputValue(value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
        }}
        type={filter?.inputType ?? type}
        label={filter?.label}
        placeholder={filter?.placeholder}
      />
      <div className="flex items-center justify-end gap-[9px] mt-[16px]">
        <Button
          onClick={onCancel}
          className="!bg-primary-50 !text-primary-600  !w-[81px]"
        >
          Cancel
        </Button>
        <Button onClick={handleSave} className=" !w-[74px]">
          Save
        </Button>
      </div>
    </div>
  );
}
