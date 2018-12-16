import React from "react";
import { withStyles } from "../mui";
import { connect } from "react-redux";
import { compose } from "redux";
import ResultCard from "../ResultCard";

const styles = theme => ({
    container: {
        flexGrow: 1,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        overflowY: "auto",
        display: "flex",
        flexFlow: "column-reverse nowrap",
        alignItems: "stretch"
    }
});

const ResultList = ({ classes, results }) => {

    return (
        <div className={classes.container}>
            {results.map(result => (
                <ResultCard rollResult={result} key={result.timestamp} />
            ))}
        </div>
    );
}

function mapState({ rolls }) {
    return { ...rolls };
}

export default compose(
    withStyles(styles),
    connect(mapState)
)(ResultList);