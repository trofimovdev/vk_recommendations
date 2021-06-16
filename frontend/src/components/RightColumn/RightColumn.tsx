import React from "react";
import "./RightColumn.css";

export interface RightColumnProps
    extends React.HTMLAttributes<HTMLDivElement> {}

const RightColumn = ({ children }: RightColumnProps): JSX.Element => {
    return <div className="RightColumn">{children}</div>;
};

export default RightColumn;
