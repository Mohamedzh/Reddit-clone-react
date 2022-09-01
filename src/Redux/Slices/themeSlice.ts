import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../../types';

const initialState: Theme = {
    background: "light",
    textColor: "dark",
    bg: "white",
    variant: "primary",
    themeBtn: "bi bi-moon-stars-fill",
    logo: "black",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        darkTheme: (state) => {
            return {
                background: "dark",
                textColor: "light",
                bg: "black",
                variant: "warning",
                themeBtn: "bi bi-brightness-high-fill",
                logo: "#D7DADC",
            }
        },
        lightTheme: (state) => {
            return  {
                background: "light",
                textColor: "dark",
                bg: "white",
                variant: "primary",
                themeBtn: "bi bi-moon-stars-fill",
                logo: "black",

            }
        }
    }
})

export const { darkTheme, lightTheme } = themeSlice.actions
export default themeSlice.reducer