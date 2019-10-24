import { animated } from 'react-spring';

import StyledTheme from '../../../typescript/themeType';

import { UiLibraryTypes } from '../../../typescript';

export const Wrapper = StyledTheme(animated.div)<
  UiLibraryTypes.componentsStyleTypes.IBottomTopModalWrapperStyle
>`
    width: 100%;
    z-index: 999;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
`;

export const Overlay = StyledTheme(animated.div)<
  UiLibraryTypes.componentsStyleTypes.IBottomTopModalOverlayStyle
>`
    height: 20%;
    background-color: ${props => props.theme.colors.overlay};
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 5;
`;

export const Content = StyledTheme(animated.div)`
    background-color: ${props => props.theme.colors.white};
    height: 80%;
    top: 20%;
    width: 100%;
    position: absolute;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    z-index: 6;
`;
