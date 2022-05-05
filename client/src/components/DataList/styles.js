import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  nameCol: {
    display: 'block',
    verticalAlign: 'top',
    letterSpacing: '0.4px',
    lineHeight: '1rem',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  valueCol: {
    display: 'block',
    verticalAlign: 'top',
    lineHeight: '1.4rem',
    wordWrap: 'break-word',
  }
}));
