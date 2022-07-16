import { Link } from 'react-router-dom'
import { Navbar, Container, Modal, Button, Form } from 'react-bootstrap'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux'
import { darkTheme } from '../Actions/dark.actions'
import { lightTheme } from '../Actions/light.actions'
import { changeVariant } from '../Actions/variant.actions'
import { changeTheme } from '../Actions/themeBtn.actions'
import { blackWhite } from '../Actions/blackwhite.actions'

const Navibar = () => {
	const dispatch = useDispatch();
	const light = useSelector(state => state.lightReducer);
	const dark = useSelector(state => state.darkReducer);
	const variant = useSelector(state => state.variantReducer);
	const themeBtn = useSelector(state => state.themeReducer);
	const bw = useSelector(state => state.bwReducer);
	const switchTheme = () => {
		{ dark == "light" ? dispatch(darkTheme("dark")) : dispatch(darkTheme("light")) };
		{ light == "dark" ? dispatch(lightTheme("light")) : dispatch(lightTheme("dark")) };
		{ variant == "primary" ? dispatch(changeVariant("warning")) : dispatch(changeVariant("primary")) };
		{ themeBtn == "bi bi-moon-stars-fill" ? dispatch(changeTheme("bi bi-brightness-high-fill")) : dispatch(changeTheme("bi bi-moon-stars-fill")) };
		{ bw == "white" ? dispatch(blackWhite("black")) : dispatch(blackWhite("white")) };
		{document.body.style.backgroundColor == "white" ? document.body.style.backgroundColor ="black" : document.body.style.backgroundColor == "black" ? document.body.style.backgroundColor ="white" : document.body.style.backgroundColor ="black" };
	}


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
			console.log(y)
			console.log(values);
			formik.resetForm()
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Title is required").min(10, "limit small").max(40, "limit passed"),
			body: Yup.string().required("your message is required").min(10, "limit small"),
			userId: Yup.string().required("User ID is required").min(1, "limit small").max(1, "limit passed")

		}),
	});
	// Modal states ---------------
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Navbar bg={dark} expand="lg" className="nav">
			<Container>
				<Link to='Reddit-clone-react/'><button style={{
					fontSize: "1.5em",
					backgroundColor: 'transparent',
					backgroundRepeat: 'no-repeat',
					border: 'none',
					cursor: 'pointer',
					overflow: 'hidden',
					outline: 'none',
					color: `${bw == 'white' ? 'black' : 'white'}`,
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-reddit" viewBox="0 0 16 16">
						<path d="M6.167 8a.831.831 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661zm1.843 3.647c.315 0 1.403-.038 1.976-.611a.232.232 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.203.203 0 0 0-.153.028.186.186 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256 2.577 0 4.668-1.451 4.668-3.256 0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z" />
					</svg>
					<strong>  New Reddit</strong>
				</button></Link>

				<Button id="newPostBtn" variant={variant} onClick={handleShow}>
					New Post  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-plus" viewBox="0 0 16 16">
						<path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
						<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
					</svg>
				</Button>
				<Button id="themeBtn" variant={variant} onClick={switchTheme}><i className={themeBtn}></i></Button>
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
									<Form.Text className="text-muted">
										{(formik.errors.title && formik.touched.title) ? formik.errors.title : ""}
									</Form.Text>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>User ID</Form.Label>
									<Form.Control type="number" value={formik.values.userId} onChange={formik.handleChange} onBlur={formik.handleBlur}
										name="userId" placeholder='UserID' />
									<Form.Text className="text-muted">
										{(formik.errors.userId && formik.touched.userId) ? formik.errors.userId : ""}
									</Form.Text>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Post Details</Form.Label>
									<Form.Control type="text" value={formik.values.body} onChange={formik.handleChange} onBlur={formik.handleBlur}
										name="body" placeholder='Body' />
									<Form.Text className="text-muted">
										{(formik.errors.body && formik.touched.body) ? formik.errors.body : ""}
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
			</Container>
		</Navbar>
	);
};


export default Navibar
