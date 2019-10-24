import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import { FuseDialog } from '@fuse';
import DropZone from './DropZone';

import styles from './styles/podModal';

import compose from '../../../../shared/utils/compose';

class PodModal extends Component {
  state = {
    selectedFiles: [],
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onConfirm = () => {
    const { state: { selectedFiles }, props: { onConfirm } } = this;
    onConfirm(selectedFiles);
  }

  onDrop = (selectedFiles) => {
    this.setState({ selectedFiles });
  }

  render() {
    const { classes, isOpen, activeIndex } = this.props;

    return (
      <FuseDialog
        isOpen={isOpen}
        classes={classes}
        options={{
          title: (
            <Typography className={classes.title}>
              Upload PODs:
              {' '}
              <span className={classes.bold}>
                D
                {activeIndex}
              </span>
            </Typography>),
          contentComponent: <DropZone onDrop={this.onDrop} />,
        }}
        actions={[
          {
            id: 'shipment-builder-modal-cancel',
            label: 'Cancel',
            buttonProps: {
              variant: 'outlined',
              className: classNames(classes.button, classes.cancelButton),
            },
            action: this.onCancel,
          },
          {
            id: 'shipment-builder-confirm-modal',
            label: 'Confirm',
            buttonProps: {
              className: classes.button,
            },
            action: this.onConfirm,
          },
        ]}
      />
    );
  }
}

const EnhancedComponent = compose(PodModal, observer, inject('store'), withStyles(styles));

export default EnhancedComponent;
