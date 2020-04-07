import { bindActionCreators, ActionCreator } from "redux";
import { useDispatch } from "react-redux";

function useActions<A>(...actions: ActionCreator<A>[]): ActionCreator<A>[] {
  const dispatch = useDispatch();

  return actions.map(a => bindActionCreators(a, dispatch));
}

export { useActions };
