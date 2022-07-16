
const darkReducer = (state = "light", action) => {
    switch (action.type) {
      case "DARK_THEME":
        return action.payload;
      default:
        return state;
    }
  }
  
  export default darkReducer