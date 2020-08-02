import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
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
  LinearProgress,
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BudgetListModal from 'views/BudgetListView/components/BudgetListModal';
import { getName } from 'utils';
import { headCells } from 'views/BudgetListView/components/BudgetListTable/data';

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

const BilanceList = ({ budgetElements, wallets, categories, isLoading }) => {
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
      {!budgetElements && isLoading ? (
        <LinearProgress />
      ) : (
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              {budgetElements.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      {headCells.map(({ label, id, numeric, disablePadding }) => (
                        <TableCell
                          key={id}
                          align={numeric ? 'right' : 'left'}
                          padding={disablePadding ? 'none' : 'default'}
                        >
                          {label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {[...budgetElements]
                      .reverse()
                      .slice(0, 5)
                      .map((item) => (
                        <TableRow hover key={item.id}>
                          <TableCell>{format(parseISO(item.date), 'dd.MM.yyyy')}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{getName(item.wallet, wallets)}</TableCell>
                          <TableCell align="right">
                            {item.type === 'income' ? (
                              <Typography color="inherit">${item.amount}</Typography>
                            ) : (
                              <Typography color="error">${item.amount}</Typography>
                            )}
                          </TableCell>
                          <TableCell>{getName(item.category, categories)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography align="center" variant="h3">
                  You don&#39;t have any data, add new one!
                </Typography>
              )}
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
        wallets={wallets}
        categories={categories}
        open={isModalVisible}
        handleClose={() => setModalVisibility(false)}
      />
    </Card>
  );
};

BilanceList.propTypes = {
  budgetElements: PropTypes.arrayOf(PropTypes.object),
  wallets: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
};

BilanceList.defaultProps = {
  budgetElements: [],
  wallets: [],
  categories: [],
};

export default BilanceList;
