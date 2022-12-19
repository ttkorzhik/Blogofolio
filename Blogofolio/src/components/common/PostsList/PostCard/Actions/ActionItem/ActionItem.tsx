import React, {FC, MouseEventHandler, ReactNode} from 'react';

export interface ActionProps {
    text?: string
    className?: string
    children?: ReactNode
    onClick?: MouseEventHandler,
}

const ActionItem:FC<ActionProps> = (props) => {
    return (
        <div>
            <button className={props.className} onClick={props.onClick}>
                {props.children}
                {props.text}
            </button>
        </div>
    );
};

export default ActionItem;