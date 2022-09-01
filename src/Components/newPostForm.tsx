import { Modal, Button, Form, Badge } from 'react-bootstrap'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import { newPostSubmit } from '../api'
import { useAppSelector } from '../Redux/hooks';
import { addToTags } from '../Redux/Slices/tagSlice';
import { restoreTags } from '../functions';
import { Tag } from '../types';

type Props = {
    show: boolean
    handleClose: () => void
}
const NewPostForm = ({ show, handleClose }: Props) => {
    const dispatch = useDispatch();
    const tags = useAppSelector(state => state.tag.tags)
    const currentTags = useAppSelector(state => state.tag.currentTags)

    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
            userId: NaN
        },
        onSubmit: (values) => {
            const tagIds = currentTags.map((tag: Tag) => tag.id)
            const card = { id: Math.floor(Math.random() * 10), title: values.title, body: values.body, userId: values.userId, tagIds }
            newPostSubmit(dispatch, card);
            handleClose()
            formik.resetForm()
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please write a title").min(10, "Title should be more than 10 letters").max(40, "Title can't be more than 40 letters"),
            body: Yup.string().required("Please write your post content").min(10, "Title should be more than 10 letters"),
            userId: Yup.string().required("Please enter your user id").max(1, "Please use a User Id from 0-9")

        }),
    });
    return (
        <Modal show={show} onHide={handleClose} onExit={() => restoreTags(dispatch)}>
            <Modal.Header closeButton>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Post Title</Form.Label>
                        {currentTags.map((tag, idx) =>
                            <Badge
                                className="mx-1 my-1"
                                key={idx} pill bg="success">
                                {tag.title}
                            </Badge>)}
                        <Form.Control
                            type="text"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="title"
                            placeholder='Title' />
                        <Form.Text className="text-muted" >
                            <span style={{ color: "red" }}>
                                {(formik.errors.title && formik.touched.title) ? formik.errors.title : ""}
                            </span>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control
                            type="number"
                            value={formik.values.userId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="user id"
                            placeholder='UserID'
                        />
                        <Form.Text className="text-muted">
                            <span style={{ color: "red" }}>
                                {(formik.errors.userId && formik.touched.userId) ? formik.errors.userId : ""}
                            </span>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Post Details</Form.Label>
                        <Form.Control
                            type="text"
                            value={formik.values.body}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="body"
                            placeholder='Body'
                        />
                        <Form.Text className="text-muted">
                            <span style={{ color: "red" }}>
                                {(formik.errors.body && formik.touched.body) ? formik.errors.body : ""}
                            </span>
                        </Form.Text>
                    </Form.Group>

                    <h6>Choose post subject</h6>
                    {tags.map((tag, idx) =>
                        <Button
                            className="mx-1 my-1"
                            key={idx}
                            variant="outline-primary"
                            onClick={() => dispatch(addToTags(tag))}
                        >{tag.title}</Button>
                    )}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={() => formik.handleSubmit()}>
                    Publish
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default NewPostForm