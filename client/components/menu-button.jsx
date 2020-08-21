import React from 'react';
import { Button } from '@chakra-ui/core';
import propTypes from 'prop-types';

export const MenuButton = ({ title, onClick, isDisabled }) => (
  <Button
    size="lg"
    height="100%"
    variantColor="teal"
    fontSize="2xl"
    flex="1 1 auto"
    minWidth="280px"
    isDisabled={isDisabled}
    onClick={() => onClick()}
  >
    {title}
  </Button>
);

MenuButton.propTypes = {
  title: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  isDisabled: propTypes.bool,
};

MenuButton.defaultProps = {
  isDisabled: false,
};
