import axios from 'axios';
// import { isEmpty } from "../../../utils/Utils";

import {
    CREATE_USER_ERROR,
    CREATE_USER_SUBMITTED,
    CREATE_USER_SUCCESS
  } from "./SignupTypes";

  export const signupNewUser = userData => dispatch => {
      dispatch({ type: CREATE_USER_SUBMITTED });

      axios.post("/auth/registration/", userData)
            .then(response => {
                console.log("Account for " +
                userData.email +
                " created successfully. Please login."
                );
                dispatch({ type: CREATE_USER_SUCCESS});
            })
            .catch(error => {
                if (error.response) {
                    console.log('error.response', JSON.stringify(error.response.data));
                    dispatch({
                        type : CREATE_USER_ERROR,
                        errorData: error.response.data
                    });
                } else if ('error.message', error.message) {
                    console.log(JSON.stringify(error.message));
                } else {
                    console.log('error', JSON.stringify(error));
                }
            });
  };