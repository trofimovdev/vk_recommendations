import { SET_LIST, SET_SORT_TYPE } from "./actionTypes";

const initialState = {
    list: {},
    sortType: 0,
};

const groupsReducer = (
    state: {} = initialState,
    action: {
        type: string,
        payload: any,
    },
) => {
    switch (action.type) {
        case SET_LIST: {
            return {
                ...state,
                list: action.payload,
            };
        }
        case SET_SORT_TYPE: {
            return {
                ...state,
                sortType: action.payload,
            };
        }
        default:
            return state;
    }
};

export default groupsReducer;
