/* Copyright (C) 2019 Universidade Federal de Campina Grande (UFCG) */

import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(
  {
    root: {
      height: '40px',
      width: '100%'
      // margin: '10px 0px',
    }
  },
  { name: 'PrimaryTextField' }
);

const PrimaryTextField = React.forwardRef((props, ref) => {
  const { className, onClick, preventClick, ...otherProps } = props;
  const classes = useStyle();

  return (
    <TextField
      ref={ref}
      {...otherProps}
      color="primary"
      className={classNames(classes.root, className)}
      onClick={preventClick ? null : onClick}
    />
  );
});

PrimaryTextField.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  preventClick: PropTypes.bool
};

export default PrimaryTextField;
