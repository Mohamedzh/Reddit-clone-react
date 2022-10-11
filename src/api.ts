import axios from 'axios'
import { Dispatch } from 'redux'
import { getFilteredPosts, getPosts } from './Redux/Slices/postSlice'
import { getTags } from './Redux/Slices/tagSlice'
import { CommentObject, NewPost, Post, VoteObject } from './types'

const router = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` })

export const getAllPosts = async (dispatch: Dispatch) => {
    try {
        const response = await router.get(`/posts`)
        dispatch(getPosts(response.data.data))
        dispatch(getFilteredPosts(response.data.data))
    } catch (error) {
        console.log(error)
    }
}

export const newPostSubmit = async (dispatch: Dispatch, card: NewPost) => {
    try {
        await router.post('/posts', card)
        const response = await router.get('/posts')
        dispatch(getPosts(response.data.data));
        dispatch(getFilteredPosts(response.data.data))
    } catch (error) {
        console.log(error)
    }
}

export const Vote = async (dispatch: Dispatch, VoteObj: VoteObject, Post: Post) => {
    try {
        await router.post(`/posts/${Post?.id}/votes`, VoteObj)
        const response = await router.get('/posts')
        dispatch(getPosts(response.data.data));
        dispatch(getFilteredPosts(response.data.data))
    } catch (e) {
        console.log(e);
    };
};

export const postComment = async (dispatch: Dispatch, postObj: CommentObject, Post: Post) => {
    try {
        await router.post(`/posts/${Post?.id}/comments`, postObj);
        const response = await router.get('/posts')
        dispatch(getPosts(response.data.data))
        dispatch(getFilteredPosts(response.data.data))
    } catch (e) {
        console.log(e);
    };
}

export const getAllTags = async (dispatch: Dispatch) => {
    try {
        const response = await router.get('/tags')
        dispatch(getTags(response.data.data))
    } catch (error) {
        console.log(error)
    }
}