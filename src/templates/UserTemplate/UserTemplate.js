import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import Topbar from 'templates/UserTemplate/Topbar';
import Sidebar from 'templates/UserTemplate/Sidebar';
import Footer from 'templates/UserTemplate/Footer';

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
    <main
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
      <section className={classes.content}>
        {children}
        <Footer />
      </section>
    </main>
  );
};

UserTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserTemplate;
