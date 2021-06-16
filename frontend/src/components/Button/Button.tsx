import React from "react";
import "./Button.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    theme: "light" | "blue";
}

const Button = ({ theme, children, ...props }: ButtonProps): JSX.Element => {
    return (
        <div {...props} className={`Button Button_${theme}`} tabIndex={0}>
            {children}
        </div>
    );
};

export default Button;
