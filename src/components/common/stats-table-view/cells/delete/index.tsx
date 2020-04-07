import React from "react";
import { Row } from "react-table";

interface DeleteCellProps {
  row: Row<any>;
  onItemDelete: (item: any) => void;
}

export default function DeleteCell({ row: { original }, onItemDelete }: DeleteCellProps) {
  return (
    <button onClick={() => {
      onItemDelete(original);
    }}>Delete</button>
  );
}
