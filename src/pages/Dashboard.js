/* eslint-disable  */

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import {
  getTransectionHistory,
  getCurrentBalance, getSavedCard

} from '../store/Actions/dashboardAction';
import {
  Box, Container, Grid
} from '@material-ui/core';
import Sales from '../components/dashboard/Sales';
import AmountChart from '../components/dashboard/AmountChart';
import CreditCardDesign from '../components/creditCard/CreditCardDesign';
import WalletBalance from '../components/dashboard/Wallet';
import axiosInstance from '../apiCall/service';
import LatestOrders from '../components/dashboard/LatestOrders';
import TransectionChart from '../components/dashboard/TransectionChart'


const Dashboard = (props) => {
  React.useEffect(() => {
    props.getHistory((callback) => { });
    props.getCurrentBalance((callback) => { });
    props.getCard();
  }, []);

  // console.log(props.transecHistory.map(groupday), "cardList")

  // function groupday(value, index, array) {
  //   let byday = {};
  //   let d = new Date(value['timestamp']);
  //   console.log( d, "--",d.getTime())
  //   d = Math.floor(d.getTime() / (1000 * 60 * 60 * 24*60));
  //   console.log( d, "===")

  //   byday[d] = byday[d] || [];
  //   byday[d].push(value);
  //   return byday
  // }


  return (
    <>
      <Helmet>
        <title>Dashboard |  My Wallet</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              mt={3}
              xs={12}
              container
              display="flex"
              direction="row"
              justifyContent="space-between"
            // alignItems="flex-start"
            >
              <Grid
                item
                display="flex"
                direction="row"
                alignItems="flex-start"
              >
                {
                  props.cardList.length > 0 &&
                  props.cardList.slice(0, 2).map(item => {
                    return <CreditCardDesign
                      name={item.nameOnCard}
                      // from="10/19" 
                      to={`${item.validThru.split("-")[1]}/${item.validThru.split("-")[0]}`}
                      cardNo={item.cardNumber}
                    />
                  })
                }
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <WalletBalance sx={{ height: '100%' }} balance={props.currentBalance} />
              </Grid>
            </Grid>

            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Sales />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <AmountChart sx={{ height: '100%' }} sent={props.send} received={props.received} current={props.currentBalance} />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    send: state.dashBoardReducer.send,
    received: state.dashBoardReducer.received,
    currentBalance: state.dashBoardReducer.currentBalance,
    cardList: state.dashBoardReducer.cardList,
    transecHistory: state.dashBoardReducer.transectionList,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (callback) => {
      dispatch(getTransectionHistory(callback));
    },
    getCurrentBalance: (callback) => {
      dispatch(getCurrentBalance(callback));
    },
    getCard: () => dispatch(getSavedCard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)