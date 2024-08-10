import { useEffect, useState } from "react";
import Button from "./button";
import Pagination from "./pagination";
import { TableFilter } from "./table-filter";

const ColumnTitle = ({
  column,
  sortColumns,
  searchColumns,
  setSearchColumns,
  setSortColumns,
}) => {
  const sortColumn = sortColumns.find(
    (sortColum) => sortColum.column.label == column.label
  );
  const searchColumn = searchColumns.find(
    (searchColumn) => searchColumn.column.label == column.label
  );

  return (
    <th
      key={column.label}
      scope="col"
      className="[&:not(:last-child)]:pr-6 pt-3 pb-5 text-start text-body_sm2_normal text-neutral-400"
    >
      <div className="flex items-center">
        {column.label}
  
        {!!column.onSort && (
          <Button
            variant="plain"
            className="ml-2"
            onClick={() =>
              setSortColumns(
                sortColumns.map((sc) => {
                  if (sc.column.label == sortColumn?.column.label) {
                    return {
                      ...sortColumn,
                      sortOrder:
                        sortColumn.sortOrder == "DESC" ? "ASC" : "DESC",
                    };
                  }
                  return {
                    ...sc,
                    sortOrder: null,
                  };
                })
              )
            }
          >
            {sortColumn?.sortOrder == "DESC" ? (
              <i
                title="Sort Ascending"
                className={`ri-sort-asc ${
                  sortColumn?.sortOrder && "text-primary"
                }`}
              ></i>
            ) : (
              <i
                title="Sort Descending"
                className={`ri-sort-desc ${
                  sortColumn?.sortOrder && "text-primary"
                }`}
              ></i>
            )}
          </Button>
        )}
      </div>
    </th>
  );
};

const Table = ({
  columns = [],
  dataSource: dataSourceProp = [],
  keyName = "id",
  loading = false,
  showFilter,
  filterColumns = [],
  onFilterSave,
  onRowClicked = () => {},
  pagination,
  disabledRowClick = () => {},
  tableRef,
}) => {
  const [dataSource, setDataSource] = useState(dataSourceProp);
  const [sortColumns, setSortColumns] = useState([]);
  const [searchColumns, setSearchColumns] = useState([]);

  useEffect(() => {
    setSortColumns([
      ...columns
        .filter((column) => column.onSort)
        .map((column) => ({
          sortOrder: null,
          column,
        })),
      ...sortColumns,
    ]);

    setSearchColumns([
      ...columns
        .filter((column) => column.onSearch)
        .map((column) => ({
          searchKeyword: "",
          column,
        })),
      ...searchColumns,
    ]);
  }, [columns]);

  useEffect(() => {
    let newDS = dataSourceProp;

    // sort
    sortColumns.forEach((sortColumn) => {
      if (sortColumn.column.onSort && sortColumn.sortOrder) {
        newDS.sort(sortColumn.column.onSort);
        if (sortColumn.sortOrder == "ASC") {
          newDS.reverse();
        }
      }
    });

    // search/filter
    searchColumns.forEach((searchColumn) => {
      if (searchColumn.column.onSearch) {
        newDS = newDS.filter((item) =>
          searchColumn.searchKeyword
            ? searchColumn.column.onSearch(searchColumn.searchKeyword, item)
            : true
        );
      }
    });

    setDataSource(newDS);
  }, [dataSourceProp, sortColumns, searchColumns]);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="relative overflow-hidden min-h-[800px]">
          {!!loading && (
    <div className="absolute top-[200px] left-0 flex justify-center items-center max-w-[100vw] w-full min-h-[120px]">
      <div className="spinner-container">
      <img
        src="/images/svgs/loading_spinner.svg"
        alt="Spinner"
        className="spinner"
      />
    </div>
    </div>

  )}

            <TableFilter
              showFilter={showFilter}
              onFilterSave={onFilterSave}
              filterColumns={filterColumns}
              ref={tableRef}
            />

            <table
              className={`min-w-full divide-y divide-neutral-50 border-b border-b-gray-200 ${
                loading ? "opacity-[0.2]" : ""
              }`}
            >
              <thead>
                <tr>
                  {columns.map((column) => (
                    <ColumnTitle
                      key={column.label}
                      column={column}
                      sortColumns={sortColumns}
                      searchColumns={searchColumns}
                      setSearchColumns={setSearchColumns}
                      setSortColumns={setSortColumns}
                    />
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataSource.map((row) =>
                  row ? (
                    <tr
                      key={row[keyName]}
                      className={`hover:bg-gray-100  text-body_sm2_normal ${
                        disabledRowClick(row)
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                      onClick={() =>
                        !disabledRowClick(row) && onRowClicked(row)
                      }
                    >
                      {columns.map((column) => (
                        <td
                          key={row[keyName] + column.label}
                          className="[&:not(:last-child)]:pr-6 pt-5 pb-7 whitespace-nowrap text-body_sm2_normal"
                        >
                          {column.dataIndex
                            ? row[column.dataIndex]
                            : column.render(row)}
                        </td>
                      ))}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>

            {!loading && !dataSource.length ? (
              <p className="text-center mt-27 text-neutral-700 text-[15px]">
                No Data Available
              </p>
            ) : null}

            {pagination && dataSource.length > 0 ? (
              <div className="flex mt-10">
                <Pagination {...pagination} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
