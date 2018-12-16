import React from "react";
import {
    AppBar, Toolbar, IconButton,
    withStyles, fade, InputBase,
} from "../mui";
import { MoreIcon, SendIcon } from "../mui/icons";
import { rollActions } from "../../store";
import { connect } from "react-redux";
import { compose } from "redux";
import PopupMenu from "./PopupMenu";

const styles = theme => ({
    appBar: {
        width: "100%"
    },
    inputContainer: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        width: '100%',
    },
});

class MenuBar extends React.Component {
    state = {
        expression: "",
        menuOpen: false
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

    handleMenuClick = () => {
        this.setState({ menuOpen: true });
    }

    handleMenuClose = () => {
        this.setState({ menuOpen: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static" color="primary" className={classes.appBar} >
                <Toolbar className={classes.toolbar}>
                    <div className={classes.inputContainer}>
                        <form onSubmit={this.handleSubmit}>
                            <InputBase
                                placeholder="Enter a dice expression..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={this.state.expression}
                                onChange={this.handleChange}
                            />
                        </form>
                    </div>
                    <div>
                        <IconButton color="inherit" onClick={this.handleAddRoll}>
                            <SendIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={this.handleMenuClick}>
                            <MoreIcon />
                        </IconButton>
                    </div>
                    <PopupMenu open={this.state.menuOpen} onClose={this.handleMenuClose} />
                </Toolbar>
            </AppBar>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        addRoll(expression) {
            return dispatch(rollActions.rollExpression(expression));
        }
    }
}

export default compose(
    withStyles(styles),
    connect(null, mapDispatch)
)(MenuBar);