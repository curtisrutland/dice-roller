const ROLL_CACHE_KEY = "ROLL_CACHE";

export function storeRolls(rolls) {
    localStorage.setItem(ROLL_CACHE_KEY, JSON.stringify(rolls));
}

export function getStoredRolls() {
    let rolls = JSON.parse(localStorage.getItem(ROLL_CACHE_KEY));
    return rolls == null ? [] : rolls;
}