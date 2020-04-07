import React from "react";
import styled from "styled-components";
import { Row } from "react-table";

interface RankCellProps {
  row: Row<any>;
}

interface RankCellChangeProps {
  isPositive: boolean;
}
const RankCellChange = styled.span<RankCellChangeProps>`
  color: ${({ isPositive }: RankCellChangeProps) =>
    isPositive ? "green" : "red"};
`;

const RANK_KEY = "position_info";

export default function RankCell({ row: { original } }: RankCellProps) {
  return original[RANK_KEY] ? (
    <span>
      {original[RANK_KEY].position}
      {original[RANK_KEY].change ? (
        <RankCellChange isPositive={original[RANK_KEY].change > 0}>
          ({original[RANK_KEY].change})
        </RankCellChange>
      ) : null}
    </span>
  ) : null;
}
