import React from "react";
import moment from "moment";
import { Typography } from "../mui";

export default class SelfUpdatingTimestamp extends React.Component {
    constructor(props) {
        super(props);
        this.timestamp = this.props.timestamp;
        this.state = { time: moment(this.timestamp).fromNow() };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ time: moment(this.timestamp).fromNow() });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { timestamp, ...props } = this.props;
        return (
            <Typography {...props}>{this.state.time}</Typography>
        )
    }
}