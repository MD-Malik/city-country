import { LOADING } from "./loadingAction";

const initState = {
    isLoading : false
}

export const loadingReducer = (state = initState, setLoading) => {
    switch (setLoading.type) {
        case LOADING:
            return ({
               ...state,
               isLoading : setLoading.payload  
            });
        default:
            return state;
    }
}