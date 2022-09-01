import { Link } from 'react-router-dom'
import { Button, Card, Spinner, Container, Image, Badge } from 'react-bootstrap'
import React from 'react'
import Moment from 'react-moment'
import { useAppSelector } from '../Redux/hooks'
import { Color } from 'react-bootstrap/esm/types'
import Portrait from '../Components/Images/portrait.jpg'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import { BsFillHandThumbsDownFill } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { getCurrentPostId } from '../Redux/Slices/postSlice'


const Home = () => {
  const posts = useAppSelector(state => state.post.currentPosts);
  const themeObj = useAppSelector(state => state.theme);
  const dispatch = useDispatch()

  if (posts?.length === 0) {
    return (<div className="wrapper"><h1 >Loading...<Spinner animation="border" /></h1></div>)
  }

  return <div className="wrapper py-5" >
    <Container className="pt-5" fluid="sm">

      {posts?.length > 0 && posts.map((post, key) => (
        <Card key={post.id} className="card" bg={themeObj.background} text={themeObj.textColor as Color}>
          <Card.Body>
            <Card.Title>
              <Image roundedCircle className="portrait" src={Portrait}></Image>
              {post.title}
              {post?.tags?.length > 0 &&
                post?.tags.map((tag, idx) =>
                  <Badge key={idx} pill className="m-3" bg={themeObj.variant}>{tag.title}</Badge>)}
            </Card.Title>
            <Card.Text as='div'>
              By user {post.userId}
              <hr></hr>
              {post.body}
              <p><Moment format="DD MM YYYY hh:mm">{post?.createdAt}</Moment></p>

              <p>
                <span className="me-2">
                  <BsFillHandThumbsUpFill
                    className="mainIcon"
                  />  {post.upVotesTotal}</span>
                <span className="m-2">
                  <BsFillHandThumbsDownFill
                    className="mainIcon"
                  />  {post.downVotesTotal}</span>
                <span className="m-2">
                  <BiCommentDetail
                    className="mainIcon"
                  />  {post?.commentsTotal}</span>
              </p>
            </Card.Text>
            <Link to={'post/' + post.id}>
              <Button
                variant={themeObj.variant}
                style={{ marginLeft: 'auto' }}
                onClick={()=>dispatch(getCurrentPostId(post.id))}
              >read more...</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  </div>
}
export default Home