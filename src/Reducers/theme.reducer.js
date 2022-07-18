
const changeThemeReducer = (state = {
    background: "light",
    textColor: "dark",
    bg: "white",
    variant: "primary",
    themeBtn: "bi bi-moon-stars-fill",
    logo: "black",
}, action) => {
    switch (action.type) {
        case "DARK_THEME":
            return {
                background: "dark",
                textColor: "light",
                bg: "black",
                variant: "warning",
                themeBtn: "bi bi-brightness-high-fill",
                logo: "#D7DADC",

            };
        case "LIGHT_THEME":
            return {
                background: "light",
                textColor: "dark",
                bg: "white",
                variant: "primary",
                themeBtn: "bi bi-moon-stars-fill",
                logo: "black",

            };
        default:
            return state;
    }
}

export default changeThemeReducer