import { InputLabel, InputBaseProps, Typography } from "@mui/material";
import { useField } from "formik";
import React from "react";
import TextInput from "./TextInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface TextFieldProps extends InputBaseProps {
    name: string;
    label: string;
    placeholder?: string;
    helperText?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
    const [field, meta] = useField(props.name);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e); // Default Formik handler
        if (props.onChange) {
            props.onChange(e); // Custom onChange handler from props if passed
        }
    };

    const textFieldProps: TextFieldProps = {
        ...props,
        ...field,
        fullWidth: true,
        placeholder: props.placeholder,
        type: showPassword ? "text" : props.type,
        onChange: handleChange, // Use the custom handleChange
    };

    if (meta && meta.touched && meta.error) {
        textFieldProps.error = true;
        textFieldProps.helperText = meta.error;
    }

    return (
        <>
            <InputLabel
                sx={{ color: "#2B2828", fontSize: "14px", paddingLeft: "5px" }}
            >
                {props.label}
            </InputLabel>
            <TextInput {...textFieldProps} />
            {textFieldProps.helperText && (
                <Typography
                    sx={{ marginTop: "5px", fontSize: "12px" }}
                    color="error.main"
                    className="helperText"
                >
                    {textFieldProps.helperText}
                </Typography>
            )}
        </>
    );
};
