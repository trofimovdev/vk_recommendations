import { combineReducers } from "redux";
import groupsReducer from "./groups/reducers";
import dropdownsReducer from "./dropdowns/reducers";

export default combineReducers({
    groups: groupsReducer,
    dropdows: dropdownsReducer,
});
