import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Typography, CircularProgress } from '@material-ui/core';
import { fetchDataByUserId as fetchDataByUserIdAction, clean as cleanAction } from 'actions';
import { itemTypes } from 'helpers/itemTypes';
import { sectionsInfo } from 'helpers/sectionsInfo';
import InfoTooltip from 'components/InfoTooltip';
import {
  BudgetCategoryCard,
  CategoriesModal,
  Toolbar,
} from 'views/BudgetCategoriesView/components';

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

const BudgetCategoriesView = ({ categories, fetchDataByUserId, cleanUp, isLoading, error }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const classes = useStyles();

  useEffect(() => {
    fetchDataByUserId(itemTypes.categories);
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
        {error === 'Could not find a categories for the provided user.'
          ? "You don't have any categories, add new one!"
          : error}
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <Toolbar
        handleSearchInputChange={handleSearchInputChange}
        handleOpen={() => setModalVisibility(true)}
      />
      <>
        {renderData}
        <InfoTooltip info={sectionsInfo.budgetCategories} />
        <CategoriesModal
          fetchDataByUserId={fetchDataByUserId}
          open={isModalVisible}
          handleClose={() => setModalVisibility(false)}
        />
      </>
    </div>
  );
};

BudgetCategoriesView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchDataByUserId: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

BudgetCategoriesView.defaultProps = {
  isLoading: false,
  error: null,
};

const mapStateToProps = (state) => {
  const { categories } = state.items;
  const { error, isLoading } = state.items.fetchData;
  return { categories, error, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemType) => dispatch(fetchDataByUserIdAction(itemType)),
  cleanUp: () => dispatch(cleanAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCategoriesView);
