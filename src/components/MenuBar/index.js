import React from "react";
import {
    AppBar, Toolbar, IconButton,
    withStyles, InputBase, SvgIcon
} from "../mui";
import { MoreIcon } from "../mui/icons";
import { ReactComponent as DiceIcon } from "../../assets/icons/dice.svg";
import { rollActions } from "../../store";
import { connect } from "react-redux";
import { compose } from "redux";
import PopupMenu from "./PopupMenu";
import styles from "./style";

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
                    <div className={classes.marginLeft}>
                        <IconButton color="inherit" onClick={this.handleAddRoll}>
                            <SvgIcon>
                                <DiceIcon />
                            </SvgIcon>
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