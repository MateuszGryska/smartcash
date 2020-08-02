import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { fetchDataByUserId as fetchDataByUserIdAction } from 'actions';
import { BudgetListTable, Toolbar, BudgetListModal } from 'views/BudgetListView/components';
import { itemTypes } from 'helpers/itemTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const BudgetListView = ({
  fetchDataByUserId,
  budgetElements,
  wallets,
  categories,
  fetchData: { error, isLoading },
}) => {
  const [searchItem, setSearchItem] = useState('');
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    fetchDataByUserId(itemTypes.categories);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchDataByUserId(itemTypes.budgetElements);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchDataByUserId(itemTypes.wallets);
    // eslint-disable-next-line
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar
        handleOpen={() => setModalVisibility(true)}
        handleSearchInputChange={handleSearchInputChange}
      />
      <div className={classes.content}>
        <BudgetListTable
          searchItem={searchItem}
          budgetElements={budgetElements}
          wallets={wallets}
          categories={categories}
          error={error}
          isLoading={isLoading}
        />
      </div>
      <BudgetListModal
        open={isModalVisible}
        handleClose={() => setModalVisibility(false)}
        wallets={wallets}
        categories={categories}
      />
    </div>
  );
};

BudgetListView.propTypes = {
  budgetElements: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  wallets: PropTypes.arrayOf(PropTypes.object),
  fetchDataByUserId: PropTypes.func.isRequired,
  fetchData: PropTypes.shape({
    isLoading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
};

BudgetListView.defaultProps = {
  budgetElements: [],
  categories: [],
  wallets: [],
  fetchData: {
    isLoading: false,
    error: null,
  },
};

const mapStateToProps = (state) => {
  const {
    budgetElements,
    wallets,
    categories,
    fetchData: { isLoading, error },
  } = state.items;
  return { budgetElements, wallets, categories, fetchData: { error, isLoading } };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemType) => dispatch(fetchDataByUserIdAction(itemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListView);
