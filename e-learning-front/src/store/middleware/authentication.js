import { isEmpty, setAxiosAuthToken } from "../../utils/Utils";
import { setCurrentUser, unsetCurrentUser } from "../user/auth";
import { setItemstoFavoris } from "../user/favoris";

 /**
  * Authentication middleware, get token and user information from local storage
  * and send it to reducer
  */

const authentication = store => next => action => {

    if (action.type === "@@router/LOCATION_CHANGE"){ 
        if (!isEmpty(localStorage.getItem("token"))) {
            setAxiosAuthToken(localStorage.getItem("token"));
        }
        if (!isEmpty(localStorage.getItem("user"))) {
            store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))));
        }
        if (!isEmpty(localStorage.getItem("favoris"))){
            store.dispatch(setItemstoFavoris(JSON.parse(localStorage.getItem('favoris'))));
        }
    }

    /**
     *  Clear local storage from all devices after a global logout
     */

     const clearLocalStorageAndReload = () => {
        store.dispatch(unsetCurrentUser());
        alert("vous avez ete deconnecté");
        window.location.reload();
    }
   
    if (store.getState()?.entities?.subjects?.errors?.detail){
        if (!isEmpty(localStorage.getItem("token"))) {
            clearLocalStorageAndReload();
        } 
        
    } else if (store.getState()?.entities?.courses?.errors?.detail){
        if (!isEmpty(localStorage.getItem("token"))){
            clearLocalStorageAndReload();
        } 
    }

    return next(action);

}

export default authentication;



    



