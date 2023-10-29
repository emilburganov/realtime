import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";

interface InputProps {
    label: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

const Input: FC<InputProps> = ({label, value, setValue}) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                value={value}
                onChange={handleInputChange}
                className="input"
                type="text"
            />
        </div>
    );
};

export default Input;