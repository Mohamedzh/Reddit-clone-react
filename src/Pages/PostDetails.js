import { useParams } from 'react-router-dom'
import { ListGroup, Card, InputGroup, Form, Button, Accordion, Modal, Spinner } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../Actions/posts.actions'

const PostDetails = () => {
    const [newPost, SetNewPost] = useState({})
    const posts = useSelector(state => state.postsReducer);
    const light = useSelector(state => state.lightReducer);
    const dark = useSelector(state => state.darkReducer);
    const variant = useSelector(state => state.variantReducer);
    const bw = useSelector(state => state.bwReducer);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    useEffect(() => {
        const postfind = (posts?.length > 0 && posts.find(post => (post.id === +id)))
        SetNewPost(postfind)
    }, [posts]);


    //Votes----------------------------
    const upvoteObj = { userId: 5, userVote: 1 }
    const downvoteObj = { userId: 6, userVote: -1 }

    const upVote = async () => {
        try {
            const response = await axios.post(`https://api.tawwr.com/posts/${newPost.id}/vote`, upvoteObj)
            console.log(response)
            axios.get('https://api.tawwr.com/posts').then((response) => { dispatch(getPosts(response.data.data)) });

        } catch (e) {
            console.log(e);
        };
    };
    
    const downVote = async () => {
        try {
            const response = await axios.post(`https://api.tawwr.com/posts/${newPost.id}/vote`, downvoteObj)
            console.log(response)
            axios.get('https://api.tawwr.com/posts').then((response) => { dispatch(getPosts(response.data.data)) });

        } catch (e) {
            console.log(e);
        };
    }

    //Formik for the comments input------------------
    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        onSubmit: (values) => {
            const newObj = { body: values.comment, userId: 5 }
            const postdata = async () => {
                try {
                    const response = await axios.post(`https://api.tawwr.com/posts/${newPost.id}/comment`, newObj);
                    console.log(response)
                    axios.get('https://api.tawwr.com/posts').then((response) => { dispatch(getPosts(response.data.data)) });

                } catch (e) {
                    console.log(e);
                };
            }
            postdata();
            formik.resetForm()
        },
        validationSchema: Yup.object({
            comment: Yup.string().required("Comment is required").max(120, "limit passed"),

        }),
    });
    if (posts?.length == 0) {
        return (<div className="wrapper"><h1 >Loading...<Spinner animation="border" /></h1></div>)
    }

    return <div className="wrapper">


        <Card key={newPost?.id} bg={dark} border={light} text={light}>
            <Card.Header><strong>{newPost?.title}</strong>
            </Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text >
                    {newPost?.body}
                    <p> on <Moment format="DD MM YYYY hh:mm">{newPost?.createdAt}</Moment></p>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>User comments</Accordion.Header>
                            <Accordion.Body style={{ backgroundColor: `${bw}` }}>
                                {newPost?.comments?.length > 0 && newPost.comments.map(comment => comment.body).map((x, userId, index) => <p>{x} <strong>created by user {userId} </strong></p>)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Comment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Post your comment</Form.Label>
                                    <Form.Control type="text" value={formik.values.comment} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        name="comment" placeholder='comment' />
                                    <Form.Text className="text-muted">
                                        {(formik.errors.comment && formik.touched.comment) ? formik.errors.comment : ""}
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
                                Publish
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Text>
                <button style={{
                    backgroundColor: 'transparent',
                    backgroundRepeat: 'no-repeat',
                    border: 'none',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    outline: 'none',
                    fontSize: '25px',
                    color: `${bw == 'white' ? 'black' : 'white'}`,
                    pointerEvents: 'none',
                }}>
                <svg className="svg-icon" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M12.871,9.337H7.377c-0.304,0-0.549,0.246-0.549,0.549c0,0.303,0.246,0.55,0.549,0.55h5.494
								c0.305,0,0.551-0.247,0.551-0.55C13.422,9.583,13.176,9.337,12.871,9.337z M15.07,6.04H5.179c-0.304,0-0.549,0.246-0.549,0.55
								c0,0.303,0.246,0.549,0.549,0.549h9.891c0.303,0,0.549-0.247,0.549-0.549C15.619,6.286,15.373,6.04,15.07,6.04z M17.268,1.645
								H2.981c-0.911,0-1.648,0.738-1.648,1.648v10.988c0,0.912,0.738,1.648,1.648,1.648h4.938l2.205,2.205l2.206-2.205h4.938
								c0.91,0,1.648-0.736,1.648-1.648V3.293C18.916,2.382,18.178,1.645,17.268,1.645z M17.816,13.732c0,0.607-0.492,1.1-1.098,1.1
								h-4.939l-1.655,1.654l-1.656-1.654H3.531c-0.607,0-1.099-0.492-1.099-1.1v-9.89c0-0.607,0.492-1.099,1.099-1.099h13.188
								c0.605,0,1.098,0.492,1.098,1.099V13.732z"></path>
                </svg> {newPost?.commentsTotal} </button>
                <button style={{
                    backgroundColor: 'transparent',
                    backgroundRepeat: 'no-repeat',
                    border: 'none',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    outline: 'none',
                    fontSize: '25px',
                    color: `${bw == 'white' ? 'black' : 'white'}`,
                    margin: '10px',
                }} onClick={upVote}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill={bw == 'white' ? 'black' : 'white'} className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg>  {newPost.upVotesTotal}</button>
                    <button style={{
                    backgroundColor: 'transparent',
                    backgroundRepeat: 'no-repeat',
                    border: 'none',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    outline: 'none',
                    fontSize: '25px',
                    color: `${bw == 'white' ? 'black' : 'white'}`,
                }} onClick={downVote}><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill={bw == 'white' ? 'black' : 'white'} className="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
              </svg>  {newPost.downVotesTotal}</button>
                <Button id='commentBtn' variant={variant} onClick={handleShow}>Add your comment</Button>
            </Card.Body>
        </Card>

    </div>
}
export default PostDetails