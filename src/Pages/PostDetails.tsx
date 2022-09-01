import { useParams } from 'react-router-dom'
import { Card, Spinner, Container, Image, Badge } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import Portrait from '../Components/Images/portrait.jpg'
import { useAppSelector } from '../Redux/hooks'
import { Post } from '../types'
import { Color } from 'react-bootstrap/esm/types'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import { BsFillHandThumbsDownFill } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import NewCommentForm from '../Components/newCommentForm'
import { getAllComments, scrollToComments } from '../functions'
import { Vote } from '../api'

const PostDetails = () => {
    const [newPost, SetNewPost] = useState<Post>()
    const posts = useAppSelector(state => state.post.currentPosts);
    const themeObj = useAppSelector(state => state.theme);
    const comments = useAppSelector(state=>state.comment.currentComments)

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const currentPost = (posts?.length > 0 && posts.find(post => (post.id === +id)))
            if (currentPost) {
                SetNewPost(currentPost)
            }
            getAllComments(dispatch, +id, posts)
        }
    }, [posts]);

    const upVoteObj = { userId: 2, value: 1 }
    const downVoteObj = { userId: 2, value: -1 }

    if (posts?.length === 0) {
        return (<div><h1>Loading...<Spinner animation="border" /></h1></div>)
    }

    return <div className="wrapper py-5">

        <Container className="mt-5" fluid="sm" key={newPost?.id}>

            <Card id="cardDetail" bg={themeObj.background} text={themeObj.textColor as Color}>

                <Card.Body>
                    <Card.Title><Image roundedCircle className="portrait" src={Portrait}></Image><strong>{newPost?.title}</strong>
                        {newPost?.tags.map((tag, idx) =>
                            <Badge pill key={idx} className="m-3" bg={themeObj.variant}>{tag.title}</Badge>)}
                    </Card.Title>
                    <Card.Text as='div'>
                        By user {newPost?.userId}
                        <br></br>
                        <br></br>
                        {newPost?.body}
                        <p> on <Moment format="DD MM YYYY hh:mm">{newPost?.createdAt}</Moment></p>
                        <hr></hr>
                    </Card.Text>

                    <BsFillHandThumbsUpFill
                        className="postIcon"
                        onClick={() => Vote(dispatch, upVoteObj, newPost!)}
                    />
                    <span className="postStats">{newPost?.upVotesTotal}</span>
                    <BsFillHandThumbsDownFill
                        className="postIcon"
                        onClick={() => Vote(dispatch, downVoteObj, newPost!)}
                    />
                    <span className="postStats">{newPost?.downVotesTotal}</span>

                    <BiCommentDetail
                        className="postIcon"
                        onClick={() => scrollToComments()}
                    />
                    <span className="postStats">{newPost?.commentsTotal}</span>

                </Card.Body>
            </Card>

            <Card id="cardDetail" bg={themeObj.background} text={themeObj.textColor as Color}>

                <Card.Body>
                    <Card.Title className="m-2"><strong>Comments</strong></Card.Title>
                    <Card.Text className="ms-2" as='div'>
                        <hr></hr>
                        {comments.map(comment =>
                            <p key={comment.id}>
                                {comment.body} <br></br>
                                <span><strong>created by user {comment.userId} </strong></span>
                            </p>)}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted pb-4">

                    <NewCommentForm newPost={newPost!} />

                </Card.Footer>
            </Card>
        </Container>
    </div>
}
export default PostDetails