import React, { useState } from 'react';
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
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ActiveModal from '../../../../components/ActiveModal/ActiveModal';


import mockData from './data';

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

const BilanceList = () => {
  const [bilanceItems] = useState(mockData);
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
        title="Latest Incomes/Outcomes"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Wallet</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
              </TableHead>
              <TableBody>
                {bilanceItems.map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.wallet}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button size="large" color="primary" variant="text" component={Link} to="/expenses">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
      <ActiveModal
        pageType="expenses"
        open={isModalVisible}
        handleClose={() => setModalVisibility(false)}
        type="edit"
      />
    </Card>
  );
};

export default BilanceList;
