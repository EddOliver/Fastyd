import { combineReducers } from "redux"
import {my_page} from "./syncReducers/myReducer"
import {my_cart} from "./syncReducers/cartReducer"
import search from "./asyncReducers/searchReducer";

const rootReducers = combineReducers({
    my_page,
    my_cart,
    search
})

export default rootReducers;