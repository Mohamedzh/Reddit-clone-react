
const variantReducer = (state = "primary", action) => {
    switch (action.type) {
      case "VARIANT":
        return action.payload;
      default:
        return state;
    }
  }
  
  export default variantReducer