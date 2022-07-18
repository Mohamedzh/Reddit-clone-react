import { Link } from 'react-router-dom'
import { Navbar, Container, Modal, Button, Form, Image } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux'
import { lightTheme } from '../Actions/theme.actions'
import { darkTheme } from '../Actions/theme.actions'
import { getPosts } from '../Actions/posts.actions'
import { changeElement } from '../Actions/element.actions'

const Navibar = () => {
	const dispatch = useDispatch();
	const themeObj = useSelector(state => state.changeThemeReducer);
	const posts = useSelector(state => state.postsReducer);
	const filteredPosts = useSelector(state => state.elementReducer);


	const switchTheme = () => {
		{ themeObj.background == "light" ? dispatch(darkTheme()) : dispatch(lightTheme()) };
		{ document.body.style.backgroundColor == "rgb(235, 235, 224)" ? document.body.style.backgroundColor = "black" : document.body.style.backgroundColor == "black" ? document.body.style.backgroundColor = "rgb(235, 235, 224)" : document.body.style.backgroundColor = "black" };
	}

	const search = (e) => {
		const x = posts.filter(post => (post.title.toLowerCase()).includes(e.target.value))
		dispatch(getPosts(x))
	}
	// useEffect(() => {console.log(filteredPosts)
	// }, [filteredPosts])
	// New Post form ----------------
	const formik = useFormik({
		initialValues: {
			title: "",
			body: "",
			userId: ""
		},
		onSubmit: (values) => {
			const card = { id: Math.floor(Math.random() * 10), title: values.title, body: values.body, userId: values.userId }
			const router = axios.create({ baseURL: 'https://api.tawwr.com' })
			const y = router.post('/posts', card)
			router.get('https://api.tawwr.com/posts').then((response) => { dispatch(getPosts(response.data.data)) });

			console.log(y)
			console.log(values);
			formik.resetForm()
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please write a title").min(10, "Title should be more than 10 letters").max(40, "Title can't be more than 40 letters"),
			body: Yup.string().required("Please write your post content").min(10, "Title should be more than 10 letters"),
			userId: Yup.string().required("User ID is required").max(1, "Please use a User Id from 0-9")

		}),
	});

	// Modal states ---------------
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Container fluid>

			<Navbar fixed="top" bg={themeObj.background} expand="lg" className="nav">
				<Link to='Reddit-clone-react/'>
					<span className="mx-2">
						<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="_1O4jTk-dZ-VIxsCuYB6OR8 ">
							<g><circle fill="#FF4500" cx="10" cy="10" r="10"></circle><path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path></g></svg>
					</span>
					<span>
						<svg width="60" height="60" className="_1bWuGs_1sq4Pqy099x_yy-" viewBox="0 0 57 18" xmlns="http://www.w3.org/2000/svg">
							<g fill={themeObj.logo}><path d="M54.63,16.52V7.68h1a1,1,0,0,0,1.09-1V6.65a1,1,0,0,0-.93-1.12H54.63V3.88a1.23,1.23,0,0,0-1.12-1.23,1.2,1.2,0,0,0-1.27,1.11V5.55h-1a1,1,0,0,0-1.09,1v.07a1,1,0,0,0,.93,1.12h1.13v8.81a1.19,1.19,0,0,0,1.19,1.19h0a1.19,1.19,0,0,0,1.25-1.12A.17.17,0,0,0,54.63,16.52Z"></path><circle fill="#FF4500" cx="47.26" cy="3.44" r="2.12"></circle><path d="M48.44,7.81a1.19,1.19,0,1,0-2.38,0h0v8.71a1.19,1.19,0,0,0,2.38,0Z"></path><path d="M30.84,1.19A1.19,1.19,0,0,0,29.65,0h0a1.19,1.19,0,0,0-1.19,1.19V6.51a4.11,4.11,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S22.28,18,25.42,18a4.26,4.26,0,0,0,3.1-1.23,1.17,1.17,0,0,0,1.47.8,1.2,1.2,0,0,0,.85-1.05ZM25.41,15.64c-1.83,0-3.32-1.77-3.32-4s1.48-4,3.32-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"></path><path d="M43.28,1.19A1.19,1.19,0,0,0,42.09,0h0a1.18,1.18,0,0,0-1.18,1.19h0V6.51a4.15,4.15,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S34.72,18,37.86,18A4.26,4.26,0,0,0,41,16.77a1.17,1.17,0,0,0,1.47.8,1.19,1.19,0,0,0,.85-1.05ZM37.85,15.64c-1.83,0-3.31-1.77-3.31-4s1.47-4,3.31-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"></path><path d="M17.27,12.44a1.49,1.49,0,0,0,1.59-1.38v-.15a4.81,4.81,0,0,0-.1-.85A5.83,5.83,0,0,0,13.25,5.3c-3.1,0-5.69,2.85-5.69,6.35S10.11,18,13.25,18a5.66,5.66,0,0,0,4.39-1.84,1.23,1.23,0,0,0-.08-1.74l-.11-.09a1.29,1.29,0,0,0-1.58.17,3.91,3.91,0,0,1-2.62,1.12A3.54,3.54,0,0,1,10,12.44h7.27Zm-4-4.76a3.41,3.41,0,0,1,3.09,2.64H10.14A3.41,3.41,0,0,1,13.24,7.68Z"></path><path d="M7.68,6.53a1.19,1.19,0,0,0-1-1.18A4.56,4.56,0,0,0,2.39,6.91V6.75A1.2,1.2,0,0,0,0,6.75v9.77a1.23,1.23,0,0,0,1.12,1.24,1.19,1.19,0,0,0,1.26-1.1.66.66,0,0,0,0-.14v-5A3.62,3.62,0,0,1,5.81,7.7a4.87,4.87,0,0,1,.54,0h.24A1.18,1.18,0,0,0,7.68,6.53Z"></path></g></svg>
					</span>

				</Link>
				<Navbar.Collapse className="justify-content-center ms-5">
					<Form.Control
						type="text"
						id="search"
						// value={formik}
						// onChange={formik.handleChange}
						// onBlur={formik.handleBlur}
						name="search" placeholder='search by post title'
						onChange={search} />



				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text className="p-1 mx-1">
						<Button id="themeBtn" variant={themeObj.variant} onClick={switchTheme}><i className={themeObj.themeBtn}></i></Button>
					</Navbar.Text>
					<Navbar.Text className="p-1 mx-2">
						<Button id="newPostBtn" variant={themeObj.variant} onClick={handleShow}>
							<strong>New Post</strong>
						</Button>
					</Navbar.Text>
				</Navbar.Collapse>
				<Form>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>New Post</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Post Title</Form.Label>
									<Form.Control type="text" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
										name="title" placeholder='Title' />
									<Form.Text className="text-muted" >
										<span style={{ color: "red" }}>{(formik.errors.title && formik.touched.title) ? formik.errors.title : ""}</span>
									</Form.Text>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>User ID</Form.Label>
									<Form.Control type="number" value={formik.values.userId} onChange={formik.handleChange} onBlur={formik.handleBlur}
										name="userId" placeholder='UserID' />
									<Form.Text className="text-muted">
										<span style={{ color: "red" }}>{(formik.errors.userId && formik.touched.userId) ? formik.errors.userId : ""}</span>
									</Form.Text>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Post Details</Form.Label>
									<Form.Control type="text" value={formik.values.body} onChange={formik.handleChange} onBlur={formik.handleBlur}
										name="body" placeholder='Body' />
									<Form.Text className="text-muted">
										<span style={{ color: "red" }}>{(formik.errors.body && formik.touched.body) ? formik.errors.body : ""}</span>
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
				</Form>
			</Navbar>
		</Container>

	);
};


export default Navibar
