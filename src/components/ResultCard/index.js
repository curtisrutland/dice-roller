import React from "react";
import { Card, CardContent, Typography, withStyles, CardActions, IconButton, SvgIcon } from "../mui";
import SelfUpdatingTimestamp from "../SelfUpdatingTimestamp";
import Badge from "../Badge";
import styles from "./style";
import { FavoriteIcon, FavoriteFilledIcon, DeleteOutlineIcon } from "../mui/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { rollActions } from "../../store";
import pink from '@material-ui/core/colors/pink';
import { ReactComponent as DiceIcon } from "../../assets/icons/dice.svg";

function createBadges(resultGroups) {
    let badges = [];
    let k = 0;
    for (let group of resultGroups) {
        let color = group.color;
        if (group.type === "add") {
            badges.push(<Badge key={k++} color={color.text} backgroundColor={color.background}>{group.value}</Badge>);
        } else {
            for (let value of group.results) {
                let v = group.positive ? value : value * -1;
                badges.push(<Badge key={k++} color={color.text} backgroundColor={color.background}>{v}</Badge>)
            }
        }
    }
    return badges;
}

const ResultCard = (props) => {
    const { classes, rollResult, reroll, deleteRoll, setFavorite, unsetFavorite } = props;
    const { parsedExpression, total, results, timestamp, favorite = false } = rollResult;
    const doReroll = () => reroll(parsedExpression);
    const doDelete = () => deleteRoll(timestamp);
    const favoriteAction = favorite
        ? () => unsetFavorite(parsedExpression)
        : () => setFavorite(parsedExpression);

    const icon = favorite ? <FavoriteFilledIcon nativeColor={pink[300]} /> : <FavoriteIcon />
    return (
        <Card className={classes.card}>
            <div className={classes.content}>
                <CardContent className={classes.details}>
                    <Typography variant="h5">{parsedExpression}</Typography>
                    <div className={classes.badges}>
                        {createBadges(results)}
                    </div>

                </CardContent>
                <CardContent className={classes.total}>
                    <Typography className={classes.totalText}>{total}</Typography>
                </CardContent>
            </div>
            <CardActions className={classes.actions}>
                <div className={classes.grow}>
                    <SelfUpdatingTimestamp className={classes.timestamp} timestamp={timestamp} />
                </div>
                <div>
                    <IconButton onClick={doDelete}>
                        <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton onClick={favoriteAction}>
                        {icon}
                    </IconButton>
                    <IconButton onClick={doReroll}>
                        <SvgIcon>
                            <DiceIcon />
                        </SvgIcon>
                    </IconButton>
                </div>
            </CardActions>
        </Card >
    )
};

function mapDispatch(dispatch) {
    return {
        reroll(expression) {
            return dispatch(rollActions.rollExpression(expression));
        },
        deleteRoll(timestamp) {
            return dispatch(rollActions.deleteRoll(timestamp))
        },
        setFavorite(expression) {
            return dispatch(rollActions.setFavorite(expression));
        },
        unsetFavorite(expression) {
            return dispatch(rollActions.unsetFavorite(expression));
        }
    }
};



export default compose(
    withStyles(styles),
    connect(null, mapDispatch)
)(ResultCard);