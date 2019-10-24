import React from 'react';
import { Button } from '@material-ui/core';

const AttachmentButton = ({
  classes, onClick, id, children, disabled,
}) => (
  <Button
      className={classes.replaceBtn}
      variant="outlined"
      onClick={onClick}
      id={id}
      disabled={disabled}
    >
      {children}
    </Button>
);

export default AttachmentButton;
