import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Typography } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import BudgetCategoryCard from './components/BudgetCategoryCard';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import CategoriesModal from './components/CategoriesModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const BudgetCategoriesView = ({ categories }) => {
  const classes = useStyles();
  // const [bilanceItems] = useState(categories);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  const incomes = categories.filter((item) => {
    return item.type === 'income';
  });
  const expenses = categories.filter((item) => {
    return item.type === 'expense';
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
              .filter((category) => category.name.toLowerCase().includes(searchItem.toLowerCase()))
              .map(({ id, name, type, sum, date }) => (
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <BudgetCategoryCard name={name} key={id} type={type} sum={sum} date={date} />
                </Grid>
              ))}
          </Grid>
          <Divider />
          <Grid container spacing={4} className={classes.gridContainer}>
            {expenses
              .filter((category) => category.name.toLowerCase().includes(searchItem.toLowerCase()))
              .map(({ id, name, type, sum, date }) => (
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <BudgetCategoryCard name={name} key={id} type={type} sum={sum} date={date} />
                </Grid>
              ))}
          </Grid>
          {incomes === 0 && expenses === 0 ? (
            <Typography variant="h1" align="center">
              You dont have any wallets yet! Add new one!
            </Typography>
          ) : null}
        </div>
        <CategoriesModal
          open={isModalVisible}
          pageType="budgetcategories"
          handleClose={() => setModalVisibility(false)}
          type="add"
        />
      </div>
    </UserTemplate>
  );
};

const mapStateToProps = (state) => {
  const { categories } = state;
  return { categories };
};

export default connect(mapStateToProps)(BudgetCategoriesView);
