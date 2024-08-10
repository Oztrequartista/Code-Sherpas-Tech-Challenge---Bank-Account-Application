import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "../pagination";
import Input from "../input";
import { useState } from "react";

export function DataTable({
  columns,
  data,
  onRowClicked,
  onSearch,
  showPagination,
  showSearch,
  numberOfPages = 1,
  isFetchingPaginatedData = false,
  totalRecords,
  onPageChange,
  onPaginationNextClick,
  onPaginationPreviousClick,
}) {
  const [columnFilters, setColumnFilters] = [];
  const [sorting, setSorting] = useState([]);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        {showPagination && (
          <Pagination
            onNextClick={onPaginationNextClick}
            onPreviousClick={onPaginationPreviousClick}
            isFetchingPaginatedData={isFetchingPaginatedData}
            totalRecords={totalRecords}
            onPageChange={(page) => onPageChange(page)}
            maxPageNumberLimit={numberOfPages}
          />
        )}
        {showSearch && (
          <div className="flex items-center py-4">
            <Input
              value={searchFieldValue}
              placeholder="Filter emails..."
              onChange={(event) => {
                setSearchFieldValue(event.target.value);
                onSearch(event.target.value);
              }}
              className="max-w-sm"
            />
          </div>
        )}
      </div>
      <Table className="min-w-full divide-y divide-neutral-50 text-body_sm2_normal border-b border-b-gray-200">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-normal pt-3 pb-5 text-start text-neutral-400"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClicked(row.original)}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-gray-100 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
