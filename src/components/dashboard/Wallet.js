/* eslint-disable  */

import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const WalletBalance = (props) => (
    <Card {...props}>
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h3"
                    >
                        Wallet Amount
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h1"
                    >
                        ${props.balance}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: indigo[600],
                            height: 40,
                            width: 40
                        }}
                    >
                        <AttachMoneyIcon />
                    </Avatar>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default WalletBalance;
