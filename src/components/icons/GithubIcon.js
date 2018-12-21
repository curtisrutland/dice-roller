import React from "react";
import { ReactComponent as Github } from "../../assets/icons/github.svg";
import { SvgIcon } from "../mui";

export default props => (
    <SvgIcon {...props}>
        <Github />
    </SvgIcon>
);