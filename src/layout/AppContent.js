import React from "react";
import { withStyles } from "../components/mui";
import MenuBar from "../components/MenuBar";
import ResultList from "../components/ResultList";

const styles = {
    main: {
        height: "100%",
        width: "100vw",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center"
    },
    content: {
        flexGrow: 1,
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        width: 800,
        maxWidth: "95%",
    },
    list: {
        flex: 1
    }
}

const Content = ({ classes }) => {
    return (
        <main className={classes.main}>
            <section className={classes.content}>
                <ResultList />
                {/* <ExpressionInput /> */}
            </section>
            <MenuBar />
        </main>
    );
}

export default withStyles(styles)(Content);