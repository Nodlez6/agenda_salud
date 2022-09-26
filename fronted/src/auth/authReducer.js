import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      localStorage.setItem("user", JSON.stringify(action.payload));
      const admin = action.payload.especialidad;
      return {
        ...action.payload,
        admin: admin,
        logged: true,
      };

    case types.logout:
      return {
        logged: false,
      };

    default:
      return state;
  }
};
