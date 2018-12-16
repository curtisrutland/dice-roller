import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "../mui";
import { DeleteIcon } from "../mui/icons";
import { rollActions } from "../../store";
import { connect } from "react-redux";

const PopupMenu = ({ open, onClose, clearRolls }) => {
    const clearRollsClicked = () => {
        clearRolls();
    }
    return (
        <Drawer anchor="bottom" open={open} onClose={onClose}>
            <div tabIndex={0} role="button" onClick={onClose}>
                <List style={{ width: "auto" }}>
                    <ListItem button onClick={clearRollsClicked}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clear All Rolls" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

function mapDispatch(dispatch) {
    return {
        clearRolls() {
            return dispatch(rollActions.clearRolls());
        }
    }
}

export default connect(null, mapDispatch)(PopupMenu);