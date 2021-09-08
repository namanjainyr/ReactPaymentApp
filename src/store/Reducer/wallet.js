/* eslint-disable  */

import { SET_DASHBOARD_TRANSECTION } from '../ActionsType';
const initialState = {
    transectionList: [],
}
const dashBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DASHBOARD_TRANSECTION:
            return { ...state, transectionList: action.payload }
        default:
            return state;
    }
}
export default dashBoardReducer;

//////////////////////////////////////////////////////////////////////////////
