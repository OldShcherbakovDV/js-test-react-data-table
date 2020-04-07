import React from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  TableInstance,
  UsePaginationInstanceProps,
  UseRowSelectInstanceProps,
  Column,
} from "react-table";
import styled from "styled-components";

interface TableViewProps {
  data: any[];
  columns: Column[];
}

type TableInstanceWithPagination<D extends object> = TableInstance<D> &
  UseRowSelectInstanceProps<D> &
  UsePaginationInstanceProps<D> & {
    state: {
      pageIndex: number;
      pageSize: number;
    };
  };

const TableWrapper = styled.div`
  width: 100%;
`;

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
`;

const DarkTableRow = styled.tr`
  background: #c4c4c4;
`;

const TableHeadCell = styled.th`
  padding: 5px;
  text-align: left;
`;

const TableCell = styled.th`
  padding: 5px;
  text-align: left;
`;

const TableFooter = styled.div`
  background: #c4c4c4;
  padding: 5px;
  text-align: right;
`;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef: React.MutableRefObject<any> =
      (ref as React.MutableRefObject<any>) || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

export default function TableView({ data, columns }: TableViewProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({
            getToggleAllRowsSelectedProps,
          }: UseRowSelectInstanceProps<object>) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }: any) => {

            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            );
          },
        },
        ...columns,
      ]);
    },
    usePagination,
  ) as TableInstanceWithPagination<any>; //TODO стремный костыль думаю можно лучше нужно шерстить доку.

  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <DarkTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeadCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableHeadCell>
              ))}
            </DarkTableRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TableFooter>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </TableFooter>
    </TableWrapper>
  );
}
