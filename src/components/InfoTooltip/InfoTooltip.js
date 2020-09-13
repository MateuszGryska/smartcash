import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Tooltip, Typography, Button } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const InfoTooltip = ({ info }) => {
  const classes = useStyles();

  const visibleInfo = (
    <>
      <Typography color="inherit">{info}</Typography>
    </>
  );

  return (
    <Tooltip title={visibleInfo}>
      <Button className={classes.root} startIcon={<InfoOutlinedIcon />}>
        Help
      </Button>
    </Tooltip>
  );
};

InfoTooltip.propTypes = {
  info: PropTypes.node.isRequired,
};

export default InfoTooltip;
