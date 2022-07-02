import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import dayjs from 'dayjs';
import useStyles from './styles'

const DataList = ({ list }) => {
  const classes = useStyles();
  return (
    <Table style={{ marginTop: '20px' , borderTopWidth: 2, borderColor: 'red',borderStyle: 'solid' }}>
      <TableHead>
        <TableRow>
          <TableCell>User Name</TableCell>
          <TableCell>Joined</TableCell>
          <TableCell>Login Count</TableCell>
          <TableCell>Last Session</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.length > 0 && list.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.user_name}</TableCell>
            <TableCell>{dayjs(item.created_at).format('MMMM DD YYYY, h:mm:ss a')}</TableCell>
            <TableCell>{item.counter}</TableCell>
            <TableCell>{dayjs(item.updated_at).format('MMMM DD YYYY, h:mm:ss a')}</TableCell>
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
