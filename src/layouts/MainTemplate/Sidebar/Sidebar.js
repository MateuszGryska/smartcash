import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Divider } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarNav from './components/SidebarNav';
import Profile from './components/Profile';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const pages = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: <AccountBalanceIcon />,
  },
  {
    title: 'Budget',
    href: '/budget',
    icon: <AttachMoneyIcon />,
  },
  {
    title: 'Wallets',
    href: '/wallets',
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
  },
];

const Sidebar = ({ onClose, open, variant, className }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav pages={pages} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
