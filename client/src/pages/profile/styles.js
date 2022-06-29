import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 10px',
    padding: '10px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: '25%',
  },
  button: {
    margin: '30px 10px',
    padding: '0 50px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  flexContain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
  }
}));