
const elementReducer = (state = [], action) => {
    switch (action.type) {
      case "SEARCH":
        return action.payload;
      default:
        return state;
    }
  }
  
  export default elementReducer