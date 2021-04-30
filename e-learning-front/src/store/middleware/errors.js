import { unsetCurrentUser } from "../../reducers/user/UserActions"

export const catchTokenError = store => next => action => {
    let counter = 0;


        if (store.getState()?.entities?.subjects?.errors?.detail){
            console.log('errors subjects', store.getState().entities.subjects.errors?.detail)
             
            store.dispatch(unsetCurrentUser());
            
        } else if (store.getState()?.entities?.courses?.errors?.detail){
            console.log('errors courses', store.getState().entities.courses.errors?.detail) 
            store.dispatch(unsetCurrentUser());
        }

    


    
    
    // return next(action)
}

const haveBeenDisconnectedModal = () => {

}