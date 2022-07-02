import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@material-ui/core';
// import useStyles from './styles'

const CustomDialog = ({ open, handleClose, value, handleSubmit, onchange }) => {
  // const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="User Name"
                type="text"
                fullWidth
                value={value}
                onChange={(evt) => onchange(evt.target.value)}
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
  )
};

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onchange: PropTypes.func.isRequired,
};

CustomDialog.defaultProps = {
  value: '',
};

export default CustomDialog;
