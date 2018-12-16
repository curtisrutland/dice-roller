import { createNamespace } from "../";
import * as dice from "../../api/dice";
import * as storage from "../../api/storage";

const ns = createNamespace("rolls");

export const defaultState = {
    results: storage.getStoredRolls()
};

export const actionTypes = {
    rollExpression: ns`roll_expression`,
    clearRolls: ns`clear_rolls`
}

export const actions = {
    rollExpression(expression) { return { type: actionTypes.rollExpression, payload: expression }; },
    clearRolls() { return { type: actionTypes.clearRolls }; }
}

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case actionTypes.rollExpression:
            let rollItems = dice.parseExpression(payload);
            let newRoll = dice.roll(rollItems);
            let results = [newRoll, ...state.results];
            storage.storeRolls(results);
            return { ...state, results };
        case actionTypes.clearRolls:
            storage.storeRolls(null);
            return { ...state, results: [] }
        default:
            return state;
    }
}