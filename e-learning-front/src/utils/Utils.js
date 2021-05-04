import axios from 'axios';
import { API } from '../config';

export const setAxiosAuthToken = token => {
    if (typeof token !== "undefined" && token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
        delete axios.defaults.headers.common["Autorization"]
    }
};

export const isEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

    

export const showSuccess = (message) => {
    return (
        <div className="alert alert-success">
            {message}
        </div>
    )
}


/**
 *  Active menu item on hover
 * @param {*} e 
 */

export const setActiveHandler = e => {
    e.target.style.color = "red"
}

export const unSetActiveHandler = e => {
    e.target.style.color = ""
}