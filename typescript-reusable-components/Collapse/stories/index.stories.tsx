import React, { FC } from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';

import { theme } from '../../../../config';

import Collapse from '../';

interface IStoryCollapse {
  [x: string]: any;
}

const CompWithProvider: FC<IStoryCollapse> = () => (
  <ThemeProvider theme={theme}>
    <Collapse title="collapse title">
      {(ref: any) => (
        <ul ref={ref} style={{ padding: 0, margin: 0 }}>
          <li>collapse item 1</li>
          <li>collapse item 2</li>
          <li>collapse item 3</li>
          <li>collapse item 4</li>
          <li>collapse item 5</li>
          <li>collapse item 6</li>
          <li>collapse item 7</li>
          <li>collapse item 8</li>
          <li>collapse item 9</li>
          <li>collapse item 10</li>
        </ul>
      )}
    </Collapse>
  </ThemeProvider>
);

storiesOf('UI Library|core/Collapse', module).add('Basic', () => (
  <CompWithProvider />
));
