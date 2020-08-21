import React from 'react';
import { Box } from '@chakra-ui/core';
import { Bar, Main } from './components';

const App = () => (
  <Box h="100%" w="100%">
    <Bar />
    <Main mt={1} />
  </Box>
);

export default App;
