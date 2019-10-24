import { animated } from 'react-spring';

import StyledTheme from '../../../typescript/themeType';

import { UiLibraryTypes } from '../../../typescript';

export const Wrapper = StyledTheme(animated.div)<
  UiLibraryTypes.componentsStyleTypes.ICollapseWrapperStyle
>`
    cursor: pointer;
`;

export const CollapseContent = StyledTheme(animated.div)<
  UiLibraryTypes.componentsStyleTypes.ICollapseContentStyle
>`
    overflow: hidden;
`;

export const CollapseTitle = StyledTheme(animated.div)<
  UiLibraryTypes.componentsStyleTypes.ICollapseTitleStyle
>`
`;
