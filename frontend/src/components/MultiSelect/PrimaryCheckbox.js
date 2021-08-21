import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SquareOutlined from '@iconify/icons-eva/square-outline';
import CheckMarkSquareOutlined from '@iconify/icons-eva/checkmark-square-2-outline';
import { Icon } from '@iconify/react';

const useStyle = makeStyles(() => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.Mui-checked:hover': {
      backgroundColor: 'transparent'
    }
  }
}));

const PrimaryCheckbox = ({ ...props }) => {
  const classes = useStyle();
  return (
    <>
      <Checkbox
        icon={<Icon name={SquareOutlined} width={10} height={10} />}
        checkedIcon={<Icon name={CheckMarkSquareOutlined} width={10} height={10} />}
        color="secondary"
        {...props}
        className={classNames(classes.root, props.className)}
      />
    </>
  );
};

PrimaryCheckbox.propTypes = {
  className: PropTypes.string
};

export default PrimaryCheckbox;
