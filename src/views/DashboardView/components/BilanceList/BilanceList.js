import React, { useState } from 'react';
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
  Tooltip,
  TableSortLabel,
  LinearProgress,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BudgetListModal from '../../../BudgetListView/components/BudgetListModal';

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

const BilanceList = ({ budgetElements, wallets, categories }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);
  const classes = useStyles();

  const getWalletName = (walletId) => {
    const walletName = wallets.find((wallet) => wallet.id === walletId);
    return walletName.name;
  };
  const getCategoryName = (categoryId) => {
    const categoryName = categories.find((category) => category.id === categoryId);
    return categoryName.name;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarVisibility(false);
  };

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
              {budgetElements.length > 0 ? (
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
                    {budgetElements.map((item) => (
                      <TableRow hover key={item.id}>
                        <TableCell>{format(parseISO(item.date), 'dd.MM.yyyy')}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{getWalletName(item.wallet)}</TableCell>
                        <TableCell>${item.amount}</TableCell>
                        <TableCell>{getCategoryName(item.category)}</TableCell>
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
        pageType="expenses"
        open={isModalVisible}
        handleClose={() => setModalVisibility(false)}
        type="edit"
        setSnackbarVisibility={setSnackbarVisibility}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isSnackbarVisible}
        autoHideDuration={6000}
        onClose={handleClose}
        message="New item added!"
        action={
          <>
            <IconButton aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    </Card>
  );
};

export default BilanceList;
