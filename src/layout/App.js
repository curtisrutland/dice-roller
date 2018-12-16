import React from "react";
import { Provider } from "react-redux";
import AppContent from "./AppContent";
import { MuiThemeProvider, CssBaseline } from "../components/mui";
import theme from "./theme";

const App = ({ store }) => {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <AppContent />
            </MuiThemeProvider>
        </Provider>
    );
}

export default App;