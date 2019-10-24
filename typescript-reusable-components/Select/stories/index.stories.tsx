import React, { FC, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';

import { theme } from '../../../../config';

import Select from '../';

interface IStorySelect {
  [x: string]: any;
}

const options = [
  {
    label: 'Option 1',
    value: 'option1'
  },
  {
    label: 'Option 2',
    value: 'option2'
  },
  {
    label: 'Option 3',
    value: 'option3'
  },
  {
    label: 'Option 4',
    value: 'option4'
  },
  {
    label: 'Option 5',
    value: 'option5'
  },
  {
    label: 'Option 6',
    value: 'option6'
  }
];

const CompWithProvider: FC<IStorySelect> = props => {
  const [value, setValue] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Select
        {...props}
        options={props.options}
        value={value}
        onChange={val => setValue(val)}
      />
    </ThemeProvider>
  );
};

storiesOf('UI Library|core/Select', module)
  .add('Select with scrolling', () => (
    <CompWithProvider
      label="Select"
      options={options.concat(options).concat(options)}
    />
  ))
  .add('Select no scrolling', () => (
    <CompWithProvider
      label="Select"
      options={options}
      renderOption={({ label, value }: { label: string; value: string }) => (
        <div>
          {value},{label}
        </div>
      )}
    />
  ))
  .add('Select no scrolling and 3 options', () => (
    <CompWithProvider
      label="Select"
      options={options.slice(0, 3)}
      renderOption={({ label, value }: { label: string; value: string }) => (
        <div>
          {value},{label}
        </div>
      )}
    />
  ));
