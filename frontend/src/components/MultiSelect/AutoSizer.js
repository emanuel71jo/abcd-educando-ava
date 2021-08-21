import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';

const styles = {
  fitContent: { width: 'fit-content' }
};

const AutoSizer = ({ children, classes, className, ...otherProps }) => {
  const childRef = React.useRef();
  const [, forceUpdate] = React.useState(null);
  React.useEffect(() => {
    forceUpdate(1);
  }, []);
  const width = childRef.current && childRef.current.clientWidth;
  const height = childRef.current && childRef.current.clientHeight;

  return (
    <div className={classNames(classes.fitContent, className)} {...otherProps} ref={childRef}>
      {typeof children === 'function' ? children({ width, height }) : children}
    </div>
  );
};

AutoSizer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.number,
    PropTypes.func
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(AutoSizer);
