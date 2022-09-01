import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';

const initialState: {
  posts: Post[],
  currentPosts: Post[]
  postId: number
} = {
  posts: [],
  currentPosts: [],
  postId: NaN
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    getFilteredPosts: (state, action: PayloadAction<Post[]>) => {
      state.currentPosts = action.payload
    },
    getCurrentPostId: (state, action: PayloadAction<number>) => {
      state.postId = action.payload
    }
  }
})

export const { getPosts, getFilteredPosts, getCurrentPostId } = postSlice.actions
export default postSlice.reducer
