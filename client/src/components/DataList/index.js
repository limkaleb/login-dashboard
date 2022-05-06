import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles'

const DataList = ({ list }) => {
  const classes = useStyles();
  console.log('listt: ', list)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User Name</TableCell>
          <TableCell>Joined</TableCell>
          <TableCell>Login Count</TableCell>
          <TableCell>Last Session</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((item, index) => (
          <TableRow>
            <TableCell>{item.user_name}</TableCell>
            <TableCell>{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
            <TableCell>{item.counter}</TableCell>
            <TableCell>{moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

DataList.propTypes = {
  list: PropTypes.array,
};

DataList.defaultProps = {
  list: [],
};

export default DataList;
