import { isEmpty, setAxiosAuthToken } from "../../utils/Utils";
import { getCurrentUser, setCurrentUser, unsetCurrentUser } from "../user/auth";
import { setItemstoFavoris } from "../user/favoris";

 /**
  * Authentication middleware, get token and user information from local storage
  * and send it to reducer
  */

const authentication = store => next => action => {

    if (action.type === "@@router/LOCATION_CHANGE"){ 
        if (!isEmpty(localStorage.getItem("token"))) {
            setAxiosAuthToken(localStorage.getItem("token"));

            if (store.getState().router.location.pathname === '/dashboard' ||
                store.getState().router.location.pathname === '/profile') {
                store.dispatch(getCurrentUser());
            }
        }
        if (!isEmpty(localStorage.getItem("user"))) {
            /**
             * Get the subscription end date from the local storage and
             *  convert it to javascript format (seconds => milliseconds).
             * Compares the converted date with the current date
             */
            // const subscription = JSON.parse(localStorage.getItem("user")).subscribed;
            // const jsFormatendOfSubscription = subscription  * 1000;
            // if(jsFormatendOfSubscription  < Date.now()){
            //     store.dispatch(getCurrentUser());
            // }
            store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))));
        }
        if (!isEmpty(localStorage.getItem("favoris"))){
            store.dispatch(setItemstoFavoris(JSON.parse(localStorage.getItem('favoris'))));
        }
    }

    /**
     *  Clear local storage from all devices after a global logout
     */


    if (store.getState()?.entities?.courses?.error?.detail === "Token non valide."){
        localStorage.clear()
        window.location.reload()
    } 
    else if (store.getState()?.entities?.subjects?.error?.detail  === "Token non valide."){
        localStorage.clear()
        window.location.reload()
        
    } 

    return next(action);

}

export default authentication;



    



