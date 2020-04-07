import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useActions } from "../../../hooks/redux";
import {
  getStatsList,
  loadStats,
  deleteStatsListItemById,
} from "../../../redux/modules/stats";

import StatsTableView from "../../common/stats-table-view";

export default function StatsPage() {
  const stats = useSelector(getStatsList);
  const [statsLoadAction, deleteStatsListItemByIdAction] = useActions(
    loadStats,
    deleteStatsListItemById
  );

  const handleItemDelete = (item: any) => {
    deleteStatsListItemByIdAction(item.id);
  };

  useEffect(() => {
    statsLoadAction();
  }, []);

  return (
    <>
      <h1>Stats:</h1>
      {stats && stats.length ? (
        <StatsTableView stats={stats} onItemDelete={handleItemDelete} />
      ) : (
        "Empty table or loading"
      )}
    </>
  );
}
