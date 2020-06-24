import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import WalletCard from './components/WalletCard';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';

import WalletsModal from './components/WalletsModal';
import { fetchDataByUserId as fetchDataByUserIdAction } from '../../actions';

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

const WalletsView = ({ wallets, fetchDataByUserId }) => {
  useEffect(() => {
    fetchDataByUserId();
  }, [fetchDataByUserId]);

  const classes = useStyles();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <UserTemplate>
      <div className={classes.root}>
        <Toolbar
          handleOpen={() => setModalVisibility(true)}
          handleSearchInputChange={handleSearchInputChange}
        />
        {!wallets ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={classes.content}>
              {wallets.length > 0 ? (
                <Grid container spacing={4}>
                  {wallets
                    .filter((item) => item.name.toLowerCase().includes(searchItem.toLowerCase()))
                    .map(({ _id: id, name, sum, date }) => (
                      <Grid item lg={4} sm={6} xl={4} xs={12}>
                        <WalletCard name={name} key={id} sum={sum} date={date} />
                      </Grid>
                    ))}
                </Grid>
              ) : (
                <Typography variant="h1" align="center">
                  You dont have any wallets yet! Add new one!
                </Typography>
              )}
            </div>
            <WalletsModal
              open={isModalVisible}
              pageType="wallets"
              handleClose={() => setModalVisibility(false)}
            />
          </>
        )}
      </div>
    </UserTemplate>
  );
};

const mapStateToProps = (state) => {
  const { wallets } = state;
  return { wallets };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: () => dispatch(fetchDataByUserIdAction('wallets', 'wallets')),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletsView);
