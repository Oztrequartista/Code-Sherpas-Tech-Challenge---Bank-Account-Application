import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LoaderIcon } from "react-hot-toast";

const Pagination = ({
  recordsPerPage = 10,
  records,
  totalRecords,
  paginate,
  currentPage,
  onPreviousClick,
  onPageChange,
  isFetchingPaginatedData,
  onNextClick,
  displaySummary = false,
  usesPageIndex = false,
}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(currentPage);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const calculatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = calculatePageNumbers();

  useEffect(() => {
    setSelectedPageIndex(currentPage);
    if (currentPage > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + 10);
      setMinPageNumberLimit(minPageNumberLimit + 10);
    } else if (currentPage <= minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - 10);
      setMinPageNumberLimit(minPageNumberLimit - 10);
    }
  }, [currentPage, maxPageNumberLimit, minPageNumberLimit]);

  if (totalRecords === 0) return null;

  return (
    <>
      <div className="flex flex-col h-[35px] md:flex-row md:justify-between md:items-center gap-2 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 h-full">
          <button
            className={` ${
              currentPage === pageNumbers[0]
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={currentPage === pageNumbers[0]}
            onClick={() => {
              setSelectedPageIndex((prev) => prev - 1);
              onPreviousClick && onPreviousClick();
            }}
          >
            <i className="ri-arrow-left-s-line text-body_lg1_normal text-neutral-400"></i>
          </button>
          <ul className="flex items-center w-fit m-auto md:m-0 border border-[#e5e5e5] rounded-sm h-full">
            {pageNumbers.map((number, index) => {
              if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
                return (
                  <li key={number}>
                    <button
                      className={`w-full h-[35px] flex items-center border-l border-[#e5e5e5] px-4 cursor-pointer text-body_sm2_normal text-neutral-400 ${
                        selectedPageIndex === number
                          ? "bg-primary rounded-l-sm"
                          : ""
                      }`}
                      onClick={() => {
                        onPageChange && onPageChange(number);
                        setSelectedPageIndex(number);
                        paginate && paginate(usesPageIndex ? index : number);
                      }}
                      disabled={isFetchingPaginatedData}
                    >
                      <Link
                        className={`${
                          selectedPageIndex === number ? "text-[white]" : ""
                        }`}
                        href="#!"
                      >
                        {isFetchingPaginatedData ? <LoaderIcon /> : number}
                      </Link>
                    </button>
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <button
            className={` ${
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              setSelectedPageIndex((prev) => prev + 1);
              onNextClick && onNextClick();
            }}
            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          >
            <i className="ri-arrow-right-s-line text-body_lg1_normal text-neutral-400"></i>
          </button>
        </div>
        {displaySummary && (
          <div className="text-center lg:text-left mb-1 lg:mb-0 flex gap-2 items-center">
            {`Showing ${records} out of ${totalRecords} records`}
          </div>
        )}
      </div>
    </>
  );
};

export default Pagination;
