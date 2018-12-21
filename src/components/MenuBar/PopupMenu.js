import React from "react";
import {
    Drawer, List, ListItem, ListItemText,
    ListItemIcon, Divider, ListSubheader
} from "../mui";
import { DeleteIcon, InfoIcon, FavoriteFilledIcon } from "../mui/icons";
import { rollActions } from "../../store";
import { connect } from "react-redux";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import { getFavorites } from "../../api/storage";
import { GithubIcon } from "../icons";


const appVer = process.env.REACT_APP_VERSION || "v0";
const appMessage = process.env.REACT_APP_VERSION_MESSAGE || "No new messages.";
const projectUrl = process.env.REACT_APP_PROJECT_HOMEPAGE || "https://google.com";

const doAlert = () => alert(`App Version: ${appVer}\n${appMessage}`);
const goToProject = () => window.open(projectUrl, "_blank");

const PopupMenu = ({ open, onClose, clearRolls, clearFavorites, roll }) => {
    const favorites = getFavorites();
    const doClearRolls = () => clearRolls();
    const doClearFavorites = () => clearFavorites();
    const favoriteButtons = favorites.map((f, i) => {
        const doRoll = () => roll(f);
        return (
            <ListItem button onClick={doRoll} key={i}>
                <ListItemIcon>
                    <FavoriteFilledIcon nativeColor={pink[300]} />
                </ListItemIcon>
                <ListItemText primary={f} />
            </ListItem>
        )
    })
    return (
        <Drawer anchor="bottom" open={open} onClose={onClose}>
            <div tabIndex={0} role="button" onClick={onClose}>
                <List style={{ width: "auto" }}>
                    <ListSubheader>
                        Favorite Rolls
                    </ListSubheader>
                    {favoriteButtons}
                    <ListItem button onClick={doClearFavorites}>
                        <ListItemIcon>
                            <DeleteIcon nativeColor={red[500]} />
                        </ListItemIcon>
                        <ListItemText primary="Clear All Favorites" />
                    </ListItem>
                    <Divider />
                    <ListSubheader>
                        Actions
                    </ListSubheader>
                    <ListItem button onClick={doClearRolls}>
                        <ListItemIcon>
                            <DeleteIcon nativeColor={red[500]} />
                        </ListItemIcon>
                        <ListItemText primary="Clear All Rolls" />
                    </ListItem>
                    <ListItem button onClick={doAlert}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="App Info" />
                    </ListItem>
                    <ListItem button onClick={goToProject}>
                        <ListItemIcon>
                            <GithubIcon />                            
                        </ListItemIcon>
                        <ListItemText primary="Project Homepage" />
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
        },
        clearFavorites() {
            return dispatch(rollActions.clearFavorites());
        },
        roll(expression) {
            return dispatch(rollActions.rollExpression(expression));
        }
    }
}

export default connect(null, mapDispatch)(PopupMenu);