import React, { Component } from "react";
import { compose } from "redux"
import { connect } from "react-redux";
import { TextField, withStyles, Button } from "../mui";
import { AddIcon } from "../mui/icons";
import { rollActions } from "../../store";

const styles = theme => ({
    container: {
        width: "100%",
        display: "flex",
        flexFlow: "row nowrap",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        minHeight: "fit-content"
    },
    text: {
        flex: 1,
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

class ExpressionInput extends Component {
    state = {
        expression: ""
    };

    handleChange = (evt) => {
        this.setState({ expression: evt.target.value });
    }

    handleSubmit = (evt) => {
        this.handleAddRoll();
        evt.preventDefault();
    }

    handleAddRoll = () => {
        this.props.addRoll(this.state.expression);
        this.setState({ expression: "" });
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} onSubmit={this.handleSubmit}>
                <TextField variant="outlined" label="Dice Expression"
                    placeholder="Type your own dice expression..." className={classes.text}
                    value={this.state.expression} onChange={this.handleChange} />
                <Button className={classes.button} color="primary" onClick={this.handleAddRoll} variant="outlined">
                    <AddIcon />
                    Roll
                </Button>
            </form>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        addRoll: (expression) => dispatch(rollActions.rollExpression(expression))
    }
}

export default compose(
    withStyles(styles),
    connect(null, mapDispatch)
)(ExpressionInput);