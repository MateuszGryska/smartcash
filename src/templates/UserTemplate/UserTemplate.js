import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',

    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
}));

const UserTemplate = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

UserTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserTemplate;
