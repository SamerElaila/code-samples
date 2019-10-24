import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';
import axios from 'axios';

import { CollapseContainer } from '../../../../shared/components/CollapseContainer';
import UploadFilesDialog from '../../../../shared/components/UploadFilesDialog';
import Drop from './Drop';
import PodModal from './PodModal';
import ReplaceFileDialog from './uploadFileDialog';

import styles from './styles/attachment';
import compose from '../../../../shared/utils/compose';

class Attachment extends Component {
  state = {
    isExpanded: false,
    activeIndex: -1,
    isOpen: false,
    fileUploadDialog: false,
    showReplaceDialog: false,
    fileToReplace: {},
  }

  cancelTokenSource = {};

  generateNewCancelTokens = () => {
    const CancelToken = axios.CancelToken;
    this.cancelTokenSource = CancelToken.source();
  }

  handleDialog = index => () => {
    this.toggleDialog(index);
  }

  onModalCancel = () => {
    this.setState({ isOpen: false });
    this.shakeFiles();
  }

  onUploadComplete = (uploadedFiles) => {
    const { state: { activeIndex }, props: { store } } = this;
    store.reviewShipmentStore.podStore.saveFiles(uploadedFiles, activeIndex - 1);
  }

  onModalConfirm = (selectedFiles) => {
    this.setState({ isOpen: false, fileUploadDialog: true });
    this.props.store.reviewShipmentStore.podStore.uploadFiles(selectedFiles, this.onUploadComplete);
  }

  toggleFileUploadDialog = () => {
    const { fileUploadDialog } = this.state;
    this.setState({ fileUploadDialog: !fileUploadDialog }, () => {
      // this.state here is different from the upper one, we are here in this.setState callback function
      if (!this.state.fileUploadDialog) {
        this.shakeFiles();
      }
    });
  }

  toggleExpansion = () => {
    const { props: { expanded, type }, state: { isExpanded } } = this;
    this.setState({ isExpanded: !isExpanded });
    expanded(type, !isExpanded);
  }

  shakeFiles = () => {
    this.props.store.reviewShipmentStore.podStore.shakeFiles();
  }

  handleClose = () => {
    const { openDaialog } = this.state;
    this.setState({ openDaialog: !openDaialog });
    this.shakeFiles();
  }

  handleReplaceClose = () => {
    this.setState({ showReplaceDialog: false });
  }

  toggleDialog = (index) => {
    const { isOpen } = this.state;
    this.setState({ activeIndex: index, isOpen: !isOpen });
    this.props.store.reviewShipmentStore.podStore.setActiveDrop(index);
  }

  setActiveIndex = (activeIndex) => {
    this.setState({ activeIndex });
  }

  downloadFile = async ({ currentTarget: { value } }) => {
    const { fileUrl } = await this.props.req.downloadBol(value);
    if (fileUrl) window.open(fileUrl, '_blank');
  }

  cancelRequests = () => {
    const { cancelTokenSource } = this;

    if (cancelTokenSource.cancel) {
      cancelTokenSource.cancel('upload canceled by the user');
    }
  }

  handleReplaceDialog = index => ({ currentTarget: { id } }) => {
    const { state: { showReplaceDialog }, props: { data } } = this;
    const idParsed = parseInt(id, 10);
    const [file] = data.filter(item => item.id === idParsed);
    this.setState({ showReplaceDialog: !showReplaceDialog, fileToReplace: file, activeIndex: index });
  }

  render() {
    const {
      state: {
        isExpanded,
        isOpen,
        activeIndex,
        fileUploadDialog,
        showReplaceDialog,
        fileToReplace,
      },
      props: {
        data,
        title,
        classes,
        editable,
        dropsCount,
        store,
        req,
      },
    } = this;

    const { podStore } = store.reviewShipmentStore;

    const collapseContent = [];

    for (let i = 0; i < dropsCount; i += 1) {
      collapseContent.push(
        <Drop
          toggleDialog={this.toggleDialog}
          handleDialog={this.handleDialog}
          downloadFile={this.downloadFile}
          index={i}
          data={data.filter(item => item.indexPickDrop === (i + 1))}
          classes={classes}
          editable={editable}
          handleReplaceDialog={this.handleReplaceDialog}
        />,
      );
    }

    return (
      <div className={classes.attachmentWrapper}>
        <CollapseContainer
          className={classes.collapseHeader}
          isAttachment
          title={<span className={classes.title}>{title}</span>}
          isExpanded={isExpanded}
          toggleExpansion={this.toggleExpansion}
        >
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
          {collapseContent}
        </CollapseContainer>
        <PodModal
          isOpen={isOpen}
          onCancel={this.onModalCancel}
          onConfirm={this.onModalConfirm}
          activeIndex={activeIndex}
        />
        <UploadFilesDialog
          isOpen={fileUploadDialog}
          closeModal={this.toggleFileUploadDialog}
          cancelRequests={this.cancelRequests}
          acceptedFiles={podStore.filesStore.unUploadedFiles}
          rejectedFiles={[]}
        />
        <ReplaceFileDialog
          open={showReplaceDialog}
          handleClose={this.handleReplaceClose}
          file={fileToReplace}
          fileType="POD"
          title={title}
          apiRequests={req}
          index={activeIndex}
        />
      </div>
    );
  }
}

const ComposedComponent = compose(Attachment, observer, inject('store'), withStyles(styles));

export default ComposedComponent;
