import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Typography, CircularProgress } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import BudgetCategoryCard from './components/BudgetCategoryCard';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import CategoriesModal from './components/CategoriesModal';

import { fetchDataByUserId as fetchDataByUserIdAction } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const BudgetCategoriesView = ({ categories, fetchDataByUserId, error, isLoading }) => {
  useEffect(() => {
    fetchDataByUserId();
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
  } else if (error !== null || !categories) {
    renderData = (
      <Typography align="center" variant="h3">
        You don&#39;t have any categories! Add new one!
      </Typography>
    );
  } else if (categories.length > 0) {
    let incomes;
    let expenses;
    if (categories) {
      incomes = categories.filter((item) => {
        return item.type === 'income';
      });
      expenses = categories.filter((item) => {
        return item.type === 'expense';
      });
    }
    renderData = (
      <div>
        <Grid container spacing={4} className={classes.gridContainer}>
          {incomes.length > 0 ? (
            incomes
              .filter((category) => category.name.toLowerCase().includes(searchItem.toLowerCase()))
              .map(({ _id: id, name, type, sum, date }) => (
                <Grid item lg={4} sm={6} xl={4} xs={12} key={id}>
                  <BudgetCategoryCard name={name} id={id} type={type} sum={sum} date={date} />
                </Grid>
              ))
          ) : (
            <Typography align="center" variant="h3">
              You don&#39;t have any incomes, add new one!
            </Typography>
          )}
        </Grid>
        <Divider />
        <Grid container spacing={4} className={classes.gridContainer}>
          {expenses.length > 0 ? (
            expenses
              .filter((category) => category.name.toLowerCase().includes(searchItem.toLowerCase()))
              .map(({ _id: id, name, type, sum, date }) => (
                <Grid item lg={4} sm={6} xl={4} xs={12} key={id}>
                  <BudgetCategoryCard name={name} id={id} type={type} sum={sum} date={date} />
                </Grid>
              ))
          ) : (
            <Typography align="center" variant="h3">
              You don&#39;t have any expenses, add new one!
            </Typography>
          )}
        </Grid>
      </div>
    );
  } else {
    renderData = (
      <Typography align="center" variant="h3">
        You don&#39;t have any categories, add new one!
      </Typography>
    );
  }

  return (
    <UserTemplate>
      <div className={classes.root}>
        <Toolbar
          handleSearchInputChange={handleSearchInputChange}
          handleOpen={() => setModalVisibility(true)}
        />
        <>
          {renderData}

          <CategoriesModal open={isModalVisible} handleClose={() => setModalVisibility(false)} />
        </>
      </div>
    </UserTemplate>
  );
};

const mapStateToProps = (state) => {
  const { categories, error, isLoading } = state.items;
  return { categories, error, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: () => dispatch(fetchDataByUserIdAction('categories', 'categories')),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCategoriesView);
