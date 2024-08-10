import { useState, useEffect } from "react";
import Button from "@/components/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function DateRangeModalContent({
  onCancel,
  value,
  filter,
  onSave,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (filter.isSingleDate && value) {
      const dateString = value.split('=')[1];
      if (dateString) {
        const singleDate = parseISO(dateString);
        setStartDate(singleDate);
      }
    } else if (value) {
      const dates = value.split(',')
      const [start, end] = dates
      console.log(start, end);
      if (start) setStartDate(parseISO(start));
      if (end) setEndDate(parseISO(end));
    }
  }, [value, filter.isSingleDate]);


  function handleSave() {
    const startDateISO = format(startDate, 'yyyy-MM-dd');
    const endDateISO = format(endDate, 'yyyy-MM-dd');
  
    const query = filter.isSingleDate
      ? `${filter?.key}=${startDateISO}`
      : `${filter?.key}=${startDateISO},${endDateISO}`;
  
    const display = filter.isSingleDate
      ? `${filter?.label}: ${startDateISO}`
      : `${filter?.label}: ${startDateISO} - ${endDateISO}`;
  
    onSave({ query, filter, display });
  }
  

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-body_sm2_normal">
          {filter?.isSingleDate ? "Date" : "Start Date"}
        </p>
        <Popover>
          <PopoverTrigger className="w-full border gap-3 flex h-[40px] items-center">
            <div className="bg-gray-200 h-full w-[50px] flex items-center justify-center">
              <CalendarIcon className="h-4 w-4 opacity-50" />
            </div>
            <button
              variant="outline"
              className="w-full text-left text-body_sm1_medium"
            >
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {!filter.isSingleDate && (
        <div className="space-y-2">
          <p className="text-body_sm2_normal">End Date</p>
          <Popover>
            <PopoverTrigger className="w-full border gap-3 flex h-[40px] items-center">
              <div className="bg-gray-200 h-full w-[50px] flex items-center justify-center">
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </div>
              <button
                variant="outline"
                className="w-full text-left text-body_sm1_medium"
              >
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

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
