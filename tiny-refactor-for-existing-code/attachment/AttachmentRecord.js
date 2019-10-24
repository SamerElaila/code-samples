import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { observer } from 'mobx-react';

import Pickdrop from './PickDrop';
import AttachmentButton from './Button';

const AttachmentRecord = ({
  row, classes, downloadFile, handleDialog, index, editable, hidePickDrop, showDriver,
}) => (
    <Grid container spacing={0} className={classes.row}>
      <Grid item xs={2}>
        {(row.indexPickDrop !== -1 && !hidePickDrop)
          ? <Pickdrop type={row.type} index={row.indexPickDrop} />
          : null
        }
      </Grid>
      <Grid item xs={showDriver ? 3 : 4}>
        <Button
          className={classes.link}
          value={row.fileKey}
          id={row.id}
          onClick={downloadFile}
        >
          <span className={classes.linkSpan}>
            {row.friendlyFileName || '-----'}
          </span>
        </Button>
      </Grid>
      {
        showDriver
        && (
          <Grid item xs={2}>
            {row.userType}
          </Grid>
        )
      }
      <Grid item xs={showDriver ? 3 : 4}>
        {row.createdAt ? moment(row.createdAt).format('L') : '00:00'}
      </Grid>
      <Grid item xs={2}>
        {
          editable
          && (
            <AttachmentButton classes={classes} variant="outlined" onClick={handleDialog(index + 1)} id={row.id}>
              Replace
            </AttachmentButton>
          )
        }
      </Grid>
    </Grid>
  );

export default observer(AttachmentRecord);
