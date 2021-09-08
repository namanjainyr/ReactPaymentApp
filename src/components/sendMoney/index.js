/* eslint-disable  */
import React from 'react';
import { Grid, Button, Box } from '@material-ui/core';
import SendMoneyPopup from './sendMoneyPopup';;
import AddCard from './addCard';

const SendMoney = (props) => {
    const [open, setOpen] = React.useState(false);
    const [openAddCard, setOpenAddcard] = React.useState(false);

    return (
        <Grid
            mt={3}
            xs={12}
            pr={3}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
        >
            <Box mr={2}>
                <Button variant="outlined" onClick={() => setOpenAddcard(!openAddCard)} >
                    Add Card
                </Button>
            </Box>
            <Button variant="outlined" onClick={() => setOpen(!open)}>
                Send Money
            </Button>
            <SendMoneyPopup open={open} setOpen={setOpen} />
            <AddCard open={openAddCard} setOpen={setOpenAddcard} />
        </Grid>
    );
};
export default SendMoney;
