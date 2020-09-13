import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { Toolbar, WalletCard, WalletsModal } from 'views/WalletsView/components';
import InfoTooltip from 'components/InfoTooltip';

import { fetchDataByUserId as fetchDataByUserIdAction, clean as cleanAction } from 'actions';
import { itemTypes } from 'helpers/itemTypes';
import { sectionsInfo } from 'helpers/sectionsInfo';

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

const WalletsView = ({ wallets, fetchDataByUserId, cleanUp, isLoading, error }) => {
  const classes = useStyles();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    fetchDataByUserId(itemTypes.wallets);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

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
        {error === 'Could not find a wallets for the provided user.'
          ? "You don't have any wallets, add new one!"
          : error}
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
        <InfoTooltip info={sectionsInfo.budgetWallets} />
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
  cleanUp: PropTypes.func.isRequired,
};

WalletsView.defaultProps = {
  wallets: [],
  error: null,
};

const mapStateToProps = (state) => {
  const { wallets } = state.items;
  const { error, isLoading } = state.items.fetchData;
  return { wallets, error, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemType) => dispatch(fetchDataByUserIdAction(itemType)),
  cleanUp: () => dispatch(cleanAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletsView);
