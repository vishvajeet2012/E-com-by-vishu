import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-slice"
const store = configureStore({
    reducer:{
            auth: authReducer
    }
})

export default store