import { createAction } from "../../utils/reducers/reducer.utils";

import { USER_ACTION_TYPES } from "./userTypes";

export const setCurrentUser = (user) => {
  createAction(USER_ACTION_TYPES.SER_CURRENT_USER, user);
};
