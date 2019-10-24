import React from 'react';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';

const Title = ({
  classes, count, type, isExpanded,
}) => (
    <Grid container spacing={0} style={{ marginLeft: '10px' }}>
      <Grid item xs={isExpanded ? 2 : 12}>
        <span>{type}</span>
        {type === 'PODs' && count === 0 && <span className={classes.countsColor}>(0)</span>}
        {count > 0 && (
          <span className={classes.countsColor}>
            (
            {count}
            )
          </span>
        )}
      </Grid>
      {
        isExpanded && type !== 'PODs'
        && (
          <React.Fragment>
            <Grid item xs={4}>
              <span className={classNames(classes.span, classes.spanHeader)}>Name</span>
            </Grid>
            <Grid item xs={4}>
              <span
                className={classNames(classes.span, classes.spanHeaderDate)}
              >
                Upload Date
              </span>
            </Grid>
          </React.Fragment>
        )
      }
    </Grid>
  );


export default Title;
