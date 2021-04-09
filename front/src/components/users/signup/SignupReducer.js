import {
    CREATE_USER_ERROR,
    CREATE_USER_SUBMITTED,
    CREATE_USER_SUCCESS
  } from "./SignupTypes";

  const initialState = {
      emailError: "",
      password1Error: "",
      password2Error: "",
      isSumitted: false
  };


export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_SUBMITTED:
            return {
                emailError: "",
                password1Error: "",
                password2Error: "",
                isSumitted: true
            };
        case CREATE_USER_ERROR:
            const errorState = {
                emailError: "",
                password1Error: "",
                password2Error: "",
                isSumitted: false
            };
            if (action.errorData.hasOwnProperty('email')) {
                errorState.emailError = action.errorData["email"];
            }
            if (action.errorData.hasOwnProperty("password1")){
                errorState.password1Error = action.errorData["password1"];
            }
            if (action.errorData.hasOwnProperty("password2")){
                errorState.password2Error = action.errorData["password2"];
            }
            return errorState;
        case CREATE_USER_SUCCESS:
            return {
                emailError: "",
                password1Error: "",
                password2Error: "",
                isSumitted: false
            };
        default:
            return state;
            
      }
  }