import { SET_LIST, SET_SORT_TYPE } from "./actionTypes";

export const setList = (data: any) => ({
    type: SET_LIST,
    payload: data,
});

export const setSortType = (sortType: any) => ({
    type: SET_SORT_TYPE,
    payload: sortType,
});
