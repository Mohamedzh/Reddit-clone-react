import { configureStore } from '@reduxjs/toolkit';
import postReducer from './Slices/postSlice';
import themeReducer from './Slices/themeSlice';
import tagSlice from './Slices/tagSlice'
import commentSlice from './Slices/commentSlice'


export const store = configureStore({
    reducer: {
        post: postReducer,
        theme: themeReducer,
        tag: tagSlice,
        comment: commentSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;