import { isEmpty, setAxiosAuthToken } from "../../utils/Utils";
import { getCurrentUser, setCurrentUser } from "../user/auth";

 /**
  * Authentication middleware, get token and user information from local storage
  * and send it to reducer
  */
export const authentication = store => next => action => {
    if (action.type === "@@router/LOCATION_CHANGE"){
        if (!isEmpty(localStorage.getItem("token"))) {
            setAxiosAuthToken(localStorage.getItem("token"));

            if (!isEmpty(localStorage.getItem("user"))) {
                store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))));
            }else {
                store.dispatch(getCurrentUser());
            }
        }
    }
    return next(action);

}