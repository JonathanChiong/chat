import { ADD_USER, FETCH_USER } from "./type";

export const addUser = (name, room) => ({
  type: ADD_USER,
  payload: { name, room },
});
