import {FC} from "react";

interface ButtonProps {
    children: string
    [props: string]: any;
}

const Button: FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button
            className="button"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;