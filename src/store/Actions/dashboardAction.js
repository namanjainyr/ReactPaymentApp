/* eslint-disable  */

import axiosInstance from '../../apiCall/service';
import { SET_SEND_RECEIVED, SET_DASHBOARD_TRANSECTION, SET_CURRENT_BALANCE, SAVE_CARD_LIST } from '../ActionsType';

export const getTransectionHistory = (callback) => {
    const userId = localStorage.getItem("PaymentAppUserID")
    return async dispatch => {
        try {
            const res = await axiosInstance.post(`/TransactionHistory?UserID=${userId}`);
            dispatch({
                type: SET_DASHBOARD_TRANSECTION,
                payload: res.data,
            });
            dispatch({
                type: SET_SEND_RECEIVED,
                payload: calculateSentRec(res.data, userId),
            });
            callback(true)
        } catch (err) {
            console.log(err, "err")
            return callback(false);
        }
    }
};

export const getCurrentBalance = (callback) => {
    const userId = localStorage.getItem("PaymentAppUserID")
    return async dispatch => {
        try {
            const res = await axiosInstance.get(`/Balance?UserID=${userId}`);
            dispatch({
                type: SET_CURRENT_BALANCE,
                payload: res.data,
            });
            callback(true)
        } catch (err) {
            callback(false)
            return console.log(err, 'err');
        }
    }
};

const calculateSentRec = (data, userId) => {
    let send = 0;
    let received = 0;
    data.map(item => userId === item.receiverUserID ? send += item.amount : received += item.amount)
    return { send, received }
}

export const getSavedCard = () => {
    return async dispatch => {
        try {
            const res = await axiosInstance.post(`/GetUserCardDetails?UserId=${localStorage.getItem("PaymentAppUserID")}`)
            dispatch({
                type: SAVE_CARD_LIST,
                payload: res.data,
            });
        } catch (err) {
            return console.log(err, 'err');
        }
    }
}

// export const getBlogCategoryList = () => {
//     return dispatch => {
//         return axiosInstance.get(apiUrl.listBlog.blogCategoryName)
//             .then(response => {
//                 dispatch(setCategoryList(response.data.data));
//             })
//             .catch(err => {
//                 dispatch(setCategoryList([]));
//             })
//     }
// }

// export const setCategoryList = (data) => {
//     return {
//         type: SET_BLOG_CATEGORY_LIST,
//         payload: data,
//     }
// }
