import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TooltipWrapper from './TooltipWrapper';

const styles = {
  root: {
    width: '100%',
    height: '100%'
  }
};

const defaultMouseDistance = 15;

/**
 * A Tooltip that follows the Mouse Position
 */
const MouseTracker = (props) => {
  const [openState, setOpenState] = React.useState(false);
  const tooltipRef = React.useRef();
  const { anchorRef, children, tooltipContent, TooltipProps, closeOnClick = true } = props;

  const getMouseEventCoordinates = (event) => ({
    left: event.pageX,
    top: event.pageY
  });

  const setTooltipRefPosition = (event) => {
    if (tooltipRef.current) {
      const { top, left } = getMouseEventCoordinates(event);
      tooltipRef.current.style.top = `${top + defaultMouseDistance}px`;
      tooltipRef.current.style.left = `${left + defaultMouseDistance}px`;
    }
  };

  const handleMouseEnter = (event) => {
    if (!openState && tooltipContent) {
      setOpenState(true);
      setTooltipRefPosition(event);
    }
  };

  const handleMouseOut = () => {
    if (openState) {
      setOpenState(false);
    }
  };

  const handleMouseMove = (event) => {
    setTooltipRefPosition(event);
  };

  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }

    if (closeOnClick) setOpenState(false);
  };

  const childrenProps = {
    ...children.props,
    onClick: handleClick,
    ref: children.ref
  };

  if (anchorRef && anchorRef.current) {
    anchorRef.current.onmouseenter = handleMouseEnter;
    anchorRef.current.onmouseleave = handleMouseOut;
    anchorRef.current.onmousemove = handleMouseMove;
  } else {
    childrenProps.onMouseEnter = handleMouseEnter;
    childrenProps.onMouseLeave = handleMouseOut;
    childrenProps.onMouseMove = handleMouseMove;
  }

  return (
    <>
      {React.cloneElement(children, { ...childrenProps })}
      {openState && (
        <TooltipWrapper {...TooltipProps} ref={tooltipRef} style={{ position: 'absolute' }}>
          {tooltipContent}
        </TooltipWrapper>
      )}
    </>
  );
};

MouseTracker.propTypes = {
  anchorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  closeOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  tooltipContent: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  TooltipProps: PropTypes.object
};

export default withStyles(styles)(MouseTracker);
