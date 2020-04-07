import React from "react";
import { Row } from "react-table";

interface DeleteCellProps {
  row: Row<any>;
}

export default function DeleteCell({ row: { original } }: DeleteCellProps) {
  return (
    <button onClick={() => {
      /*
       * Не совсем понял что должно происходить при удалении
       * В настоящем приложении мы тут должны отправить запрос на удаление по ID.
       * А после этого обновить данные таблицы
       */
      alert(`Item ${original.id} deleted!`);
    }}>Delete</button>
  );
}
