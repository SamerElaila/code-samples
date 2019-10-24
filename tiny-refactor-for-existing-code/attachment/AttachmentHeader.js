import React from 'react';
import { Grid, withStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';

import styles from './styles/attachmentHeader';

import compose from '../../../../shared/utils/compose';

const AttachmentHeader = ({ classes }) => (
  <Grid container>
    <Grid item xs={2}><Typography className={classes.dropHeader}>DROPS</Typography></Grid>
    <Grid item xs={3}>
      <span className={classNames(classes.span, classes.spanHeader, classes.dropHeader)}>FILENAME</span>
    </Grid>
    <Grid item xs={2}>
      <Typography className={classes.dropHeader}>
        USER
      </Typography>
    </Grid>
    <Grid item xs={3} className={classes.dropHeader}>
      <span
        className={classNames(classes.span, classes.spanHeaderDate, classes.dropHeader)}
      >
        UPLOAD DATE
      </span>
    </Grid>
    <Grid item xs={2} />
  </Grid>
);

const ComposedComponent = compose(AttachmentHeader, withStyles(styles));

export default ComposedComponent;
