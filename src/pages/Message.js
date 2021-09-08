/* eslint-disable  */

import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import { ChatEngine } from 'react-chat-engine';

const Message = () => (
  <>
    <Helmet>
      <title>Message | My Wallet</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        {/* <Grid container spacing={3}> */}
          <ChatEngine
            height='100vh'
            userName='naman'
            userSecret='7f19baf1-321c-4862-bf3d-5d4fd061fe05'
            projectID='cfe89503-e31f-435f-bbd3-b4442dc4d38a'
          />
        {/* </Grid> */}
      </Container>
    </Box>
  </>
);

export default Message;
