import React from "react";

import { Row } from "react-table";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

import { frontendPaths } from "../../../../../constants/frontend-paths";

interface ActionsCellProps {
  row: Row<any>;
}

const SHOW_KEY = "suggestions_count";
const EXPLORE_KEY = "keyword";

export default function ActionsCell({ row: { original } }: ActionsCellProps) {
  return (
    <>
      <Link to={`${frontendPaths.explore}?keyword=${original[EXPLORE_KEY]}`}>
        <button>Explore</button>
      </Link>
      <Popup
        trigger={<button>{`Show (${original[SHOW_KEY]})`}</button>}
        modal
        closeOnDocumentClick
      >
        <pre>
          <code>{JSON.stringify(original, null, 2)}</code>
        </pre>
      </Popup>
    </>
  );
}
