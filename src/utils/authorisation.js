/* eslint-disable  */

const authorization = () => {
    const PaymentAppUserID = localStorage.getItem("PaymentAppUserID");
    if (PaymentAppUserID) {
        return true
    }
    else {
        return false
    }
}
export default authorization;