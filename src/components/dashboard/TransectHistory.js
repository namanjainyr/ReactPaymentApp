/* eslint-disable  */
import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@material-ui/core';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const TransectHistory = (props) => {
    const [userId] = React.useState(localStorage.getItem('PaymentAppUserID'))
    return (
        <Card>
            <CardHeader title="Transection History" />
            <Divider />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection="desc">
                                    Date
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Type
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Amount
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.map((order) => {
                                return (
                                    <TableRow
                                        hover
                                        key={order}
                                    >
                                        <TableCell>
                                            {moment(order.timestamp).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {userId === order.receiverUserID ? order.senderName : order.receiverName}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                icon={userId === order.receiverUserID ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                                label={userId === order.receiverUserID ? 'Received' : 'Sent'}
                                                color={userId === order.receiverUserID ? "primary" : "secondary"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                color="primary"
                                                label={"Success"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {order.amount}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            {/* <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </Box> */}

        </Card>
    );
};

export default TransectHistory;
