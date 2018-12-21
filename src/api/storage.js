const ROLL_CACHE_KEY = "ROLL_CACHE";
const FAVORITES_KEY = "FAVORITES";

export function storeRolls(rolls) {
    localStorage.setItem(ROLL_CACHE_KEY, JSON.stringify(rolls));
}

export function getStoredRolls() {
    let rolls = JSON.parse(localStorage.getItem(ROLL_CACHE_KEY));
    return coalesce(rolls, []);
}

export function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getFavorites() {
    let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return coalesce(favorites, []);
}

const coalesce = (value, ifNull) => value == null ? ifNull : value;