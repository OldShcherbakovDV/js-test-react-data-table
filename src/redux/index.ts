import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import modules from "./modules";

const configureStore = () => createStore(modules, applyMiddleware(thunk));

export default configureStore;
