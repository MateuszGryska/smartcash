import React from 'react';
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

const SearchInput = ({ className, style, onChange, ...rest }) => {
  const classes = useStyles();

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input {...rest} className={classes.input} disableUnderline onChange={onChange} />
    </Paper>
  );
};

export default SearchInput;
