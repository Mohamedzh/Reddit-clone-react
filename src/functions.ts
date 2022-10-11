import axios from "axios"
import { Dispatch } from "redux"
import { getFilteredComments, getComments } from "./Redux/Slices/commentSlice"
import { getFilteredPosts } from "./Redux/Slices/postSlice"
import { clearTags, getTags } from "./Redux/Slices/tagSlice"
import { darkTheme, lightTheme } from "./Redux/Slices/themeSlice"
import { Post, Theme } from "./types"

export const scrollToComments = () => {
    window.scroll(800, 800)
}

export const switchTheme = (dispatch: Dispatch, themeObject: Theme) => {
    themeObject.background === "light" ? dispatch(darkTheme()) : dispatch(lightTheme());
    document.body.style.backgroundColor === "rgb(235, 235, 224)" ? document.body.style.backgroundColor = "black" : document.body.style.backgroundColor === "black" ? document.body.style.backgroundColor = "rgb(235, 235, 224)" : document.body.style.backgroundColor = "black";
}

export const restoreTags = async (dispatch: Dispatch) => {
    try {
        const router = axios.create({ baseURL: 'http://localhost:5000' })
        const response = await router.get('/tags')
        dispatch(getTags(response.data.data))
        dispatch(clearTags())
    } catch (error) {
        console.log(error)
    }
}

export const getAllComments = (dispatch: Dispatch, id: number, posts: Post[]) => {
    const post = posts.find(post => post.id === id)
    if (post) {
        dispatch(getComments(post.comments));
        dispatch(getFilteredComments(post.comments))
    }
}

export const search = (searchedPhrase: string, dispatch: Dispatch, posts: Post[]) => {
    let filteredPosts = posts.filter(post => (post.title.toLowerCase()).includes(searchedPhrase.toLowerCase()))
    dispatch(getFilteredPosts(filteredPosts))
    if (searchedPhrase === "") {
        dispatch(getFilteredPosts(posts))
    }
}

export const searchComments = (searchedPhrase: string, dispatch: Dispatch, posts: Post[], id: number) => {
    let currentPost = posts.find(post => post.id === id)
    if (currentPost) {
        let filteredComments = currentPost.comments.filter(comment => (comment.body.toLowerCase()).includes(searchedPhrase.toLowerCase()))
        dispatch(getFilteredComments(filteredComments))
    }
    if (searchedPhrase === "") {
        dispatch(getFilteredComments(currentPost!.comments))
    }
}