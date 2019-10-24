/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-unresolved */
// TODO BANNA please don't use the next flag, because that will make messing up the indentation very easy and please fix the indentation also, thanks
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core';

import Title from './Title';
import Attachment from './Attachment';
import PodAttachment from './PodAttachment';
import Header from './Header';
import styles from './styles';

import compose from '../../../../shared/utils/compose';

class AttachmentsContainer extends Component {
  state = {
    isExpandedBOL: false,
    isExpandedPOD: false,
    isExpandedEXC: false,
  }

  expandedAttachment = (type, isExpanded) => {
    if (type === 'BOL') { this.setState({ isExpandedBOL: isExpanded }); } else if (type === 'POD') {
      this.setState({ isExpandedPOD: isExpanded });
    } else {
      this.setState({ isExpandedEXC: isExpanded });
    }
  }

  render() {
    // eslint-disable-next-line max-len
    const { store: { reviewShipmentStore: { attachmentStore } }, permissions, classes } = this.props;
    const { isExpandedBOL, isExpandedPOD, isExpandedEXC } = this.state;
    const bol = attachmentStore.getBol;
    const pod = attachmentStore.getPod;
    const exception = attachmentStore.getException;
    const req = this.props.store.apiRequests.addBolsRequests;
    const bolCount = bol.length;
    const podCount = pod.length;
    const exceptionCount = exception.length;
    const documentCount = bolCount + podCount + exceptionCount;


    const canRead = permissions && permissions.canRead();
    const canWrite = permissions && permissions.canWrite();

    if (!canRead) return null;

    return (
      <div>
        <Header documentCount={documentCount} />
        <Attachment
          editable={canWrite}
          data={bol}
          type="BOL"
          expanded={this.expandedAttachment}
          title={<Title classes={classes} count={bolCount} type="BOLs" isExpanded={isExpandedBOL} />}
          req={req}
          count={bolCount}
        />
        <PodAttachment
          editable={canWrite}
          data={pod}
          type="POD"
          expanded={this.expandedAttachment}
          title={<Title classes={classes} count={podCount} type="PODs" isExpanded={isExpandedPOD} />}
          req={req}
          count={podCount}
          dropsCount={attachmentStore.dropsCount}
        />
        <Attachment
          editable={canWrite}
          data={exception}
          type="EXCEPTION"
          expanded={this.expandedAttachment}
          title={<Title classes={classes} count={exceptionCount} type="EXCEPTION IMAGES" isExpanded={isExpandedEXC} />}
          req={req}
          count={exceptionCount}
        />
      </div>
    );
  }
}


const ComposedComponent = compose(
  AttachmentsContainer,
  observer,
  inject('store'),
  withStyles(styles, { withTheme: true }),
);

export default ComposedComponent;
