import React, { FC, useRef } from 'react';
import { useSpring, useChain } from 'react-spring';

import { UiLibraryTypes } from '../../../typescript';

import { Wrapper, Overlay, Content } from './styles';

const BottomTopModal: FC<UiLibraryTypes.componentsTypes.IBottomTopModal> = ({
  open,
  onClose,
  children
}) => {
  let windowHeight = 300;

  const contentRef: any = useRef();
  const overlayRef: any = useRef();

  if (window) {
    windowHeight = window.innerHeight;
  }

  const modalSpring = useSpring({
    height: open ? windowHeight : 0,
    opacity: open ? 1 : 0,
    ref: contentRef
  });

  const overlaySpring = useSpring({
    opacity: open ? 0.5 : 0,
    ref: overlayRef,
    config: {
      duration: 100
    }
  });

  useChain([contentRef, overlayRef]);

  return (
    <Wrapper style={modalSpring}>
      <Overlay style={overlaySpring} onClick={() => onClose()} />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default BottomTopModal;
