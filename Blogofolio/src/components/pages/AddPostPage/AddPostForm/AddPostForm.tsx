import React, {FC} from 'react';
import Input, {InputProps} from "../../../common/Input/Input";
import Button, {ButtonProps} from "../../../common/Button/Button";
import Textarea, {TextareaProps} from "../../../common/Textarea/Textarea";
import FileInput, {FileInputProps} from "../../../common/Input/FileInput/FileInput";

import styles from "./AddPostForm.module.css"

interface addPostForm {
    inputs: InputProps[]
    file: FileInputProps
    buttons: ButtonProps[]
    textAreas: TextareaProps[]
}
interface AddFormProps {
    addPostFormConfig: addPostForm
    imagePreview?: string
}

const AddPostForm:FC<AddFormProps> = ({addPostFormConfig, imagePreview}) => {
    return (
        <form className={styles.wrapper}>
            <div className={styles.inputs}>
                {addPostFormConfig.inputs.map((input => <Input {...input} key={input.id}/>))}
                <FileInput {...addPostFormConfig.file}/>
            </div>
                {!!imagePreview &&
                    <div className={styles.blockPreview}>
                        <img src={imagePreview} className={styles.preview}/>
                    </div>}
                {addPostFormConfig.textAreas.map((textarea => <Textarea {...textarea} key={textarea.id}/>))}
            <div className={styles.buttons}>
                <Button {...addPostFormConfig.buttons[0]}/>
                <div className={styles.leftButtons}>
                    {addPostFormConfig.buttons.map(button =>
                        <Button {...button} key={button.id}/>).filter((button, index) => index >= 1)}
                </div>
            </div>
        </form>
    );
};

export default AddPostForm;