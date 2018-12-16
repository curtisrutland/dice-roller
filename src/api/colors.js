import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import blueGrey from "@material-ui/core/colors/blueGrey";

import theme from "../layout/theme";

const colors = [red, pink, purple, indigo, blue, cyan, teal];
const getTextColor = theme.palette.getContrastText;

function* createColorGenerator() {
    let i = 0;
    while (true) {
        let background = colors[i++][500];
        let text = getTextColor(background);
        yield { text, background };
        if (i >= colors.length) {
            i = 0;
        }
    }
}

const colorGenerator = createColorGenerator();

export function getNextColor() {
    return colorGenerator.next().value;
}

export function getGrey() {
    return { background: blueGrey[500], text: getTextColor(blueGrey[500]) }
}