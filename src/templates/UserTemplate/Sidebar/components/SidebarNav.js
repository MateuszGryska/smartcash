import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const SidebarNav = ({ className, pages, onClose }) => {
  const classes = useStyles();

  return (
    <List className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={NavLink}
            to={page.href}
            exact={page.exact}
            onClick={onClose}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SidebarNav.defaultProps = {
  className: '',
};

export default SidebarNav;
