/* eslint-disable  */

import { SET_SEND_RECEIVED, SET_DASHBOARD_TRANSECTION, SET_CURRENT_BALANCE, SAVE_CARD_LIST } from '../ActionsType';

const initialState = {
    send: 0,
    received: 0,
    transectionList: [],
    currentBalance: 0,
    cardList: []
}

const dashBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DASHBOARD_TRANSECTION:
            return { ...state, transectionList: action.payload }
        case SET_SEND_RECEIVED:
            return { ...state, ...action.payload };
        case SET_CURRENT_BALANCE:
            return { ...state, currentBalance: action.payload };
        case SAVE_CARD_LIST:
            return { ...state, cardList: action.payload };
        default:
            return state;
    }
}
export default dashBoardReducer;

//////////////////////////////////////////////////////////////////////////////
