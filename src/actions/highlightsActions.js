// xxx josep maria

import {
    GET_HIGHLIGHT_1_CREATE_MATCH,
    SET_HIGHLIGHT_1_CREATE_MATCH,
    HIGHLIGHT_1_CREATE_MATCH_FLAG
} from '../utilities/Constants';

import { storeData, retrieveData } from '../utilities/persistance';


export const getHg1CreateMatch = () => async (dispatch) => {
    const flag = await retrieveData(HIGHLIGHT_1_CREATE_MATCH_FLAG);
    console.log("[getHg1CreateMatch] flag: " + flag);
    dispatch(getHg1CreateMatchSuccess(JSON.parse(flag)));
}

export const getHg1CreateMatchSuccess = (payload) => {
    return {
        type: GET_HIGHLIGHT_1_CREATE_MATCH,
        payload
    };
}

export const setHg1CreateMatch = (value) => async (dispatch) => {
	console.log("[setHg1CreateMatch] value: " + value);
	await storeData(HIGHLIGHT_1_CREATE_MATCH_FLAG, JSON.stringify(value));
    dispatch(setHg1CreateMatchSuccess(value));
}

export const setHg1CreateMatchSuccess = (payload) => {
    return {
        type: SET_HIGHLIGHT_1_CREATE_MATCH,
        payload
    };
}