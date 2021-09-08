/* eslint-disable  */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from "react-redux";
import {
  getTransectionHistory, getCurrentBalance
} from '../../store/Actions/dashboardAction';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axiosInstance from '../../apiCall/service';
import IconButton from '@material-ui/core/IconButton';
import { XCircle } from 'react-feather';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SendMoneyPopup = (props) => {
  const classes = useStyles();
  const [currentBalance, setBalance] = React.useState("");
  const [transectionState, setTransection] = React.useState("false");
  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <Container maxWidth="sm">
              <Formik
                initialValues={{
                  ReceiverUserID: 'sravan.kumar@gmail.com',
                  Amount: '5'
                }}
                validationSchema={Yup.object().shape({
                  ReceiverUserID: Yup.string().email('Must be a valid sender email').max(255).required('Email is required'),
                  Amount: Yup.string().max(10).required('Please Enter Amount')
                })}
                onSubmit={(values) => {
                  setTransection(false)
                  const payload = {
                    ReceiverUserID: values.ReceiverUserID,
                    Amount: values.Amount,
                    SenderUserID: localStorage.getItem('PaymentAppUserID')
                  }
                  axiosInstance.post('/Transaction', payload)
                    .then(res => {
                      props.getCurrentBalance(callback => { });
                      props.getHistory(getHistory => { });
                      setBalance(res.data.senderBalance);
                      setTransection("success");
                    })
                    .catch(err => {
                      console.log(err, "errerrerrerrerr")
                      setTransection("failed")
                    })
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                  setFieldValue
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{ mb: 3 }}
                      container
                      display="flex"
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        color="textPrimary"
                        variant="h2"
                      >
                        Send Money
                      </Typography>
                      <IconButton aria-label="close" size="small"
                        onClick={() => {
                          props.setOpen(false);
                          setTransection(false);
                        }}>
                        <XCircle fontSize="inherit" />
                      </IconButton>
                    </Box>
                    <TextField
                      error={Boolean(touched.ReceiverUserID && errors.ReceiverUserID)}
                      fullWidth
                      helperText={touched.ReceiverUserID && errors.ReceiverUserID}
                      label="User ID"
                      margin="normal"
                      name="ReceiverUserID"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.ReceiverUserID}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.Amount && errors.Amount)}
                      fullWidth
                      helperText={touched.Amount && errors.Amount}
                      label="Amount"
                      margin="normal"
                      name="Amount"
                      onBlur={handleBlur}
                      onChange={e => {
                        e.preventDefault();
                        const { value } = e.target;
                        let regex = new RegExp(/^\d*\.?\d*$/);
                        if (regex.test(value)) {
                          setFieldValue("Amount", value);
                        }
                      }}
                      type="text"
                      value={values.Amount}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Send
                      </Button>
                    </Box>
                    {
                      transectionState === "success" ?
                        <Box
                          sx={{ mb: 3 }}
                          container
                          display="flex"
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            color="success.main"
                            variant="h6"
                          >
                            Transaction Successful
                          </Typography>
                          <Typography
                            color="success.main"
                            variant="h6"
                          >
                            Current Balance : ${currentBalance}
                          </Typography>
                        </Box>
                        : transectionState === "failed" ?
                          <Box
                            sx={{ mb: 3 }}
                            container
                            display="flex"
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              color="error.main"
                              variant="h5"
                            >
                              Transaction Failed
                            </Typography>
                          </Box>
                          : null
                    }

                  </form>
                )}
              </Formik>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div >
  );
}

// export default SendMoneyPopup;


const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (callback) => {
      dispatch(getTransectionHistory(callback));
    },
    getCurrentBalance: (callback) => {
      dispatch(getCurrentBalance(callback));
    },
  };
};

export default connect(null, mapDispatchToProps)(SendMoneyPopup)