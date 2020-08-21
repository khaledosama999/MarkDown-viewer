import React from 'react';
import propTypes from 'prop-types';
import { isNil } from 'ramda';
import { connect } from 'react-redux';
import { Flex, useToast } from '@chakra-ui/core';
import { MenuButton } from './menu-button';

import services from '../services';
import { setCurrentFileAction, setFilePathAction } from '../redux/actions';

const component = ({
  file, fileContent, setFile, setFilePath,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();

  return (
    <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-around" alignItems="center" height="60px">
      <MenuButton
        key="new-file"
        title="New file"
        onClick={() => {
          setFile('');
          setFilePath(null);
        }}
      />
      <MenuButton
        key="loadFile"
        title="Load file"
        onClick={() => services.getMarkDownFile()
          .then(({ content, filePath }) => {
            if (!isNil(content) && !isNil(filePath)) {
              setFile(content);
              setFilePath(filePath);
            }
          })}
      />
      <MenuButton
        key="save"
        title="Save"
        onClick={() => {
          services.saveFile(file, fileContent)
            .then(() => toast({
              status: 'success',
              title: 'File Saved',
              description: 'The markdown was saved successfully',
              duration: 4000,
            }))
            .catch(() => toast({
              status: 'error',
              title: 'Error.',
              description: 'Can\'t save the markdown file ',
              duration: 4000,
            }));
        }}
      />
      <MenuButton
        key="show-file"
        title="Show file"
        onClick={() => {
          services.showFileInExplorer(file);
        }}
        isDisabled={isNil(file)}
      />
      <MenuButton
        key="default-file"
        title="Open in default app"
        isDisabled={isNil(file)}
        onClick={() => {
          services.openFileInDefaultApp(file)
            .catch(() => {
              toast({
                status: 'error',
                duration: 4000,
                title: 'Error',
                description: 'Something went wrong!',
              });
            });
        }}
      />
    </Flex>
  );
};

component.propTypes = {
  file: propTypes.string,
  fileContent: propTypes.string,
  setFile: propTypes.func.isRequired,
  setFilePath: propTypes.func.isRequired,
};

component.defaultProps = {
  fileContent: '',
  file: null,
};

const mapStateToProps = (state) => ({
  file: state.filePath,
  fileContent: state.file,
});

const mapDispatchToProps = (dispatch) => ({
  setFile: (content) => dispatch(setCurrentFileAction(content)),
  setFilePath: (filePath) => dispatch(setFilePathAction(filePath)),
});

export const Bar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
