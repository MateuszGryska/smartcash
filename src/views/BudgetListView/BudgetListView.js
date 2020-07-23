import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { fetchDataByUserId as fetchDataByUserIdAction } from 'actions';
import { BudgetListTable, Toolbar, BudgetListModal } from 'views/BudgetListView/components';

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
  error,
  isLoading,
}) => {
  const [searchItem, setSearchItem] = useState('');
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    fetchDataByUserId('categories', 'categories');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchDataByUserId('budgetElements', 'budgetElements');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchDataByUserId('wallets', 'wallets');
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
};

BudgetListView.defaultProps = {
  budgetElements: [],
  categories: [],
  wallets: [],
};

const mapStateToProps = (state) => {
  const { budgetElements, wallets, categories, error, isLoading } = state.items;
  return { budgetElements, wallets, categories, error, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: (itemURL, itemType) => dispatch(fetchDataByUserIdAction(itemURL, itemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListView);
