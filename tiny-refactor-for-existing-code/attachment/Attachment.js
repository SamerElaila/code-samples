/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { CollapseContainer } from '../../../../shared/components/CollapseContainer';
import UploadFileDialogs from './uploadFileDialog';
import AttachmentRecord from './AttachmentRecord';
import AttachmentHeader from './AttachmentHeader';
import styles from './styles/attachment';


class Attachment extends Component {
  state = {
    isExpanded: false,
    openDaialog: false,
    file: {},
  }

  // eslint-disable-next-line react/no-access-state-in-setstate
  toggleExpansion = () => {
    const { props: { expanded, type }, state: { isExpanded } } = this;
    this.setState({ isExpanded: !isExpanded });
    expanded(type, !isExpanded);
  }

  handleDialog = index => ({ currentTarget: { id } }) => {
    const { data } = this.props;
    // eslint-disable-next-line radix
    const file = data.filter(item => item.id === parseInt(id));
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ openDaialog: !this.state.openDaialog, file: file[0], index });
  }

  handleClose = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ openDaialog: !this.state.openDaialog });
  }

  downloadFile = async ({ currentTarget: { value } }) => {
    const { fileUrl } = await this.props.req.downloadBol(value);
    if (fileUrl) window.open(fileUrl, '_blank');
  }

  render() {
    const {
      state: {
        isExpanded, openDaialog, file, index,
      }, props: {
        data, title, type, classes, editable, req,
      },
    } = this;

    console.log({ type });

    return data.length > 0 ? (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <div className={classes.attachmentWrapper}>
        {openDaialog
          && (
            <UploadFileDialogs
              open={openDaialog}
              handleClose={this.handleClose}
              file={file}
              fileType={type}
              title={title}
              apiRequests={req}
              index={index}
            />
          )
        }
        <CollapseContainer
          className={classes.collapseHeader}
          isAttachment
          title={<span className={classes.title}>{title}</span>}
          isExpanded={isExpanded}
          toggleExpansion={this.toggleExpansion}
        >
          {
            type === 'BOL'
            && <AttachmentHeader />
          }
          {
            data.map((row, i) => (
              <AttachmentRecord
                index={i}
                key={row.id}
                editable={editable}
                row={row}
                classes={classes}
                downloadFile={this.downloadFile}
                handleDialog={this.handleDialog}
              />
            ))
          }
        </CollapseContainer>
      </div>
    ) : (
      <div className="w-full py-16 flex justify-between">
          <span>{title}</span>
          <span className={classes.emptyState}>
            {
              type === 'BOL' || type === 'POD' ? `No ${type}(s) uploaded`
                : 'No Exception Images uploaded'
            }
          </span>
        </div>
    );
  }
}
export default withStyles(styles)((inject('store'))(observer(Attachment)));
