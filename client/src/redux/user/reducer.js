import { ADD_USER } from "./type";

const initialState = {
  user: {
    name: "",
    room: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      const { name, room } = action.payload;

      return {
        user: {
          name,
          room,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
