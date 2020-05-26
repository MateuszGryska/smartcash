import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  IconButton,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';

import mockData from './data';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const ExpensesList = () => {
  const [bilanceItems] = useState(mockData);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableCell>
                  <Checkbox />
                </TableCell>
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
                <TableCell>Actions</TableCell>
              </TableHead>
              <TableBody>
                {bilanceItems.map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.wallet}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <IconButton edge="end" size="medium">
                        <MoreVertIcon />
                      </IconButton>
                      <IconButton edge="end" size="medium">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button size="large" color="primary" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExpensesList;
