import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Typography } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import BudgetCategoryCard from './components/BudgetCategoryCard';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import mockData from './data';
import ActiveModal from '../../components/ActiveModal/ActiveModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const BudgetCategoriesView = () => {
  const classes = useStyles();
  const [bilanceItems] = useState(mockData);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  const incomes = bilanceItems.filter((item) => {
    return item.categoryType === 'income';
  });
  const expenses = bilanceItems.filter((item) => {
    return item.categoryType === 'expense';
  });

  return (
    <UserTemplate>
      <div className={classes.root}>
        <Toolbar
          handleSearchInputChange={handleSearchInputChange}
          handleOpen={() => setModalVisibility(true)}
        />
        <div>
          <Grid container spacing={4} className={classes.gridContainer}>
            {incomes
              .filter((item) => item.categoryName.toLowerCase().includes(searchItem.toLowerCase()))
              .map(({ id, categoryName, categoryType, sumAll, updatedAt }) => (
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <BudgetCategoryCard
                    categoryName={categoryName}
                    key={id}
                    categoryType={categoryType}
                    sumAll={sumAll}
                    updatedAt={updatedAt}
                  />
                </Grid>
              ))}
          </Grid>
          <Divider />
          <Grid container spacing={4} className={classes.gridContainer}>
            {expenses
              .filter((item) => item.categoryName.toLowerCase().includes(searchItem.toLowerCase()))
              .map(({ id, categoryName, categoryType, sumAll, updatedAt }) => (
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <BudgetCategoryCard
                    categoryName={categoryName}
                    key={id}
                    categoryType={categoryType}
                    sumAll={sumAll}
                    updatedAt={updatedAt}
                  />
                </Grid>
              ))}
          </Grid>
          {incomes === 0 && expenses === 0 ? (
            <Typography variant="h1" align="center">
              You dont have any wallets yet! Add new one!
            </Typography>
          ) : null}
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

export default BudgetCategoriesView;