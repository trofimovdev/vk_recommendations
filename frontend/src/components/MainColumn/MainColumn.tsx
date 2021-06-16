import React from "react";
import "./MainColumn.css";

export interface MainColumnProps extends React.HTMLAttributes<HTMLDivElement> {}

const MainColumn = ({ children }: MainColumnProps): JSX.Element => {
    return <div className="MainColumn">{children}</div>;
};

export default MainColumn;
