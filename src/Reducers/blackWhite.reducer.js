
const bwReducer = (state = "white", action) => {
    switch (action.type) {
      case "BLACK_WHITE":
        return action.payload;
      default:
        return state;
    }
  }
  
  export default bwReducer