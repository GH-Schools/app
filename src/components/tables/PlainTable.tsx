import React from "react";
import { useTable } from "react-table";
import Spinner from "../Spinner";
import { GenericObject } from "../../interfaces";

type PlainTableProps = {
  data: any;
  columns: any;
  isLoading?: boolean;
  sx?: GenericObject;
  emptyMessage?: React.ReactNode | JSX.Element;
  onRowClick?: (rowData?: any) => void;
};

const PlainTable = (props: PlainTableProps) => {
  const hasClickableRow = !!props.onRowClick;
  const {
    data,
    columns,
    sx = {},
    isLoading = false,
    onRowClick = () => {},
    emptyMessage = (
      <span
        className="my-2.5 text-center"
        style={{
          maxWidth: "300px",
        }}
      >
        No data here
      </span>
    ),
  } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="mt-2 mb-5 flex flex-col overflow-x-auto" style={sx}>
      <div className="-my-2">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden border-gray-200">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className={""}>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        scope="col"
                        className="px-6 py-3 text-left text-xs uppercase tracking-wider font-bold"
                        style={{ color: "var(--secondary-light-text-color)" }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="divide-y divide-gray-200"
              >
                {rows?.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => onRowClick(data[index])}
                      className={hasClickableRow ? "clickable-row" : ""}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {data.length === 0 && (
              <div className="no-table-data">
                {isLoading ? (
                  <Spinner size={20} color="primary" />
                ) : (
                  <>
                    <div
                      className="flex flex-col p-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        alignItems: "center",
                        backgroundColor: "#eee",
                        justifyContent: "center",
                        border: "1px solid #eaeaea",
                      }}
                    >
                      <img
                        src={require("../../assets/woman.svg").default}
                        alt="no-item"
                      />
                    </div>

                    {emptyMessage}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlainTable;
