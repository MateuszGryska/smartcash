import React, { useState } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Hidden, IconButton, Badge, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const StyledAppBar = styled(AppBar)`
  background: ${({ theme }) => theme.primary.main};
`;

const Topbar = () => {
  const [notifications] = useState(['text', 'text2', 'text23']);
  return (
    <StyledAppBar>
      <Toolbar>
        <Typography variant="h3">SmartCash</Typography>
        <Hidden mdDown>
          <Grid container direction="row" justify="space-between" alignItems="center" />
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon fontSize="large" />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon fontSize="large" />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <Grid container direction="row" justify="space-between" alignItems="center" />
          <IconButton color="inherit">
            <MenuIcon fontSize="large" />
          </IconButton>
        </Hidden>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;
