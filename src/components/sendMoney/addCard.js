/* eslint-disable  */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { getSavedCard } from '../../store/Actions/dashboardAction';
import { Formik } from 'formik';
import './style.css';
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

const AddCard = (props) => {
    const classes = useStyles();
    const [transectionState, setTransection] = React.useState(false);

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
                                    name: '',
                                    cardnumber: '',
                                    exMonth: '',
                                    exYear: ''
                                }}
                                // validationSchema={Yup.object().shape({
                                //     name: Yup.string().required('Please Enter Card Holder Name').max(25),
                                //     cardnumber: Yup.string().required('Please Enter Card Number').max(16),
                                //     exMonth: Yup.string().required('Please Enter Expiry Month').max(2),
                                //     exYear: Yup.string().required('Please Enter Expiry Year').max(2),
                                // })}
                                onSubmit={(values) => {
                                    setTransection(false)
                                    const payload = {
                                        "UserID": localStorage.getItem('PaymentAppUserID'),
                                        "NameOnCard": values.name,
                                        "ValidThru": `${values.exMonth}/${values.exYear}`,
                                        "CardNumber": values.cardnumber,
                                    }
                                    axiosInstance.post('/AddCardDetails', payload)
                                        .then(res => {
                                            props.getSavedCard()
                                            setTransection("success");
                                        })
                                        .catch(err => {
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
                                                Add Card
                                            </Typography>
                                            <IconButton aria-label="close" size="small" onClick={() => {
                                                props.setOpen(false);
                                                setTransection(false);
                                            }}>
                                                <XCircle fontSize="inherit" />
                                            </IconButton>
                                        </Box>
                                        <div class="form-container">
                                            <div class="field-container">
                                                <label for="name">Name</label>
                                                <input id="name" maxlength="20" type="text" required={true}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="DEEPAK KASHYAP"
                                                    value={values.name} />
                                            </div>
                                            <div class="field-container">
                                                <label for="cardnumber">Card Number</label>
                                                <input id="cardnumber"
                                                    name="cardnumber"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.cardnumber}
                                                    placeholder="1234 1234 1234 1234"

                                                    required={true} type="text" pattern="[0-9]*" inputmode="numeric" minLength={16} maxLength={16}
                                                    onChange={e => {
                                                        e.preventDefault();
                                                        const { value } = e.target;
                                                        let regex = new RegExp(/^\d*$/);
                                                        if (regex.test(value)) {
                                                            setFieldValue("cardnumber", value);
                                                        }
                                                    }} />
                                            </div>
                                            <div className="field-container">
                                                <label for="expirationdate">Expiration (mm/yy)</label><br />
                                                <input id="exMonth"
                                                    name="exMonth"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="12"
                                                    max={12}
                                                    value={values.exMonth}
                                                    onChange={e => {
                                                        e.preventDefault();
                                                        const { value } = e.target;
                                                        let regex = new RegExp(/^\d*$/);
                                                        if (regex.test(value)) {
                                                            setFieldValue("exMonth", value);
                                                        }
                                                    }}
                                                    required={true} style={{ width: '50%' }} type="text" pattern="[0-9]*" maxlength="2" minLength="2" size="2" inputmode="numeric" placeholder='MM' />
                                                <input id="exYear"
                                                    name="exYear"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.exYear}
                                                    max={2025}
                                                    onChange={e => {
                                                        e.preventDefault();
                                                        const { value } = e.target;
                                                        let regex = new RegExp(/^\d*$/);
                                                        if (regex.test(value)) {
                                                            setFieldValue("exYear", value);
                                                        }
                                                    }}
                                                    required={true} style={{ width: '50%' }} type="text" pattern="[0-9]*" maxlength="2" minLength="2" size="2" inputmode="numeric" placeholder='YY' />
                                            </div>
                                        </div>

                                        <Box sx={{ py: 2 }}>
                                            <Button
                                                color="primary"
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Add
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
                                                        Card Added
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
                                                            Failed
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

// export default AddCard;
const mapDispatchToProps = (dispatch) => {
    return {
        getSavedCard: () => {
            dispatch(getSavedCard());
        },
    };
};

export default connect(null, mapDispatchToProps)(AddCard)