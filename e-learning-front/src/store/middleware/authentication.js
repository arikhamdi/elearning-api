import React, { useState } from "react";

import { unsetCurrentUser } from "../../reducers/user/UserActions";
import { isEmpty, setAxiosAuthToken } from "../../utils/Utils";
import { haveBeenDisconnectedModal, setCurrentUser } from "../user/auth";
import { setItemtoFavoris } from "../user/favoris";

 /**
  * Authentication middleware, get token and user information from local storage
  * and send it to reducer
  */

const authentication = store => next => action => {

    const clearLocalStorageAndReload = () => {
        store.dispatch(unsetCurrentUser());
        alert("vous avez ete deconnecté");
        window.location.reload();
    }

    
    if (action.type === "@@router/LOCATION_CHANGE"){ 
        if (!isEmpty(localStorage.getItem("token"))) {
            setAxiosAuthToken(localStorage.getItem("token"));
        }
        if (!isEmpty(localStorage.getItem("user"))) {
            store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))));
        }
        if (!isEmpty(localStorage.getItem("favoris"))){
            store.dispatch(setItemtoFavoris(JSON.parse(localStorage.getItem('favoris'))));
        }
    }

    if (store.getState()?.entities?.subjects?.errors?.detail){
        console.log('errors subjects', store.getState().entities.subjects.errors?.detail)
        if (!isEmpty(localStorage.getItem("token"))) {
            clearLocalStorageAndReload();
        } 
        
    } else if (store.getState()?.entities?.courses?.errors?.detail){
        console.log('errors courses', store.getState().entities.courses.errors?.detail) 
        if (!isEmpty(localStorage.getItem("token"))){
            clearLocalStorageAndReload();
        } 
    }

    

    return next(action);

}

export default authentication;



    



