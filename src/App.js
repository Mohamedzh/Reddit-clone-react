import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import PostDetails from './Pages/PostDetails';
import { useEffect } from 'react'
import axios from 'axios'
import Navibar from './Components/navbar.js'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from './Actions/posts.actions';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('https://api.tawwr.com/posts').then((response) => { dispatch(getPosts(response.data.data)) })
  }, [])

  return (
    <div className="App">
      <Navibar />
      <Routes>
        <Route path='Reddit-clone-react/' element={<Home />} />
        <Route path='Reddit-clone-react/post/:id' element={<PostDetails />} />
      </Routes>

    </div>
  );
}

export default App;
