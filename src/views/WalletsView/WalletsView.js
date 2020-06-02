import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import MoneyCard from './components/MoneyCard';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import mockData from './data';
import ActiveModal from '../../components/ActiveModal/ActiveModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const WalletsView = () => {
  const classes = useStyles();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [wallets] = useState(mockData);
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
        <div className={classes.content}>
          <Grid container spacing={4}>
            {wallets
              .filter((item) => item.accountName.toLowerCase().includes(searchItem.toLowerCase()))
              .map(({ id, accountName, moneyValue, updatedAt }) => (
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <MoneyCard
                    accountName={accountName}
                    key={id}
                    moneyValue={moneyValue}
                    updatedAt={updatedAt}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
        <ActiveModal
          open={isModalVisible}
          handleClose={() => setModalVisibility(false)}
          type="add"
        />
      </div>
    </UserTemplate>
  );
};

export default WalletsView;
