import React, { FC } from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';

import { theme } from '../../../../config';

import { useDisclosure } from '../../../../hooks';

import Button from '../../Button';
import BottomTopModal from '../';

interface IStoryBottomTopModal {
  [x: string]: any;
}

const CompWithProvider: FC<IStoryBottomTopModal> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ThemeProvider theme={theme}>
      <>
        <Button onClick={() => onOpen()}>Toggle</Button>
        <BottomTopModal open={isOpen} onClose={onClose}>
          <Button onClick={() => onClose()}>Close</Button>
        </BottomTopModal>
      </>
    </ThemeProvider>
  );
};

storiesOf('UI Library|core/Bottom Top Modal', module).add('Basic', () => (
  <CompWithProvider />
));
