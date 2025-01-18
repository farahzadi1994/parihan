import React, { Dispatch, SetStateAction } from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "jalali-moment";

interface CustomDatePickerProps {
    value: Date | null;
    setValue: Dispatch<SetStateAction<Date | null>>;
    label: string;
}

export const CustomDatePicker = (props: CustomDatePickerProps) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        e.preventDefault();
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <DatePicker
                label={props.label}
                slotProps={{
                    desktopPaper: {
                        dir: "rtl",
                    },
                    mobilePaper: {
                        dir: "rtl",
                    },
                }}
                onChange={(e) => props.setValue(e)}
                sx={{ width: "100%" }}
                value={props.value ? moment(props.value).toDate() : null}
            />
        </LocalizationProvider>
    );
};
