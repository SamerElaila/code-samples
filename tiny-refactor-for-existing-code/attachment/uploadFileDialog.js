/* eslint-disable no-unused-expressions */
import React, { useMemo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import * as s from '../../../shipments/createShipment/components/Bols/styles/Bols';
import UploadFilesDialog from '../../../shipments/createShipment/components/Bols/components/uploadProgressInfo/UploadFilesDialog';
import UtilFunctions from '../../../../shared/utils/UtilFunctions';

const pageTitle = 'review shipment';
const section = 'upload file dialog';
const makeId = (id) => UtilFunctions.makeReadyId(pageTitle, section, id);

const styles = () => ({
  root: {
    margin: 0,
    paddingBottom: 0,
  },
  closeButton: {
    position: 'absolute',
  },
  smallContainer: {
    padding: '10px 30px',
  },
  uploadBtn: {
    backgroundColor: '#fa6400 !important',
    color: '#fff !important',
    borderRadius: 3,
    marginRight: 20,
    textTransform: 'capitalize',
    fontWeight: 'normal',
  },
  cancelBtn: {
    marginRight: 25,
    textTransform: 'capitalize',
    fontWeight: 'normal',
  },
  innerDialog: {
    '& div div': {
      borderRadius: 7,
    },
    width: '85%',
    margin: 'auto',
  },
  content: {
    width: 600,
    maxHeight: 340,
    minHeight: 340,
  },
  filesWrapper: {
    height: 140,
    paddingLeft: 45,
  },
  dropZone: {
    height: 85,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  dropZoneWrapper: {
    borderWidth: '1px !important',
    borderColor: 'rgb(189, 189, 189) !important',
    backgroundColor: '#FFF !important',
  },
  btnsWrapper: {
    margin: 0,
  },
  dialogContent: {
    '&:first-child': {
      paddingTop: 0,
      paddingBottom: 20,
    },
  },
  dialogContentError: {
    '&:first-child': {
      paddingBottom: 8,
    },
  },
  uploadError: {
    borderColor: '#f00 !important',
    color: '#f00 !important',
  },
  uploadErrorMessage: {
    color: '#f00',
    fontSize: 12,
    marginLeft: 10,
  },
  dialogTitle: {
    fontSize: 35,
    fontWeight: 900,
    paddingBottom: 0,
    paddingLeft: 10,
  },
  uploadDate: {
    textAlign: 'center',
    fontSize: 15,
    color: '#4C4C4C',
  },
  fileType: {
    fontSize: 13,
    color: '#4C4C4C',
  },
  fileName: {
    fontSize: 15,
    color: '#4C4C4C',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography className={classes.dialogTitle} variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

class UploadFileDialogs extends React.Component {
  cancelTokenSource = {};

  state = {
    // eslint-disable-next-line react/no-unused-state
    open: true,
    accepted: [],
    rejected: [],
    error: null,
  };

  onDrop = async (accepted, rejected) => {
    this.setState(state => ({ accepted, rejected, error: accepted.length ? null : state.error }));
  }

  getFileType = fileName => fileName.split('.')[fileName.split('.').length - 1];

  onClick = async () => {
    const {
      apiRequests,
      // eslint-disable-next-line max-len
      store: { CreateShipmentStore: { bolsStore: { addRejectedBols, openModal, setFilesUploadingStatus } }, reviewShipmentStore: { attachmentStore }, messageStore },
      file: { indexPickDrop, type },
    } = this.props;
    const { accepted, rejected } = this.state;
    const { file: { id, fileKey: oldFileKey } } = this.props;
    try {
      if (!accepted.length) {
        this.setState({ error: 'This field is required' });
        return;
      }
      this.handleClose();
      this.generateNewCancelTokens();
      // eslint-disable-next-line camelcase
      const content_type = this.getFileType(accepted[0].name);
      // eslint-disable-next-line no-unused-expressions
      // eslint-disable-next-line max-len
      rejected.length !== 0 && addRejectedBols(this.formatFiles({ pickDropType: type, pickDropIndex: indexPickDrop })(rejected[0]));
      openModal();
      const urls = await apiRequests.getUrls({ content_type, count: 1 });
      const uploadRequests = this.generateUpdateRequests(accepted[0], urls[0]);
      setFilesUploadingStatus(true);
      await uploadRequests;
      setFilesUploadingStatus(false);
      await attachmentStore.editDocument(id, urls[0].fileKey, oldFileKey);
    } catch (error) {
      messageStore.showMessage({
        message: error,
        autoHideDuration: 6000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'filled_error',
        classes: 'font-bold text-base',
      });
    }
  }

  generateNewCancelTokens = () => {
    const CancelToken = axios.CancelToken;
    this.cancelTokenSource = CancelToken.source();
  }

  cancelRequests = () => this.cancelTokenSource.cancel('upload canceled by the user');

  formatFiles = data => ({
    lastModified, name, path, size, type, webkitRelativePath,
  }) => ({
    lastModified, name, path, size, type, webkitRelativePath, ...data,
  });

  generateUpdateRequests = (bol, urls) => {
    const { fileUrl, fileKey } = urls;
    // eslint-disable-next-line max-len
    const { store: { CreateShipmentStore: { bolsStore } }, file: { indexPickDrop, type } } = this.props;
    const pickDropType = type || '';
    const pickDropIndex = indexPickDrop || -1;
    bolsStore.addAcceptedBols(
      this.formatFiles({ fileKey, pickDropType, pickDropIndex })(bol),
    );
    return axios({
      responseType: 'arraybuffer',
      cancelToken: this.cancelTokenSource.token,
      url: fileUrl,
      method: 'PUT',
      data: bol,
      onUploadProgress: (e) => {
        const fileUploadProgressValue = parseInt(Math.round((e.loaded * 100) / e.total), 10);
        if (fileUploadProgressValue < 100) {
          bolsStore.setUploadProgressValue(fileKey, fileUploadProgressValue);
        }
      },
    })
      .then(() => {
        bolsStore.setUploadProgressValue(fileKey, 100);
      })
      .catch(() => bolsStore.setUploadError(fileKey));
  }

  // eslint-disable-next-line react/no-unused-state
  handleClickOpen = () => this.setState({ open: true });

  // eslint-disable-next-line react/no-unused-state
  handleClose = () => this.setState({ open: false, accepted: [], rejected: [] });

  render() {
    const {
      store: { CreateShipmentStore: { bolsStore } }, file: {
        friendlyFileName, createdAt, indexPickDrop, type,
      },
      fileType,
      classes,
      index,
    } = this.props;
    const { open, error, accepted } = this.state;

    const files = accepted.map(file => (
      <p key={file.name}>
        {file.name}
      </p>
    ));

    return (
      <div>
        {open && (
          <Dialog
            onClose={this.props.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.props.open}
            className={classes.innerDialog}
          >
            <div className={classes.content}>
              <DialogTitle id="customized-dialog-title">Upload replacement for..</DialogTitle>
              <Grid container spacing={12} className={classes.smallContainer}>
                <Grid item xs={1} className={classes.fileType}>
                  {fileType}
                </Grid>
                <Grid item xs={7} className={classes.fileName}>
                  <span style={{ fontWeight: 'bold' }}>#{index}</span>
                  {friendlyFileName || '---'}
                </Grid>
                <Grid item xs={4} className={classes.uploadDate}>
                  {' '}
                  Upload Date: {moment(createdAt).format('L')}{' '}
                </Grid>
              </Grid>
              {this.state.accepted.length <= 0 ? (
                <div className={classNames({ [classes.uploadWrapper]: error })}>
                  <MuiDialogContent
                    dividers
                    className={classNames(classes.dialogContent, {
                      [classes.dialogContentError]: error,
                    })}
                  >
                    <Dropzone
                      multiple={false}
                      accept="image/jpeg, image/png, application/pdf, image/jpg"
                      onDrop={this.onDrop}
                      id={makeId('dropzone')}
                    >
                      {(props) => {
                        const style = useMemo(
                          () => ({
                            ...s.baseStyle,
                            ...(props.isDragActive ? s.activeStyle : {}),
                            ...(props.isDragAccept ? s.acceptStyle : {}),
                            ...(props.isDragReject ? s.rejectStyle : {}),
                          }),
                          [props.isDragActive, props.isDragReject]
                        );
                        return (
                          <section className="container">
                            <div
                              className={classNames(classes.dropZoneWrapper, {
                                [classes.uploadError]: error,
                              })}
                              {...props.getRootProps({ style })}
                            >
                              <input
                                id={makeId('dropzone-action-zone')}
                                {...props.getInputProps()}
                              />
                              <div className={classes.dropZone}>
                                Drag and drop or click to select the file
                              </div>
                            </div>
                            {error && <p className={classes.uploadErrorMessage}>{error}</p>}
                          </section>
                        );
                      }}
                    </Dropzone>
                  </MuiDialogContent>
                </div>
              ) : (
                <aside className={classes.filesWrapper}>{files}</aside>
              )}
              <MuiDialogActions className={classes.btnsWrapper}>
                <Button
                  className={classes.cancelBtn}
                  variant="outlined"
                  color="secondary"
                  onClick={this.props.handleClose}
                  id={makeId('cancel')}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.uploadBtn}
                  onClick={this.onClick}
                  variant="outlined"
                  color="secondary"
                  id={makeId('upload')}
                >
                  Upload
                </Button>
              </MuiDialogActions>
            </div>
          </Dialog>
        )}
        <UploadFilesDialog
          isOpen={bolsStore.modal}
          closeModal={bolsStore.closeModal}
          cancelRequests={this.cancelRequests}
          filesStatuses={this.state}
          getAcceptedBols={bolsStore.getAcceptedBols}
          getRejectedBols={bolsStore.getRejectedBols}
          pickDropType={type || ''}
          pickDropIndex={indexPickDrop || -1}
          isUploading={bolsStore.isUploading}
        />
      </div>
    );
  }
}

export default withStyles(styles)((inject('store'))(observer(UploadFileDialogs)));
