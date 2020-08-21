import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import {
  Textarea, Box, Text, useToast,
} from '@chakra-ui/core';
import { parse } from 'marked';

import { empty } from 'ramda';
import { setCurrentFileAction, setFilePathAction } from '../redux/actions';
import { getFileMetaData } from '../services/helpers/files';
import services from '../services';

const component = ({ file = '', setFile, setFilePath }) => {
  const htmlContent = parse(file, { sanitize: true });
  const toast = useToast();

  const onDropHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (!empty(e.dataTransfer.files)) {
        const file = e.dataTransfer.files[0];
        const { type, filePath } = getFileMetaData(file);

        if (!['text/markdown'].includes(type)) {
          toast({
            title: 'Error',
            description: 'Only markdown files are supported',
            duration: 4000,
            status: 'error',
          });
        }

        services.readFile(filePath)
          .then((content) => {
            setFile(content);
            setFilePath(filePath);
          })
          .catch(() => {
            toast({
              title: 'Error',
              description: 'Can not read file',
              duration: 4000,
              status: 'error',
            });
          });
      }
    },
    [toast, setFile, setFilePath],
  );

  return (
    <Box w="100%" h="calc(100% - 60px)" position="relative">
      <Textarea
        focusBorderColor="blue.500"
        p={2}
        mr={2}
        borderWidth="0px"
        bg="cyan.100"
        placeholder="# Title"
        fontSize="2rem"
        position="absolute"
        boxSizing="border-box"
        left="0px"
        height="100%"
        width="49%"
        minWidth="250px"
        resize="none"
        display="inline-block"
        value={file}
        onChange={(e) => { setFile(e.target.value); }}
        onDrop={(e) => {
          onDropHandler(e);
        }}
      />
      <Text
        width="50%"
        minWidth="250px"
        height="100%"
        position="absolute"
        right="0px"
        display="inline-block"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Box>
  );
};

component.propTypes = {
  file: propTypes.string.isRequired,
  setFile: propTypes.func.isRequired,
  setFilePath: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  file: state.file,
});

const mapDispatchToProps = (dispatch) => ({
  setFile: (file) => dispatch(setCurrentFileAction(file)),
  setFilePath: (filePath) => dispatch(setFilePathAction(filePath)),
});

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
