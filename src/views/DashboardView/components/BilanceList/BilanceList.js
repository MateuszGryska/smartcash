import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  TableSortLabel,
  LinearProgress,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BudgetListModal from '../../../BudgetListView/components/BudgetListModal';

import { fetchDataByUserId as fetchDataByUserIdAction } from '../../../../actions';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const BilanceList = ({ budgetElements, fetchDataByUserId }) => {
  useEffect(() => {
    fetchDataByUserId();
  }, [fetchDataByUserId]);

  const [isModalVisible, setModalVisibility] = useState(false);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => setModalVisibility(true)}
          >
            New one
          </Button>
        }
        title="Latest Incomes/Expenses"
      />
      <Divider />
      {!budgetElements ? (
        <LinearProgress />
      ) : (
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction="desc">
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Wallet</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {budgetElements.length > 0 ? (
                    budgetElements.map((item) => (
                      <TableRow hover key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.wallet}</TableCell>
                        <TableCell>${item.amount}</TableCell>
                        <TableCell>{item.category}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography align="center" variant="h3">
                      You dont have any data, add new one!
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      )}

      <Divider />
      <CardActions className={classes.actions}>
        <Button size="large" color="primary" variant="text" component={Link} to="/budgetlist">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
      <BudgetListModal
        pageType="expenses"
        open={isModalVisible}
        handleClose={() => setModalVisibility(false)}
        type="edit"
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  const { budgetElements } = state;
  return { budgetElements };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataByUserId: () => dispatch(fetchDataByUserIdAction('budgetElements', 'budgetElements')),
});

export default connect(mapStateToProps, mapDispatchToProps)(BilanceList);
