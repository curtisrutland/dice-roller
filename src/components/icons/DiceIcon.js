import React from "react";
import { ReactComponent as Dice } from "../../assets/icons/dice.svg";
import { SvgIcon } from "../mui";

export default props => (
    <SvgIcon {...props}>
        <Dice />
    </SvgIcon>
);