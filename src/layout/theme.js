import { createMuiTheme } from "../components/mui";
import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue
    },
    typography: {
        useNextVariants: true,
    },
})