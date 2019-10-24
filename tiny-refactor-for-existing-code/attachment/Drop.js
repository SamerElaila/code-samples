import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import PickDrop from './PickDrop';
import AttachmentRecord from './AttachmentRecord';
import UploadButton from './UploadButton';

import compose from '../../../../shared/utils/compose';

class Drop extends Component {
  handleClick = () => {
    const { toggleDialog, index } = this.props;
    toggleDialog(index + 1);
  }

  handleReplaceDialogAction = file => () => {
    const { onReplaceDialog, index } = this.props;
    if (onReplaceDialog) {
      onReplaceDialog(index, file);
    }
  }

  render() {
    const {
      index, data, classes, downloadFile, handleReplaceDialog, editable, store,
    } = this.props;

    const isUploadDisabled = store.reviewShipmentStore.podStore.isUploadDisabled;

    return (
      <div className={classes.dropWrapper} style={{ border: index === 0 ? 'none' : undefined }}>
        {
          !data.length
          && (
            <Grid container>
              <Grid item xs={2}>
                <PickDrop type="drop" index={index + 1} />
              </Grid>
              <Grid xs={8} />
              <Grid item xs={1}>
                <UploadButton
                  disabled={isUploadDisabled}
                  classes={classes}
                  onClick={this.handleClick}
                >
                  Upload
                </UploadButton>
              </Grid>
            </Grid>
          )
        }
        {data.map((row, i) => (
          <AttachmentRecord
            key={row.id}
            row={row}
            index={i}
            classes={classes}
            editable={editable}
            downloadFile={downloadFile}
            handleDialog={handleReplaceDialog}
            hidePickDrop={i > 0}
            showDriver
          />
        ))}
        {Boolean(data.length)
          && (
            <Grid container>
              <Grid item xs={10} />
              <Grid item xs={2}>
                <UploadButton
                  disabled={isUploadDisabled}
                  classes={classes}
                  onClick={this.handleClick}
                >
                  Upload
                </UploadButton>
              </Grid>
            </Grid>
          )
        }
      </div>
    );
  }
}

const ComposedComponent = compose(Drop, observer, inject('store'));

export default ComposedComponent;
