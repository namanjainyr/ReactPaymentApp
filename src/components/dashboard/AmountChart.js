/* eslint-disable  */

import { Doughnut } from 'react-chartjs-2';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    colors,
    useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const AmountChart = (props) => {
    const theme = useTheme();
    const renderData = (send, rec, curr) => {
        const data = {
            datasets: [
                {
                    data: [curr, send, rec],
                    backgroundColor: [
                        colors.indigo[500],
                        colors.red[600],
                        colors.orange[600]
                    ],
                    borderWidth: 8,
                    borderColor: colors.common.white,
                    hoverBorderColor: colors.common.white
                }
            ],
            labels: ['Current', 'Sent', 'Received']
        };
        return data
    }

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const devices = [
        {
            title: 'Desktop',
            value: 63,
            icon: LaptopMacIcon,
            color: colors.indigo[500]
        },
        {
            title: 'Tablet',
            value: 15,
            icon: TabletIcon,
            color: colors.red[600]
        },
        {
            title: 'Mobile',
            value: 23,
            icon: PhoneIcon,
            color: colors.orange[600]
        }
    ];

    return (
        <Card>
            <CardHeader title="Monthly Summary Report" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={renderData(props.sent, props.received, props.current)}
                        options={options}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >

                    {/* <Box
                        key={0}
                        sx={{
                            p: 1,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textPrimary"
                            variant="body1"
                        >
                            {'Sent'}
                        </Typography>
                        <Typography
                            style={colors.orange[600]}
                            variant="h2"
                        >
                            {props.sent}
                            $
                        </Typography>
                    </Box>
                    <Box
                        key={0}
                        sx={{
                            p: 1,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textPrimary"
                            variant="body1"
                        >
                            {'Received'}
                        </Typography>
                        <Typography
                            style={colors.red[600]}
                            variant="h2"
                        >
                            {props.received}
                            $
                        </Typography>
                    </Box>
                    <Box
                        key={0}
                        sx={{
                            p: 1,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textPrimary"
                            variant="body1"
                        >
                            {'Current'}
                        </Typography>
                        <Typography
                            style={colors.indigo[500]}
                            variant="h2"
                        >
                            {props.current}
                            $
                        </Typography>
                    </Box> */}
                    {/* {devices.map(({
                        color,
                        icon: Icon,
                        title,
                        value
                    }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Icon color="action" />
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h2"
                            >
                                {value}
                                %
                            </Typography>
                        </Box>
                    ))} */}
                </Box>
            </CardContent>
        </Card>
    );
};

export default AmountChart;
