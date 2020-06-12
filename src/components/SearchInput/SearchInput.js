import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));

const SearchInput = ({ className, onChange, ...rest }) => {
  const classes = useStyles();

  return (
    <Paper {...rest} className={clsx(classes.root, className)}>
      <SearchIcon className={classes.icon} />
      <Input {...rest} className={classes.input} disableUnderline onChange={onChange} />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  className: '',
};

export default SearchInput;
