import { css } from '@emotion/core';
import StyledTheme from '../../../typescript/themeType';

import { UiLibraryTypes } from '../../../typescript';

export const Wrapper = StyledTheme.div<
  UiLibraryTypes.componentsStyleTypes.ITextFieldStyle
>`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  transition: 0.3s;
  box-shadow: ${props =>
    props.showShadow && props.theme.shadows.inputUnfocused};

    ${props =>
      props.showShadow &&
      props.isFocused &&
      css`
        box-shadow: ${props.theme.shadows.inputFocused};
      `}
`;

export const TextInput = StyledTheme.input<
  UiLibraryTypes.componentsStyleTypes.ITextInputStyle
>`
    border: none;
    outline: none;
    flex: 1;

    &::placeholder {
        color: ${props => props.placeholderColor};
    }
`;
