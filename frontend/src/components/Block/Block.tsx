import React from "react";
import { classNames } from "../../tools/helpers";
import "./Block.css";

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {}

const Block = ({ children, className, ...props }: BlockProps): JSX.Element => {
    return (
        <div {...props} className={classNames("Block", className)}>
            {children}
        </div>
    );
};

export default Block;
