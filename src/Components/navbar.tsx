import { Link, useLocation } from 'react-router-dom'
import { Navbar, Container, Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import NewPostForm from './newPostForm'
import { useAppSelector } from '../Redux/hooks'
import { search, searchComments, switchTheme } from '../functions'
import { BsReddit } from 'react-icons/bs'
import RedditLogo from './redditLogo'

const NavBar = () => {
	const location = useLocation()
	const dispatch = useDispatch();
	const themeObj = useAppSelector(state => state.theme);
	const posts = useAppSelector(state => state.post.posts);
	const id = useAppSelector(state => state.post.postId)

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Navbar collapseOnSelect fixed="top" bg={themeObj.background} expand="lg" className="nav">
			<Container>

				<Link to='/'>
					<span className="mx-2">
						<BsReddit style={{ color: "red", height: '30px', width: '30px' }} />
					</span>
					<span>
						<RedditLogo themeObj={themeObj} />
					</span>
				</Link>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				{location.pathname === "/" ? <div id="searchBar">
					<Form.Control
						type="text"
						id="search"
						name="search" placeholder='search by post title'
						onChange={(e) => search(e.currentTarget.value, dispatch, posts)} />
				</div>
					:
					<div id="searchBar">
						<Form.Control
							type="text"
							id="search"
							name="search" placeholder='search by comment'
							onChange={(e) => searchComments(e.currentTarget.value, dispatch, posts, id)} />
					</div>}
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text className="p-1 mx-1">
						<Button id="themeBtn" variant={themeObj.variant}
							onClick={() => switchTheme(dispatch, themeObj)}>
							<i className={themeObj.themeBtn}></i>
						</Button>
					</Navbar.Text>
					<Navbar.Text className="p-1 mx-2">
						<Button id="newPostBtn" variant={themeObj.variant} onClick={() => handleShow()}>
							<strong>New Post</strong>
						</Button>
					</Navbar.Text>
				</Navbar.Collapse>

				<NewPostForm show={show} handleClose={handleClose} />

			</Container>
		</Navbar>

	);
};


export default NavBar
