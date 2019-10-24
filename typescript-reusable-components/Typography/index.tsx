import React from 'react';

import { Text } from './styles';

import { UiLibraryTypes } from '../../../typescript';

const Typography: React.FunctionComponent<
  UiLibraryTypes.componentsTypes.ITypography
> = props => {
  return <Text {...props}>{props.children}</Text>;
};

export default Typography;
