import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../../types';

const initialState: {
  tags: Tag[],
  currentTags: Tag[]
} = { tags: [], currentTags: [] }

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    getTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload
    },
    addToTags: (state, action: PayloadAction<Tag>) => {
      state.currentTags.push(action.payload)
      state.tags = state.tags.filter(tag => tag.id !== action.payload.id)
    },
    clearTags: (state) => {
      state.currentTags = []
    }
  }
})

export const { getTags, addToTags, clearTags } = tagSlice.actions
export default tagSlice.reducer
