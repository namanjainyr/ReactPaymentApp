/* eslint-disable  */
import React from 'react';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  CreditCard as CreditCardIcon,
  BarChart as BarChartIcon,
  // Lock as LockIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  MessageSquare as MessageIcon
  // UserPlus as UserPlusIcon,
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/home/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/home/wallet',
    icon: CreditCardIcon,
    title: 'Wallet'
  },
  {
    href: '/home/message',
    icon: MessageIcon,
    title: 'Messages'
  },
  {
    href: '/home/profile',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/home/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [userName] = React.useState(localStorage.getItem('PaymentAppUserName'))
  const getAvatar = () => {
    let word = ''
    let arr = userName.split(' ');
    for (let i = 0; i < arr.length; i++) {
      word += arr[i][0]
    }
    return word.split('').join(' ')
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          // component={RouterLink}
          // src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
        // to="/home/profile"
        >
          {getAvatar()}
        </Avatar>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {userName}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      {/* //MOBILE VIEW  lgUp */}
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      {/* xlDown */}
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
