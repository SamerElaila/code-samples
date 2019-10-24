import React from 'react';
import { useDropzone } from 'react-dropzone';
import { withStyles } from '@material-ui/core';

import styles from './styles/dropZone';

import compose from '../../../../shared/utils/compose';

function CustomDropZone({ classes, onDrop }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.wrapper}>
      <input {...getInputProps()} />
      <span className={classes.content}>
        Drag and drop files or click to select the files
      </span>
    </div>
  );
}

const ComposedComponent = compose(CustomDropZone, withStyles(styles));

export default ComposedComponent;
