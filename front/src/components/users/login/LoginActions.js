import axios from "axios";
import { push } from "connected-react-router";
import { SET_TOKEN,
            SET_CURRENT_USER,
            UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken } from "../../../utils/Utils";

export const loginUser = (userData, redirectTo) => dispatch => {
    axios.post("/auth/login/", userData)
        .then(response => {
            const auth_token  = response.data.key;
            setAxiosAuthToken(auth_token);
            dispatch(setToken(auth_token));
            dispatch(getCurrentUser(redirectTo));
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            console.log('error', error);
        });
};

export const getCurrentUser =  redirectTo => async dispatch => {
    try {
        const response = await axios.get("/auth/user/");

        const user = {
            email: response.data.email
        };

        dispatch(setCurrentUser(user, redirectTo));
    } catch (error) {
        dispatch(unsetCurrentUser());
    }
}

export const setCurrentUser = (user, redirectTo) => dispatch => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });
    
      console.log("set user: " + redirectTo);
      if (redirectTo !== "") {
        dispatch(push(redirectTo));
      }
}

export const setToken = token => dispatch => {
    setAxiosAuthToken(token);
    localStorage.setItem("token", token);
    dispatch({
        type: SET_TOKEN,
        payload: token
    });
};

export const unsetCurrentUser = () => dispatch => {
    setAxiosAuthToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
        type: UNSET_CURRENT_USER
    });
};

export const logout = () => async dispatch => {
    try {
        const response = await axios.post("/auth/logout/");
        dispatch(unsetCurrentUser());
        // dispatch(push("/"));
        console.log('Logout successful.');
    } catch (error) {
        dispatch(unsetCurrentUser());
        console.log('error', error);
    }
};