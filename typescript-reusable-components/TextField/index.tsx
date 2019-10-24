import React, { FC, ChangeEvent, FocusEvent, useState } from 'react';

import { UiLibraryTypes } from '../../../typescript';

import { Wrapper, TextInput } from './styles';

const TextField: FC<UiLibraryTypes.componentsTypes.ITextField> = ({
  onChange,
  type,
  value,
  placeholder,
  placeholderColor,
  showShadow,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
  disabled
}) => {
  const [textValue, setTextValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (onChange) {
      onChange(value, e);
    }
    setTextValue(value);
  }

  function handleFocus(e: FocusEvent<HTMLDivElement>) {
    if (onFocus) {
      onFocus(e);
    }
    setIsFocused(true);
  }

  function handleBlur(e: FocusEvent<HTMLDivElement>) {
    if (onBlur) {
      onBlur(e);
    }
    setIsFocused(false);
  }

  return (
    <Wrapper
      showShadow={showShadow}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {leftIcon}
      <TextInput
        type={type}
        value={textValue}
        onChange={handleChange}
        placeholder={placeholder}
        placeholderColor={placeholderColor}
        disabled={disabled}
      />
      {rightIcon}
    </Wrapper>
  );
};

TextField.defaultProps = {
  type: 'text'
};

export default TextField;
