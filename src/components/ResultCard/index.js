import React from "react";
import { Card, CardContent, Typography, withStyles, CardActions, IconButton } from "../mui";
import SelfUpdatingTimestamp from "../SelfUpdatingTimestamp";
import Badge from "../Badge";
import styles from "./style";
import { RefreshIcon, FavoriteIcon } from "../mui/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { rollActions } from "../../store";

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

const ResultCard = ({ classes, rollResult, reroll }) => {
    const { parsedExpression, total, results, timestamp } = rollResult;
    const doReroll = () => reroll(parsedExpression);
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
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <div style={{ flexGrow: 1, justifyContent: "center" }}>
                    <SelfUpdatingTimestamp className={classes.timestamp} timestamp={timestamp} />
                </div>
                <IconButton onClick={doReroll}>
                    <RefreshIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
};

function mapDispatch(dispatch) {
    return {
        reroll(expression) {
            return dispatch(rollActions.rollExpression(expression));
        }
    }
};



export default compose(
    withStyles(styles),
    connect(null, mapDispatch)
)(ResultCard);