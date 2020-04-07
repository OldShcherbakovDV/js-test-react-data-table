import React, { useMemo } from "react";
import { Cell } from "react-table";

import TableView from "../table-view";
import ActionsCell from "./cells/actions";
import RankCell from "./cells/rank";
import ColorCell from "./cells/color";
import DeleteCell from "./cells/delete";

interface StatsTableViewProps {
  stats: any[];
}

export default function StatsTableView({ stats }: StatsTableViewProps) {
  const columns = useMemo(
    () => [
      {
        Header: "Keyword",
        accessor: "keyword",
      },
      {
        Header: "Actions",
        Cell: ({ row }: Cell) => <ActionsCell row={row} />,
      },
      {
        Header: "Traffic Score",
        accessor: "users_per_day",
      },
      {
        Header: "Total Apps",
        accessor: "total_apps",
      },
      {
        Header: "Rank",
        Cell: ({ row }: Cell) => <RankCell row={row} />,
      },
      {
        Header: "Color",
        Cell: ({ row }: Cell) => <ColorCell row={row} />,
      },
      {
        Header: () => null,
        accessor: "delete",
        Cell: ({ row }: Cell) => <DeleteCell row={row} />,
      },
    ],
    []
  );

  return <TableView columns={columns} data={stats} />;
}
