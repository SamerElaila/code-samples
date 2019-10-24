import StyledTheme from '../../../typescript/themeType';
import { typography } from '../../styles';

import { UiLibraryTypes } from '../../../typescript';

export const Text = StyledTheme.span<
  UiLibraryTypes.componentsStyleTypes.ITypography
>`
  ${props => typography.mixins[props.type]}
  margin: 0;
  padding: 0;
  display: block;
`;
