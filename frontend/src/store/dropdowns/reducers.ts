import { SET_OPENED_ID } from "./actionTypes";

const initialState = {
    openedId: undefined,
};

const dropdownsReducer = (
    state: {} = initialState,
    action: {
        type: string,
        payload: string,
    },
) => {
    switch (action.type) {
        case SET_OPENED_ID: {
            return {
                ...state,
                openedId: action.payload,
            };
        }
        default:
            return state;
    }
};
export default dropdownsReducer;
