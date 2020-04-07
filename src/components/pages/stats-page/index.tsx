import React from "react";

import useFetch from "../../../hooks/use-fetch";
import { apiPaths } from "../../../constants/api-paths";

import StatsTableView from "../../common/stats-table-view";

const fetchOptions = {
  method: "POST",
};

export default function StatsPage() {
  const [stats, statsError, isStatsLoading] = useFetch<any>(
    apiPaths.dataStats,
    fetchOptions as RequestInit
  );

  const statsElement = isStatsLoading ? (
    "Loading..."
  ) : statsError !== null ? (
    "Error..."
  ) : stats ? (
    <StatsTableView stats={stats.data} />
  ) : null;

  return (
    <>
      <h1>Stats:</h1>
      {statsElement}
    </>
  );
}
