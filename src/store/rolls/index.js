import { createNamespace } from "../";
import * as dice from "../../api/dice";
import * as storage from "../../api/storage";

const ns = createNamespace("rolls");

const loadedFavorites = storage.getFavorites();
const loadedRolls = storage.getStoredRolls();

export const defaultState = {
    results: setFavoritesFlag(loadedRolls, loadedFavorites),
    favorites: loadedFavorites
};

export const actionTypes = {
    rollExpression: ns`roll_expression`,
    clearRolls: ns`clear_rolls`,
    deleteRoll: ns`delete_roll`,
    setFavorite: ns`set_favorite`,
    unsetFavorite: ns`unset_favorite`,
    clearFavorites: ns`clear_favorites`,
}

export const actions = {
    rollExpression(expression) { return { type: actionTypes.rollExpression, payload: expression }; },
    clearRolls() { return { type: actionTypes.clearRolls }; },
    deleteRoll(timestamp) { return { type: actionTypes.deleteRoll, payload: timestamp }; },
    setFavorite(expression) { return { type: actionTypes.setFavorite, payload: expression }; },
    unsetFavorite(expression) { return { type: actionTypes.unsetFavorite, payload: expression }; },
    clearFavorites() { return { type: actionTypes.clearFavorites }; }
}

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case actionTypes.rollExpression: {
            let rollItems = dice.parseExpression(payload);
            let newRoll = dice.roll(rollItems);
            newRoll = setFavoriteFlagOnItem(newRoll, storage.getFavorites());
            let results = [newRoll, ...state.results];

            storage.storeRolls(results);
            return { ...state, results };
        }
        case actionTypes.clearRolls: {
            storage.storeRolls(null);
            return { ...state, results: [] };
        }
        case actionTypes.deleteRoll: {
            let results = state.results.filter(r => r.timestamp !== payload);
            storage.storeRolls(results);
            return { ...state, results };
        }
        case actionTypes.setFavorite: {
            if (state.favorites.indexOf(payload) >= 0) {
                return state;
            }
            let favorites = [...state.favorites, payload];
            let results = setFavoritesFlag(state.results, favorites);
            storage.saveFavorites(favorites);
            storage.storeRolls(results);
            return { ...state, results, favorites };
        }
        case actionTypes.unsetFavorite: {
            if (state.favorites.indexOf(payload) < 0) {
                return state;
            }
            let favorites = storage.getFavorites().filter(f => f !== payload);
            let results = setFavoritesFlag(state.results, favorites);
            storage.saveFavorites(favorites);
            storage.storeRolls(results);
            return { ...state, results, favorites };
        }
        case actionTypes.clearFavorites: {
            let favorites = [];
            let results = setFavoritesFlag(state.results, favorites);
            storage.saveFavorites(favorites);
            storage.storeRolls(results);
            return { ...state, results, favorites };
        }
        default: { return state; }
    }
}

function setFavoritesFlag(results, favorites) {
    return results.map(item => setFavoriteFlagOnItem(item, favorites));
}

function setFavoriteFlagOnItem(item, favorites) {
    return { ...item, favorite: favorites.indexOf(item.parsedExpression) >= 0 }
}