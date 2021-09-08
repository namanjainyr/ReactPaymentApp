/* eslint-disable  */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import TransectHistory from '../components/dashboard/TransectHistory';
import axiosInstance from '../apiCall/service';
import { connect } from "react-redux";
import {
  getTransectionHistory,
} from '../store/Actions/dashboardAction';
const Wallet = (props) => {

  React.useEffect(() => {
    props.getHistory((callback) => { });
  }, []);

  return (
    <>
      <Helmet>
        <title>Wallet |  My Wallet</title>
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
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <TransectHistory data={props.transecHistory} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    transecHistory: state.dashBoardReducer.transectionList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (callback) => {
      dispatch(getTransectionHistory(callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
