import React, {ChangeEvent, ChangeEventHandler, FC, useState} from 'react';
import {PageProps} from "../../AppRouter/routes";

import AddPostForm from "../AddPostPage/AddPostForm/AddPostForm";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import {BtnVariants, ButtonTypeProps} from "../../common/Button/Button";
import {textareaNames} from "../../common/Textarea/Textarea";

import {useDispatch, useSelector} from "react-redux";
import {selectCardAction} from "../../../store/reducers/selectedCardReducer";

import styles from "../AddPostPage/AddPostPage.module.css";

export interface EditPostFormState {
    id: number
    lesson_num: number
    title: string,
    author: number,
    date: string,
    image: any,
    text: string,
    description: string
}

const EditPostPage:FC<PageProps> = ({title}) => {

    const dispatch = useDispatch();
    const {cardForEdit} = useSelector((state:any) => state.cardForEdit)

    const postFormInitialState = {
        title: cardForEdit?.title,
        author: cardForEdit?.author,
        date: cardForEdit?.date,
        image: "",
        text: cardForEdit?.text,
        id: Math.random(),
        lesson_num: Math.random(),
        description: "",
    }

    const [formState, setFormState] = useState<EditPostFormState>(postFormInitialState)
    const [imagePreview, setImagePreview] = useState<any>(cardForEdit?.image);

    const handleSetTitle = (e: ChangeEvent<HTMLInputElement>) => {if(e) {setFormState(prevState => ({...prevState, title: e.target.value}))}}
    const handleSetDescription = (e: ChangeEvent<HTMLInputElement>) => {if(e) {setFormState(prevState => ({...prevState, description: e.target.value}))}}
    const handleSetDate = (e: ChangeEvent<HTMLInputElement>) => {if(e) {setFormState(prevState => ({...prevState, date: e.target.value}))}}
    const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {if(e) {setFormState(prevState => ({...prevState, text: e.target.value}))}}

        const handleSetImage: ChangeEventHandler<HTMLInputElement> = (event) => {
            const file = event?.target?.files?.[0]
            const reader = new FileReader();

            reader.addEventListener("load", () => setImagePreview(reader.result))

            if (file) {
                reader.readAsDataURL(file)
            }
            setFormState(prevState => ({...prevState, image: event?.target?.value}))
    }

    const handleSetRemove = (e: any) => {
        if(e) {
            setImagePreview("")
            setFormState(prevState => ({...prevState, image: ""}))
            e.preventDefault()
        }
    }

    const handleSubmit= () => {
       dispatch(selectCardAction({...formState, image: imagePreview, date: Date.now()}))
    }

    const EDIT_POST_CONFIG = {
        inputs: [{
            page: "Add",
            title: "Title",
            id: "Title",
            disabled: false,
            type: "text",
            name: "Title",
            onChange: handleSetTitle,
            value: formState.title,
        },
            {
                page: "Add",
                title: "Description",
                id: "description",
                disabled: false,
                type: "text",
                name: "description",
                onChange: handleSetDescription,
                value: formState.description,
            }, {
                page: "Add",
                title: "Publish at",
                id: "date",
                disabled: false,
                type: "text",
                name: "date",
                onChange: handleSetDate,
                value: formState.date
            }],
        file: {
            page: "Add",
            title: "Image",
            id: "Image",
            disabled: false,
            type: "file",
            name: "Image",
            onChange: handleSetImage,
            value: formState.image,
            file: formState?.image.replace(/.*\\/, "") || "File",
            onClick: handleSetRemove,
        },
        buttons: [
            {
                id: 1,
                variant:BtnVariants.editPost,
                children: BtnVariants.editPost,
                type: ButtonTypeProps.button,
                onClick: handleSubmit,
                disabled: false
            },
           ],
        textAreas: [
            {
                title: "Text",
                value: formState.text,
                onChange: handleSetText,
                id: "Text",
                name: textareaNames.Text,
            }]
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.page}>
                <AddPostForm addPostFormConfig={EDIT_POST_CONFIG} imagePreview={imagePreview}></AddPostForm>
            </div>
        </PageWrapper>
    );
};

export default EditPostPage;