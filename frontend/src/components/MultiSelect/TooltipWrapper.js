/* Copyright (C) 2019 Universidade Federal de Campina Grande (UFCG) */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    zIndex: 1301, // 1300 is menu index
    maxWidth: 350,
    padding: '8px 12px',
    position: 'relative',
    wordBreak: 'break-all'
  }
};

/**
 * Component that looks like a Tooltip and is used on MouseTracker
 */
const TooltipWrapper = React.forwardRef((props, ref) => {
  const { classes, className, children, TextProps, ...otherProps } = props;

  let component = null;
  if (children) {
    const content =
      typeof children === 'string' || typeof children === 'number' ? (
        <Typography {...TextProps}>{children}</Typography>
      ) : (
        children
      );
    const tooltipPaper = (
      <Paper
        className={classNames(classes.root, className)}
        ref={ref}
        elevation={3}
        {...otherProps}
      >
        {content}
      </Paper>
    );

    component = ReactDOM.createPortal(tooltipPaper, document.body);
  }

  return component;
});

TooltipWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  TextProps: PropTypes.object
};

export default withStyles(styles)(TooltipWrapper);
