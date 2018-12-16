import * as colors from "./colors";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(sides, count) {
    let results = [];
    for (let i = 0; i < count; i++) {
        results.push(getRandomIntInclusive(1, sides));
    }
    return results;
}

function parseExpressionToken(token) {
    if (token.indexOf("d") < 0) {
        return parseInt(token);
    }
    let sign = "+";
    let parts = [];
    if (token[0] === "+" || token[0] === "-") {
        sign = token[0];
        parts = token.substr(1).split("d");
    } else {
        parts = token.split("d");
    }
    let result = {
        positive: sign === "+",
        sides: parseInt(parts[1]),
        count: parseInt(parts[0])
    };
    return result;
}

function sortItems(a, b) {
    if (a.type === "add" && b.type === "dice") {
        return 1;
    } else if (a.type === "dice" && b.type === "add") {
        return -1;
    }
    else return a.sides > b.sides ? -1 : 1;
}

function parseParts(expression = "") {
    let matches = expression
        .toLowerCase()
        .match(/([+-]?\d+d\d+|[+-]?\d+)/g)
    if (matches == null) {
        return [1];
    } else {
        return matches.map(parseExpressionToken);
    }
}

function combineParts(parts) {
    let map = new Map();
    parts.forEach(part => {
        if (typeof part === "number") {
            let n = map.get("add") || 0;
            map.set("add", n + part);
        } else {
            let n = map.get(part.sides) || 0;
            n = part.positive ? n + part.count : n - part.count;
            map.set(part.sides, n)
        }
    });
    return map;
}

function createResults(map) {
    let rollItems = [];
    for (let [key, value] of map) {
        if (key === "add") {
            rollItems.push({ type: "add", value });
        } else {
            let item = { type: "dice", sides: key, count: Math.abs(value), positive: value > 0 };
            rollItems.push(item);
        }
    }
    rollItems = rollItems.sort(sortItems);
    return rollItems;
}

function createCleanExpression(rollItems) {
    let parsedExpression = "";
    for (let item of rollItems) {
        if (item.type === "add") {
            let sign = item.value > 0 ? "+" : "-";
            parsedExpression += ` ${sign} ${Math.abs(item.value)}`;
        } else {
            let sign = item.positive ? "+" : "-";
            parsedExpression += ` ${sign} ${item.count}d${item.sides}`;
        }
    }
    parsedExpression = parsedExpression.trim();
    parsedExpression = parsedExpression[0] === "+" ? parsedExpression.substr(1) : parsedExpression;
    return parsedExpression;
}

export function parseExpression(expression) {
    let parts = parseParts(expression);
    let map = combineParts(parts);
    let rollItems = createResults(map);
    let parsedExpression = createCleanExpression(rollItems);
    return { rollItems, parsedExpression };
}

export function roll(rollData) {
    let { rollItems, parsedExpression } = rollData;
    let color;
    let roll = rollItems.map(item => {
        if (item.type === "add") {
            color = colors.getGrey();
            return { ...item, color };
        } else {
            color = colors.getNextColor();
            let results = rollDice(item.sides, item.count);
            let value = results.reduce((a, b) => a + b, 0);
            if (!item.positive) value *= -1;
            return { ...item, results, value, color };
        }
    });
    return {
        parsedExpression,
        results: roll,
        total: roll.reduce((agg, next) => agg + next.value, 0),
        timestamp: new Date().getTime()
    };
}

export function resultsToString(rollResults) {
    let pieces = rollResults.results.map(item => {
        let sign = item.positive ? "+" : "-";
        if (item.type === "dice") {
            let s = `${sign} (${item.sides})[`;
            item.results.forEach(r => s += ` ${r}`);
            s += "]"
            return s;
        } else {
            return `${sign} [ ${item.value} ]`;
        }
    });
    let result = pieces.join(" ");
    if (result[0] === "+") {
        return result.substr(2);
    } else {
        return `-${result.substr(2)}`;
    }
}