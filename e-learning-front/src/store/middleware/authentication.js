import { isEmpty, setAxiosAuthToken } from "../../utils/Utils";
import { getCurrentUser, setCurrentUser } from "../user/auth";
import { setItemtoFavoris } from "../user/favoris";

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
        if (!isEmpty(localStorage.getItem("favoris"))){
            store.dispatch(setItemtoFavoris(JSON.parse(localStorage.getItem('favoris'))));
        }
    }
    return next(action);

}