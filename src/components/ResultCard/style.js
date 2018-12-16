export default theme => ({
    card: {
        minHeight: "fit-content"
    },
    content: {
        display: "flex",
    },
    total: {
        marginRight: theme.spacing.unit * 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0
    },
    totalText: {
        fontSize: "2.3rem"
    },
    details: {
        flexGrow: 1,
        display: "flex",
        flexFlow: "column nowrap",
        paddingBottom: 0
    },
    timestamp: {
        fontSize: ".5rem",
        fontStyle: "italic",
        textAlign: "center"
    },
    badges: {
        flex: 1,
        display: "flex",
        flexFlow: "row wrap",
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    actions: {
        paddingTop: 0,
        paddingBottom: 0
    }
});