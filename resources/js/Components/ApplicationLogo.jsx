import React from "react";
import logo from "./assets/bspokelogo.svg";

export default function ApplicationLogo({ className }) {
    return (
            <img className={className} src={logo}></img>
    );
}
