import {BtnVariants, ButtonTypeProps} from "../../../common/Button/Button";
import {MouseEventHandler} from "react";
import {InputError, InputProps} from "../../../common/Input/Input";

export interface noAccountProps {
    text: string
    url: string
    linkText: string
}
export interface messageProps {
    firstLine?: string
    secondLine?: string
    additional?: string
}
export interface linksProps {
    url: any
    text: string

}
export interface buttonProps {
    variant: BtnVariants,
    children: string,
    type?: ButtonTypeProps
    onClick: MouseEventHandler,
    disabled?: boolean
}
export interface homeProps {
    url: string
    text: string
}
export interface FormConfigProps {
    inputs?: InputProps[]
    button?: buttonProps
    message?: messageProps
    noAccount?: noAccountProps
    link?: linksProps
    home?: homeProps
    error?: InputError
}