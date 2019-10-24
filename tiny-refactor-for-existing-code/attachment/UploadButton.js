import React from 'react';

import Button from './Button';
import CustomTooltip from '../../../../shared/components/CustomTooltip/CustomTooltip';

const UploadButton = ({ children, ...props }) => (props.disabled
  ? (
    <CustomTooltip
      title="You can only upload PODs after the shipment has been dispatched"
      placement="top"
      interactive
    >
      <span>
        <Button {...props}>{children}</Button>
      </span>
    </CustomTooltip>
  )
  : <Button {...props}>{children}</Button>);

export default UploadButton;
