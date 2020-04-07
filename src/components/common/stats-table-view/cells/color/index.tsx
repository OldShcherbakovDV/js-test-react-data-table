import React from "react";
import styled from "styled-components";
import { Row } from "react-table";

interface ColorCellProps {
  row: Row<any>;
}

interface ColorExsampleProps {
  colorCode: number;
}

const COLORS = ["green", "red", "yellow", "blue", "magenta", "cyan"];

const ColorExsample = styled.div<ColorExsampleProps>`
  background: ${({ colorCode }: ColorExsampleProps) => COLORS[colorCode]};
  width: 50px;
  height: 20px;
`;

export default function ColorCell({ row: { original } }: ColorCellProps) {
  return <ColorExsample colorCode={original.color as number} />;
}
