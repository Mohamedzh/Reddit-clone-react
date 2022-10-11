import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import PostDetails from './Pages/PostDetails';
import { useEffect } from 'react'
import NavBar from './Components/navbar'
import { useDispatch } from 'react-redux'
import { getAllPosts, getAllTags } from './api'
import React from 'react';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    getAllPosts(dispatch)
    getAllTags(dispatch)
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<PostDetails />} />
      </Routes>

    </div>
  );
}

export default App;
