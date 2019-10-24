import React, { FC, useState } from 'react';
import { useSpring } from 'react-spring';

import { UiLibraryTypes } from '../../../typescript';

import Option from '../Option';
import { SelectStyled, OptionsWrapper, IconWrapper, SelectText, Header } from './styles';

import ArrowIcon from '../../../assets/ic_expand.svg';

const Select: FC<UiLibraryTypes.componentsTypes.ISelect> = ({
  options,
  label,
  renderOption,
  value,
  onChange,
  inputProps
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const menuSpring = useSpring({
    opacity: expanded ? 1 : 0,
    maxHeight: expanded ? 250 : 0
  });

  const arrowSpring = useSpring({
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
  });

  function toggleMenu() {
    setExpanded(!expanded);
  }

  function handleChange(value: string) {
    if (onChange) {
      onChange(value);
    }
    setExpanded(false);
    setSelectedValue(value);
  }

  const iconStyles = {
    height: '14px',
    width: '14px'
  }

  return (
    <SelectStyled>
      <Header onClick={toggleMenu}>
      <SelectText>
        {selectedValue || label}
      </SelectText>
      <IconWrapper onClick={toggleMenu} style={arrowSpring}>
        <ArrowIcon style={iconStyles} />
      </IconWrapper>
      </Header>
      <OptionsWrapper style={menuSpring}>
        {options.map(option => {
          return (
            <Option
              key={option.value}
              {...option}
              renderOption={renderOption}
              onClick={handleChange}
              isSelected={selectedValue === option.value}
            />
          );
        })}
      </OptionsWrapper>
    </SelectStyled>
  );
};

Select.defaultProps = {
  options: []
};

export default Select;
