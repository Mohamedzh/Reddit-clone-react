import { Form, Button } from 'react-bootstrap'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../Redux/hooks'
import { Post } from '../types'
import { postComment } from '../api'


type Props = {
    newPost: Post
}

const NewCommentForm = ({ newPost }: Props) => {
    const dispatch = useDispatch()
    const posts = useAppSelector(state => state.post);
    const themeObj = useAppSelector(state => state.theme);

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        onSubmit: (values) => {
            const data = { body: values.comment, userId: 1 }
            postComment(dispatch, data, newPost)
            formik.resetForm()
        },
        validationSchema: Yup.object({
            comment: Yup.string().required("Please write your comment")
        }),
    });
    return (
        <div>
            <Form>
                <Form.Label></Form.Label>
                <Form.Control
                    type="text"
                    id="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="comment" placeholder='comment'
                />
                <Form.Text id="comment" muted>
                    <p style={{ color: "red" }}>{(formik.errors.comment && formik.touched.comment) ? formik.errors.comment : ""}</p>
                    <p>Add your thoughts</p>
                </Form.Text>
            </Form>
            <Button id='commentBtn' variant={themeObj.variant} onClick={() => formik.handleSubmit()}><strong>Comment</strong></Button>
        </div>
    )
}

export default NewCommentForm