import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import Button from "../button";
import CenteredModal from "../centered-modal";
import DateRangeModalContent from "./modal-content/date-range";
import TextNumberInputContent from "./modal-content/text-number-input";
import buildFilterQuery from "@/lib/utils/build-filter-query";
import useOutClicked from "@/hooks/useOutClicked";

export const TableFilter = forwardRef(
  ({ showFilter, onFilterSave, filterColumns }, ref) => {
    const filterDropdownRef = useRef(null);
    const [showFilterDropDown, setShowFilterDropDown] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(null);
    const [filters, setFilters] = useState([]);

    useOutClicked(filterDropdownRef, () => setShowFilterDropDown(false));

    const resetFilters = () => {
      setFilters([]);
      setCurrentFilter(null);
    };

    function toggleFilterDropDown() {
      setShowFilterDropDown((prev) => !prev);
    }

    useImperativeHandle(ref, () => ({
      resetFilters,
    }));

    useEffect(() => {
      const finalQuery = buildFilterQuery(filters);
      onFilterSave && onFilterSave(finalQuery); // send the final query to the parent component
    }, [filters]);

    // when the filter to be saved is already in the list of filters, update the filter with the new value, else add the filter to the list of filters
    function handleSaveFilter(filterData) {
      const value = filterData.query.split("=")[1];

      if (value === "null") return setCurrentFilter(null); // if no value is selected, close the modal

      setFilters((prev) => [
        ...prev,
        {
          ...filterData,
          queryValue: value,
        },
      ]);

      const filterExists = filters.some(
        (filter) => filter.filter.key === filterData.filter.key
      );

      if (filterExists) {
        const updatedFilters = filters.map((f) => {
          if (f.filter.key === filterData.filter.key) {
            return {
              ...filterData,
              queryValue: value,
            };
          }
          return f;
        });
        setFilters(updatedFilters);
      }

      setCurrentFilter(null); // setting current filter to null to close the modal
    }

    function handleCloseModal() {
      setCurrentFilter(null);
    }

    if (!showFilter) return;

    return (
      <>
        <div className="flex items-center gap-[9px] mb-[27px]">
          <div>
            <i class="ri-list-check text-body_lg1_normal text-neutral-400"></i>
          </div>
          <div className="flex items-center gap-[9px] ">
            <ul className="flex items-center flex-wrap gap-[9px]">
              {filters.map((filter) => {
                const description = filter.display.split(":")[0];
                const value = filter.display.split(":")[1];

                return (
                  <li
                    key={filter}
                    onClick={() => {
                      setCurrentFilter(filter.filter);
                    }}
                  >
                    <Button
                      className="capitalize gap-3 select-all text-primary-600 bg-primary-50"
                      variant="ghost"
                    >
                      <p className=" text-text_xs_medium font-medium">
                        <span className=" text-primary-300">{description}</span>
                        <span>: {value}</span>
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const f = filters.filter(
                            (f) => f.query !== filter.query
                          );
                          setFilters(f);
                        }}
                        className="bg-white text-red-500 p-1 rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        <i class="ri-close-line"></i>
                      </button>
                    </Button>
                  </li>
                );
              })}
              <li>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-neutral-50 flex items-center justify-center w-[122px] "
                    onClick={() => setShowFilterDropDown(!showFilterDropDown)}
                  >
                    <i className="ri-add-line text-neutral-900"></i>
                    <p className=" text-body_sm1_normal text-neutral-900 flex-1">
                      Add Filter
                    </p>
                    <i class="ri-arrow-down-s-fill"></i>
                  </Button>
                  {showFilterDropDown && (
                    <FilterDropDown
                      onClose={toggleFilterDropDown}
                      filterColumns={filterColumns}
                      setCurrentFilter={setCurrentFilter}
                      ref={filterDropdownRef}
                    />
                  )}
                </div>
              </li>

              {filters.length > 0 && (
                <li className="flex gap-[9px] items-center">
                  <Button
                    type="button"
                    variant="outline"
                    className=" border bg-white border-input flex items-center justify-center w-[122px] gap-2"
                    onClick={resetFilters}
                  >
                    <span>
                      {" "}
                      <i class="ri-delete-bin-line text-danger"></i>
                    </span>
                    <p className=" text-body_sm1_normal text-danger ">
                      Clear Filters
                    </p>
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <CenteredModal
          show={currentFilter !== null}
          onClose={() => handleCloseModal()}
          title={`Filter by ${currentFilter?.label ?? ""}`}
          titleClassName="text-body_sm2_medium font-medium mb-[13px] "
          modalContainerClass="pt-[13px]"
          hrClassName="!mb-5"
        >
          <div className="max-h-[80vh] overflow-y-auto">
            {currentFilter?.type === "text-input" && (
              <TextNumberInputContent
                filter={currentFilter}
                onSave={handleSaveFilter}
                onCancel={handleCloseModal}
                value={getFilterValue(filters, currentFilter)}
              />
            )}
            {currentFilter?.type === "date-range" && (
              <DateRangeModalContent
                filter={currentFilter}
                onSave={handleSaveFilter}
                onCancel={handleCloseModal}
                value={getFilterValue(filters, currentFilter)}
              />
            )}
          </div>
        </CenteredModal>
      </>
    );
  }
);

function getFilterValue(filters, currentFilter) {
  const filter = filters.find((f) => f.filter.key === currentFilter.key);
  if (!filter) return null;
  return filter.queryValue;
}

export const FilterDropDown = forwardRef(
  (
    {
      onClose,
      filterDropdownRef,
      filterColumns,
      setCurrentFilter, // set current filter to state
    },
    ref
  ) => {
    return (
      <div className="w-[200px] transition-opacity text-text_xs_normal inline-block absolute top-10  z-50 bg-white border rounded-sm shadow-md">
        <ul className="" ref={ref}>
          {filterColumns.map((col) => {
            const isNotLast =
              filterColumns.indexOf(col) !== filterColumns.length - 1;
            return (
              <li
                key={col}
                className={`hover:bg-gray-100 py-4 px-4  cursor-pointer ${
                  isNotLast ? "border-b border-50" : ""
                }`}
                onClick={() => {
                  setCurrentFilter(col);
                  onClose();
                }}
              >
                <span className="capitalize text-body_sm1_medium w-full">
                  {col.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
