import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import BudgetListTable from './components/BudgetListTable';
import Toolbar from './components/Toolbar';
import UserTemplate from '../../templates/UserTemplate/UserTemplate';
import BudgetActiveModal from '../../components/BudgetActiveModal/BudgetActiveModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const BudgetListView = () => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
  };
  const [isModalVisible, setModalVisibility] = useState(false);
  const classes = useStyles();
  return (
    <UserTemplate>
      <div className={classes.root}>
        <Toolbar
          handleOpen={() => setModalVisibility(true)}
          handleSearchInputChange={handleSearchInputChange}
        />
        <div className={classes.content}>
          <BudgetListTable searchItem={searchItem} />
        </div>
        <BudgetActiveModal open={isModalVisible} handleClose={() => setModalVisibility(false)} />
      </div>
    </UserTemplate>
  );
};

export default BudgetListView;
