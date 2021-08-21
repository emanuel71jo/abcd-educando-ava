import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AutoSizer from './AutoSizer';
import MouseTracker from './MouseTracker';
import PrimaryCheckbox from './PrimaryCheckbox';

const borderStyle = (color) => `1px solid ${color}`;

const SELECT_ITEM_MAX_WIDTH = 170;
const SELECT_ITEM_HORIZONTAL_PADDING = 24;
const SELECT_LEFT_PADDING = 4;
const SELECT_RIGHT_PADDING = 8;
const SELECT_CHECKBOX_WIDTH = 38;

const useStyle = (menuItemMaxWidth) =>
  makeStyles((theme) => ({
    menuItem: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      minHeight: '30px',
      fontSize: '0.8rem',
      '&:hover  &.Mui-selected:hover': {
        backgroundColor: 'rgba(0,0,0, 0.08)'
      },
      '&.Mui-selected': {
        backgroundColor: '#f4faff'
      }
    },
    menuItemPadding: {
      paddingLeft: 5
    },
    typographyClass: {
      maxWidth: menuItemMaxWidth,
      width: 'fit-content'
    },
    subheader: {
      color: 'rgba(0, 0, 0, 0.60)',
      borderBottom: borderStyle('rgba(0, 0, 0, 0.12)')
    },
    selectAllItem: {
      borderBottom: borderStyle('rgba(0, 0, 0, 0.12)'),
      borderTop: borderStyle('rgba(0, 0, 0, 0.12)')
    },
    iconSubHeader: {
      padding: '9px',
      right: 0
    }
  }))();

const SelectItem = React.forwardRef((props, ref) => {
  const {
    style,
    disabled,
    checked,
    checkbox,
    icon,
    isSelectAllItem,
    hasTooltip,
    selectItemMaxWidth = SELECT_ITEM_MAX_WIDTH,
    noWrap,
    primary,
    primaryTooltip,
    secondary,
    secondaryTooltip,
    subheader,
    ...others
  } = props;

  let selectItemMaxWidthLocal = selectItemMaxWidth;
  if (checkbox) {
    selectItemMaxWidthLocal -= SELECT_LEFT_PADDING + SELECT_CHECKBOX_WIDTH + SELECT_RIGHT_PADDING;
  } else {
    selectItemMaxWidthLocal -= SELECT_ITEM_HORIZONTAL_PADDING;
  }

  const classes = useStyle(selectItemMaxWidthLocal);
  const isSubheader = Boolean(subheader);
  const defaultContentProps = {
    className: classNames({ [classes.typographyClass]: noWrap }),
    component: 'div',
    noWrap
  };
  const menuItemDefaultProps = {
    ...others,
    className: classNames(others.className)
  };
  const mouseTrackerProps = {
    ...menuItemDefaultProps,
    closeOnClick: !checkbox
  };

  let primaryContent = primary;
  let secondaryContent = secondary;
  let menuItemContent = primaryContent;

  if (!hasTooltip) {
    primaryContent = (
      <Typography {...defaultContentProps} variant="body2">
        {primary}
      </Typography>
    );

    if (secondary) {
      secondaryContent = (
        <Typography {...defaultContentProps} variant="caption" color="textSecondary">
          {secondary}
        </Typography>
      );
    }

    mouseTrackerProps.tooltipContent = secondaryTooltip ? (
      <div>
        <Typography variant="body2">{primaryTooltip}</Typography>
        <Typography variant="body2" color="textSecondary">
          {secondaryTooltip}
        </Typography>
      </div>
    ) : (
      primaryTooltip
    );

    menuItemContent = (
      <AutoSizer>
        {({ width }) =>
          width >= selectItemMaxWidthLocal ? (
            <MouseTracker {...mouseTrackerProps}>
              <div>
                {primaryContent}
                {secondaryContent}
              </div>
            </MouseTracker>
          ) : (
            <>
              {primaryContent}
              {secondaryContent}
            </>
          )
        }
      </AutoSizer>
    );
  }

  let clonedIcon = null;
  if (icon) {
    clonedIcon = React.cloneElement(icon, {
      className: classNames({ [classes.iconSubHeader]: isSubheader }),
      ...(isSubheader ? { containerStyle: { position: 'absolute', right: 0 } } : {})
    });
  }

  const menuItem = (
    <MenuItem
      {...menuItemDefaultProps}
      ref={ref}
      disabled={disabled}
      className={classNames(classes.menuItem, {
        [classes.menuItemPadding]: checkbox,
        [classes.subheader]: isSubheader,
        [classes.selectAllItem]: isSelectAllItem
      })}
      disableGutters
      disableRipple
      style={{
        ...style,
        height: Math.min(276, (secondary ? 2 : 1) * 25),
        paddingTop: '0',
        paddingBottom: '0'
      }}
    >
      {checkbox && <PrimaryCheckbox disableRipple checked={menuItemDefaultProps.selected} />}
      {icon && !isSubheader && clonedIcon}
      {menuItemContent}
      {icon && isSubheader && clonedIcon}
    </MenuItem>
  );

  return hasTooltip ? (
    <MouseTracker
      {...mouseTrackerProps}
      tooltipContent={primaryTooltip}
      TooltipProps={{
        TextProps: {
          variant: 'body2'
        }
      }}
    >
      {menuItem}
    </MouseTracker>
  ) : (
    menuItem
  );
});

SelectItem.propTypes = {
  checkbox: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  hasTooltip: PropTypes.bool,
  icon: PropTypes.node,
  isSelectAllItem: PropTypes.bool,
  noWrap: PropTypes.bool,
  primary: PropTypes.node.isRequired,
  primaryTooltip: PropTypes.node,
  secondary: PropTypes.node,
  secondaryTooltip: PropTypes.node,
  selectItemMaxWidth: PropTypes.number,
  style: PropTypes.object,
  subheader: PropTypes.node
};

export default React.memo(SelectItem);
