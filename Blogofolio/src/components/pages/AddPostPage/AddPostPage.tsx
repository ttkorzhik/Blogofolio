import React, {ChangeEvent, ChangeEventHandler, FC, useState} from 'react';
import AddPostForm from "./AddPostForm/AddPostForm";
import {textareaNames} from "../../common/Textarea/Textarea";
import {BtnVariants, ButtonTypeProps} from "../../common/Button/Button";
import {PageProps, Routes} from "../../AppRouter/routes";
import PageWrapper from "../../common/PageWrapper/PageWrapper";

import {handleMyPost} from "../../../store/asyncActions/myPostActions";
import {modifyDate} from "../../../utils/dateUtil";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import styles from "./AddPostPage.module.css"
import {InputError} from "../../common/Input/Input";
import {setMyPostsAction} from "../../../store/reducers/myPostsReducer";

interface AddPostFormValidState {
    title: string,
    image: File | null ,
    imageName: string
    text: string,
}
interface AddPostFormState extends AddPostFormValidState{
    URL: string,
    date: string,
    description: string,
    id?: number
}

const postFormValidInitialState = {
    title: "",
    image: null,
    imageName: "",
    text: "",
}

const postFormInitialState = {
    title: "",
    URL: "",
    date: modifyDate(Date.now()),
    image: null,
    imageName: "",
    description: "",
    text: "",
    id: Math.random()
}

interface IFormErrors {
    title: InputError
    image: InputError
    description: InputError
    text: InputError
}

export const initialErrorValue = { text: null, error: false }

const initialFormElementsError: IFormErrors = {
    title: initialErrorValue,
    image: initialErrorValue,
    description: initialErrorValue,
    text: initialErrorValue,
}

const AddPostPage:FC<PageProps> = ({title}) => {

    const [formState, setFormState] = useState<AddPostFormState>(postFormInitialState)
    const [formStateValid, setFormStateValid] = useState<AddPostFormValidState>(postFormValidInitialState)
    const [imagePreview, setImagePreview] = useState<any>("");
    const [formFieldsError, setFormFieldsError] = useState<IFormErrors>(initialFormElementsError)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormStateValid(prevState => ({...prevState, title: e.target.value}))
            setFormState(prevState => ({...prevState, title: e.target.value}))
            setFormFieldsError(prevState => ({ ...prevState, title: initialErrorValue }))
        }
    }
    const handleSetURL = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, URL: e.target.value}))}
    }
    const handleSetDate = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, date: e.target.value}))}
    }
    const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormStateValid(prevState => ({...prevState, text: e.target.value}))
            setFormState(prevState => ({...prevState, text: e.target.value}))
            setFormFieldsError(prevState => ({ ...prevState, text: initialErrorValue }))
        }
    }
    const handleSetDescription = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, description: e.target.value}))}
    }

    const handleSetImage: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event?.target?.files?.[0]
        const reader = new FileReader();

        reader.addEventListener("load", () => setImagePreview(reader.result))

        if (file) {
            reader.readAsDataURL(file)
        }
        setFormFieldsError(prevState => ({ ...prevState, image: initialErrorValue }))
        setFormStateValid(prevState => ({...prevState, imageName: event?.target?.value, image: file || null}))
        setFormState(prevState => ({...prevState, imageName: event?.target?.value, image: file || null}))
    }

    const handleSetRemove = (e: any) => {
        if(e) {
            setFormState(prevState => ({...prevState, image: null, imageName: ""}))
            setImagePreview("")
            e.preventDefault()
        }
    }
    const handleCancel = () => {
        setFormState(postFormInitialState)
        setImagePreview("")
    }
    const handleFormValidate = () => {
        let isValid = true
        for (let field in formStateValid) {
            // @ts-ignore
            if (!formStateValid[field]) {
                setFormFieldsError(prevState => ({ ...prevState, [field]: { error: true, text: "Required Field is Empty" } }))
                isValid = false
            }
        }
        return isValid
    }

    const handlePostCreate = () => {
        const isValid = handleFormValidate();
        if (isValid) {
          dispatch(handleMyPost(formStateValid.image,formStateValid.text,1, formStateValid.text,  localStorage.getItem("access") || ""));
          const myPostsArray = []
          myPostsArray.push({...formState, image: imagePreview})
          dispatch(setMyPostsAction(myPostsArray))
          navigate(Routes.blog)
        }
    }

    const handleDeletePost = () => {
        navigate(Routes.blog)
    }
    const ADD_POST_CONFIG = {
        inputs: [{
            page: "Add",
            title: "Title",
            id: "Title",
            disabled: false,
            placeholder: "Astronauts prep for new solar arrays on nearly spacewalk",
            type: "text",
            name: "Title",
            onChange: handleSetTitle,
            value: formState.title,
            error: formFieldsError?.title
        },
            {
                page: "Add",
                title: "URL",
                id: "URL",
                disabled: false,
                placeholder: "iss-us-eva-79",
                type: "text",
                name: "URL",
                onChange: handleSetURL,
                value: formState.URL,
            }, {
                page: "Add",
                title: "Publish at",
                id: "date",
                disabled: false,
                placeholder: "11/03/2022",
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
                placeholder: "filename.jpeg",
                type: "file",
                name: "Image",
                onChange: handleSetImage,
                value: formState.imageName,
                file: formState.imageName.replace(/.*\\/, "") || "File",
                onClick:handleSetRemove,
                error: formFieldsError?.image
            },
        buttons: [
            {
                id: 1,
                variant:BtnVariants.deletePost,
                children: BtnVariants.deletePost,
                type: ButtonTypeProps.button,
                onClick: handleDeletePost,
                disabled: false
            },
            {   id: 2,
                variant:BtnVariants.cancel,
                children: BtnVariants.cancel,
                type: ButtonTypeProps.button,
                onClick: handleCancel,
                disabled: false
            }, {id: 3,
                variant:BtnVariants.addPost,
                children: BtnVariants.addPost,
                type: ButtonTypeProps.button,
                onClick: handlePostCreate,
                disabled: false,
                submit: false
            }],
        textAreas: [
            {
                title: "Description",
                value: formState.description,
                onChange: handleSetDescription,
                id: "Description",
                placeholder: "Add your text",
                name: textareaNames.Description
            },
            {
                title: "Text",
                value: formState.text,
                onChange: handleSetText,
                id: "Text",
                placeholder: "Add your text",
                name: textareaNames.Text,
                error: formFieldsError?.text
            }]
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.page}>
                <AddPostForm addPostFormConfig={ADD_POST_CONFIG} imagePreview={imagePreview}></AddPostForm>
            </div>
        </PageWrapper>
    );
};

export default AddPostPage;