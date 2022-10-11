import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types';

const initialState: {
    comments: Comment[],
    currentComments: Comment[]
} = {
    comments: [],
    currentComments: [],
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        getComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload
        },
        getFilteredComments: (state, action: PayloadAction<Comment[]>) => {
            state.currentComments = action.payload
        }
    }
})

export const { getComments, getFilteredComments } = commentSlice.actions
export default commentSlice.reducer
