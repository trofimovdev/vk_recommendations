import { SET_OPENED_ID } from "./actionTypes";

export const setOpenedId = (id: string) => ({
    type: SET_OPENED_ID,
    payload: id,
});
