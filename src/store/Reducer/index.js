/* eslint-disable  */

import { combineReducers } from "redux";
import dashBoardReducer from "./dashBoard";
// import Wallet from './wallet';
const reducer = combineReducers({
  dashBoardReducer: dashBoardReducer,
  // WalletReducer: Wallet,
});

export default reducer;
