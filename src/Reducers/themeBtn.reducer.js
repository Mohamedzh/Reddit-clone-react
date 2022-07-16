
const themeReducer = (state = "bi bi-brightness-high-fill", action) => {
    switch (action.type) {
      case "ICON_CHANGE":
        return action.payload;
      default:
        return state;
    }
  }
  
  export default themeReducer