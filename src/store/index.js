import { combineReducers, createStore } from "redux";
import rolls, { defaultState as rollsDefaultState } from "./rolls";

export function createNamespace(ns) {
    return function (strings) {
        return `@@${ns.toUpperCase()}/${strings.map(s => s.toUpperCase()).join("")}`;
    };
}

const rootReducer = combineReducers({ rolls });
const defaultState = { rolls: rollsDefaultState };

export default function configureStore() {
    const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const store = createStore(rootReducer, defaultState, enhancer);
    return store;
}

export { actions as rollActions } from "./rolls";