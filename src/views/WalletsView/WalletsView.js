import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { Toolbar, WalletCard, WalletsModal } from 'views/WalletsView/components';

import { fetchDataByUserId as fetchDataByUserIdAction } from 'actions';
import { itemTypes } from 'helpers/itemTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const WalletsView = ({ wallets, fetchDataByUserId, isLoading, error }) => {
  useEffect(() => {
    fetchDataByUserId(itemTypes.wallets);
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  let renderData;
  if (isLoading) {
    renderData = (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  } else if (error !== null || !wallets) {
    renderData = (
      <Typography align="center" variant="h3">
        You don&#39;t have any wallets! Add new one!
      </Typography>
    );
  } else if (wallets.length > 0) {
    renderData = (
      <Grid container spacing={4}>
        {wallets
          .filter((item) => item.name.toLowerCase().includes(searchItem.toLowerCase()))
          .map(({ _id: id, name, sum, date, budgetElements }) => (
            <Grid item lg={4} sm={6} xl={4} xs={12} key={id}>
              <WalletCard
                name={name}
                id={id}
                sum={sum}
                date={date}
                budgetElements={budgetElements}
              />
            </Grid>
          ))}
      </Grid>
    );
  } else {
    renderData = (
      <Typography align="center" variant="h3">
        You don&#39;t have any wallets, add new one!
      </Typography>
    );
  }

  return (
    <article className={classes.root}>
      <Toolbar
        handleOpen={() => setModalVisibility(true)}
        handleSearchInputChange={handleSearchInputChange}
      />

      <>
        <section className={classes.content}>{renderData}</section>

        <WalletsModal open={isModalVisible} handleClose={() => setModalVisibility(false)} />
      </>
    </article>
  );
};

WalletsView.propTypes = {
  wallets: PropTypes.arrayOf(PropTypes.object),
  fetchDataByUserId: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

WalletsView.defaultProps = {
  wallets: [],
  error: null,
};

const mapStateToProps = (state) => {
  const { wallets, error, isLoading } = state.items;
  return { wallets, error, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemType) => dispatch(fetchDataByUserIdAction(itemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletsView);
