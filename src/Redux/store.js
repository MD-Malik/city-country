import { dataReducer } from "./reducer";
import  { combineReducers, createStore } from 'redux';
import { loadingReducer } from "./loading/loadingReducer";

const rootReducer = combineReducers({
    dataReducer,
    loadingReducer
})
const store = createStore(rootReducer);

export default store