
const lightReducer = (state = "dark", action) => {
  switch (action.type) {
    case "LIGHT_THEME":
      return action.payload;
    default:
      return state;
  }
}

export default lightReducer