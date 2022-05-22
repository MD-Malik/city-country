import { FETCH_DATA } from "./action";

const initState = {
    data : []
}

export const dataReducer = (state = initState, addData) => {
    switch (addData.type) {
        case FETCH_DATA:
            return ({
               ...state,
               data : addData.payload  
            });
        default:
            return state;
    }
}