import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles'

const DataList = ({ list }) => {
  const classes = useStyles();
  console.log('listt: ', list)

  return (
    <table>
      <tbody>
        {list.map((item, index) => (
          <tr key={index}>
            <td className={classes.nameCol}>
              {item.user_name}
            </td>
            <td className={classes.valueCol}>
              {item.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

DataList.propTypes = {
  list: PropTypes.array,
};

DataList.defaultProps = {
  list: [],
};

export default DataList;
