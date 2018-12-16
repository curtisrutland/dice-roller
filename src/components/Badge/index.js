import React from "react";
import { Typography, withStyles } from "../mui";

const styles = theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.spacing.unit / 2,
        padding: theme.spacing.unit / 2,
        margin: 2,
        minWidth: 20,
        textAlign: "center"
    }
})

const Badge = ({ backgroundColor, color, children, classes }) => {
    return (
        <div className={classes.container} style={{ backgroundColor }}>
            <Typography style={{ color, fontSize: ".7rem" }}>{children}</Typography>
        </div>
    )
}

export default withStyles(styles)(Badge);