import { InputLabel, MenuItem, Select, TextField, TextFieldProps } from "@mui/material";

export function InputWithLabel(props: TextFieldProps & {label: string}){
    const _props = {...props};
    delete (_props as any).label;
    return(
        <div className="flex flex-col space-y-2 w-[40%]">
            <InputLabel>{props.label}</InputLabel>
            <TextField autoComplete="off" variant="outlined" {..._props} size="small" />
        </div>
    )
}

export function FormInputWrapper({label, children}: {label: string, children: any}){
    return(
        <div className="flex flex-col space-y-2 w-[40%]">
            <InputLabel>{label}</InputLabel>
            {children}
        </div>
    )
}