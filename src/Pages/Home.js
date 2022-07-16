import { Link } from 'react-router-dom'
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Home = () => {
  const posts = useSelector(state => state.postsReducer);
  const light = useSelector(state => state.lightReducer);
	const dark = useSelector(state => state.darkReducer);
	const variant = useSelector(state => state.variantReducer);
  const bw = useSelector(state => state.bwReducer);


  if (posts?.length == 0) {
    return (<div className="wrapper"><h1 >Loading...<Spinner animation="border" /></h1></div>)
}

  return <div className="wrapper" >
    <div>
      {posts?.length > 0 && posts.map((post, key) => (
        <Card key={post.id} className="card" bg={dark} border={light} text={light}>
          <Card.Header>{post.userId}</Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.body}
            </Card.Text>
            <Link to={'/post/' + post.id}><Button variant={variant}>read more...</Button></Link>
          </Card.Body>
        </Card>


      ))}
    </div>
  </div>
}
export default Home