import React, { useEffect, useState, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { List, ArrowKeyStepper } from 'react-virtualized';
import { first, get, isEmpty, union } from 'lodash';
import SearchApi, { INDEX_MODES } from 'js-worker-search';
import { useForkRef } from '@material-ui/core/utils/';
import SearchOutlined from '@iconify/icons-eva/search-outline';
import { Icon } from '@iconify/react';
import SelectItem from './SelectItem';
import PrimaryTextField from './PrimaryTextField';

const VIRTUALIZED_WIDTH = 200;

const useStyle = makeStyles(
  (theme) => ({
    virtualizedList: {
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        width: 8,
        height: 8,
        borderRadius: 4
      },
      '&::-webkit-scrollbar-track': {
        background: theme.palette.primary.main
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.main
      }
    },
    menuList: {
      paddingBottom: 0,
      paddingTop: 0
    },
    menuPaper: {
      width: 'auto'
    },
    searchFieldRoot: {
      height: '30px',
      margin: `6px ${theme.spacing(2)}px 5px ${theme.spacing(2)}px`,
      // this value is the double of horizontal margin (left margin + right margin)
      width: `calc(100% - ${theme.spacing(4)}px)`
    },
    smallSize: {
      fontSize: '0.8rem'
    },
    searchFieldAdornmentIcon: {
      color: 'rgba(0, 0, 0, 0.23)', // outlined border color from material ui textfield
      transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1)',
      '$searchFieldRoot:hover &': {
        color: theme.palette.secondary.main
      },
      '.Mui-focused &': {
        color: theme.palette.secondary.main
      }
    }
  }),
  { name: 'PrimarySelect' }
);

const PrimarySelect = React.forwardRef((props, ref) => {
  const {
    className,
    options,
    valueKey,
    primaryLabelKey,
    secondaryLabelKey,
    primaryTooltipKey,
    secondaryTooltipKey,
    value,
    onChange,
    onMenuClose,
    onMenuOpen,
    name,
    multiple,
    menuWidth,
    renderCount,
    noWrap,
    tooltip,
    removeFilter,
    groupOptions,
    valueIsObject,
    optKey,
    ...otherProps
  } = props;
  const classes = useStyle();
  const MENU_MIN_HEIGHT = 350;
  const ITEM_HEIGHT = 30;
  const DOUBLE_ITEM_HEIGHT = 50;
  const searchElementId = `PrimarySelectField-searchFilter-${name}`;

  const concatIdIfNotContain = (allIds = [], idsOrId) => {
    if (Array.isArray(idsOrId)) {
      idsOrId.forEach((id) => {
        if (!allIds.includes(id)) {
          allIds = allIds.concat(id);
        }
      });
    } else if (!allIds.includes(idsOrId)) {
      allIds = allIds.concat(idsOrId);
    }
    return allIds;
  };

  const mapToIndex = (_, index) => index;

  // const selectAllOption = {
  //   [valueKey]: -2,
  //   [primaryLabelKey]: "Selecionar tudo",
  // };
  // const additionalOptions = multiple ? [selectAllOption] : [];
  const additionalOptions = [];
  const optionsOffset = additionalOptions.length;

  /* selected indexes from options */
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [focusIndex, setFocusIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [searchWorker, setSearchWorker] = useState(null);
  /* options indexes from options */
  const [displayOptions, setDisplayOptions] = useState([]);
  const [virtualizedWidth, setVirtualizedWidth] = useState(VIRTUALIZED_WIDTH);
  /* group indexes from options */
  const [groupList, setGroupList] = useState([]);

  const focusRef = useRef();
  const filterDebounce = useRef(null);
  const inputRef = React.useRef(null);
  const rootForkedRef = useForkRef(ref, inputRef);

  const menuWidthLocal = menuWidth || virtualizedWidth;

  /**
   * UseEffect to fill with initialValue of selectedIndexes.
   */
  useEffect(
    () => {
      const hasValue = (opt) => {
        if (valueIsObject) {
          return multiple && Array.isArray(value)
            ? !(value.filter((obj) => obj[optKey] === opt.value[optKey]).length === 0)
            : value[optKey] === opt.value[optKey];
        }
        return multiple && Array.isArray(value)
          ? !(value.indexOf(opt[valueKey]) === -1)
          : value === opt[valueKey];
      };
      const initialSelectedIndexes = additionalOptions
        .concat(options)
        .map((opt, index) => (hasValue(opt) ? index : -1))
        .filter((index) => index > -1);
      setSelectedIndexes(initialSelectedIndexes);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, options]
  );

  /**
   * Verify if SelectAll option should be selected
   *
   * @returns {boolean} True if all options are selected, false opposite case
   */
  const isSelectedAllSelected = () => {
    if (displayOptions.length === optionsOffset + groupList.length) {
      return false;
    }
    return (
      selectedIndexes.length === displayOptions.length - optionsOffset - groupList.length ||
      displayOptions
        .slice(optionsOffset)
        .map((opt) =>
          get(options, [opt - optionsOffset, 'subheader'])
            ? true
            : !(selectedIndexes.indexOf(opt) === -1)
        )
        .reduce((acc, isIncluded) => acc && isIncluded, true)
    );
  };

  /**
   * Check if index is the same of select all index
   * @param {number} index
   */
  const isSelectAllItem = (index) => index + 1 === additionalOptions.length;

  /**
   * Check if respective option from this index is selected
   * @param {number} index
   */
  const isItemSelected = (index) =>
    isSelectAllItem(index)
      ? isSelectedAllSelected()
      : !(selectedIndexes.indexOf(Number(displayOptions[index])) === -1);

  /**
   * Find the item index that should be focused
   * When SelectAll is selected, it should be the one to focus,
   * in other cases, the last selected item should be focused.
   * If no item is Selected, the first item should be focused.
   * @returns {number}
   */
  const findFocusIndex = () => {
    const FIRST_INDEX = 0;
    const multipleValueSelected = isSelectedAllSelected()
      ? FIRST_INDEX
      : selectedIndexes[selectedIndexes.length - 1];
    const selectedIndex = multiple ? multipleValueSelected : first(selectedIndexes);
    return selectedIndex || FIRST_INDEX;
  };

  const handleFilterChange = (event) => {
    if (filterDebounce.current) {
      clearTimeout(filterDebounce.current);
    }

    const filterValue = event.target.value;
    if (searchWorker) {
      filterDebounce.current = setTimeout(async () => {
        // return indexes that contains filterValue without groups
        const optionsSearchResult = await searchWorker.search(filterValue);
        if (groupOptions) {
          const newDisplayOptions = additionalOptions.map(mapToIndex);
          newDisplayOptions.push(groupList[0]);
          let optionIndex = 0;
          for (let groupIndex = 1; groupIndex < groupList.length; groupIndex += 1) {
            while (optionsSearchResult[optionIndex] < groupList[groupIndex]) {
              newDisplayOptions.push(Number(optionsSearchResult[optionIndex]));
              optionIndex += 1;
            }
            newDisplayOptions.push(groupList[groupIndex]);
          }

          while (optionIndex < optionsSearchResult.length) {
            newDisplayOptions.push(Number(optionsSearchResult[optionIndex]));
            optionIndex += 1;
          }
          setDisplayOptions(newDisplayOptions);
        } else {
          setDisplayOptions(
            additionalOptions.map(mapToIndex).concat(optionsSearchResult.map((i) => Number(i)))
          );
        }
      }, 160);
    }
  };

  const createAndSetSearchWorker = () => {
    const newSearchWorker = new SearchApi({
      caseSensitive: false,
      indexMode: INDEX_MODES.ALL_SUBSTRINGS
    });
    options.forEach((option, index) => {
      if (!option.subheader)
        newSearchWorker.indexDocument(index + optionsOffset, option[primaryLabelKey]);
    });
    setSearchWorker(newSearchWorker);
  };

  useEffect(
    () => {
      const searchElement = document.getElementById(searchElementId);
      if (options.length && options.length > 0) {
        if (isEmpty(get(searchElement, 'value'))) {
          if (!removeFilter) createAndSetSearchWorker();
          if (groupOptions) {
            /* groups contains index of each group at displayOptions */
            const groups = options
              .map((option, index) => (option.subheader ? index + optionsOffset : -1))
              .filter((val) => val >= 0);
            setGroupList(groups);
          }
          /* displayOptions will be [additionalOptions indexes + options indexes] */
          setDisplayOptions(additionalOptions.concat(options).map(mapToIndex));
        }
      } else if (searchWorker !== null) {
        /* don't have options, but search exists, should clear old search; */
        setSearchWorker(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options]
  );

  const getItemOption = (index) => {
    let option;
    if (index < optionsOffset) {
      option = additionalOptions[index];
    } else {
      option = options[displayOptions[index] - optionsOffset];
    }
    return {
      primaryLabel: option[primaryLabelKey],
      secondaryLabel: option[secondaryLabelKey],
      primaryTooltip: option[primaryTooltipKey],
      secondaryTooltip: option[secondaryTooltipKey],
      subheader: option.subheader,
      isSelectAll: isSelectAllItem(index),
      icon: option.icon
    };
  };

  /**
   * Add or remove an item from a collection
   * If the collection contains the item, it is removed from the collection.
   * If the collection does not contain the item, it is added to the collection
   * @param item - Item to bem added or removed
   * @param collection - Collection that contains or not the item.
   */
  const updateCollection = (item, collection) => {
    const itemIndex = collection.indexOf(item);
    if (itemIndex === -1) collection.push(item);
    else collection.splice(itemIndex, 1);
  };

  /**
   * If SelectAll is selected, it means the user wants to Select None options
   * If SelectAll is not selected, it means the user wants to Select all options
   * All options are considered the already selected options,
   * union with the options that are being displayed
   * @returns {Array|*}
   */
  const handleClickSelectAll = () => {
    if (isSelectedAllSelected()) {
      return [];
    }
    return union(
      displayOptions.slice(optionsOffset).filter((index) => !groupList.includes(index)),
      selectedIndexes
    );
  };

  const getGroupValues = (index) => {
    const indexPos = groupList.indexOf(index);
    const firstIndexPos = groupList[indexPos];
    /*
     * If group is the last one (calculated by indexPos + 1 == groupList.length)
     * then get last element index at displayOptions + 1 ("+1" because is needed
     *  values between and not included)
     * otherwise get the number of next group.
     *
     * It ensure that option values will be between firstIndex and lasIndex.
     */
    const lastIndexPos =
      indexPos + 1 === groupList.length
        ? displayOptions[displayOptions.length - 1] + 1
        : groupList[indexPos + 1];

    /*
     * filter displayOptions from indexes
     */
    const groupSelectedIndexes = displayOptions.filter(
      (optionIndex) => firstIndexPos < optionIndex && optionIndex < lastIndexPos
    );
    return groupSelectedIndexes;
  };

  // n2 complexity
  const checkGroupIsSelected = (groupSelectedIndexes) =>
    groupSelectedIndexes.length === 0
      ? false
      : groupSelectedIndexes.reduce(
          (previous, currentIndex) => previous && selectedIndexes.includes(currentIndex),
          true
        );

  const getNewMultiValue = (index) => {
    const isSelectedAllITem = isSelectAllItem(index);
    if (isSelectedAllITem) {
      return handleClickSelectAll();
    }

    let actualValue = selectedIndexes.slice();

    if (groupList.includes(index)) {
      // get indexes that start and finish options from clicked group
      const groupSelectedIndexes = getGroupValues(index);
      const isSelectAllGroup = checkGroupIsSelected(groupSelectedIndexes);

      if (!isSelectAllGroup) {
        // select all group
        actualValue = concatIdIfNotContain(actualValue, groupSelectedIndexes);
      } else {
        actualValue = actualValue.filter(
          (selectedValue) => !groupSelectedIndexes.includes(selectedValue)
        );
      }
    } else {
      updateCollection(index, actualValue);
    }
    return actualValue;
  };

  const handleItemClick = (index) => {
    const newIndexes = multiple ? getNewMultiValue(displayOptions[index]) : [displayOptions[index]];

    const newValues = newIndexes.map((newIndex) => options[newIndex - optionsOffset][valueKey]);

    const fakeEvent = {
      target: { value: multiple ? newValues : first(newValues), name }
    };
    if (onChange) onChange(fakeEvent);
    setSelectedIndexes(newIndexes);
    if (!multiple) setOpen(false);
  };

  const rowRenderer = (row) => {
    const { key, index, style } = row;
    const {
      isSelectAll,
      subheader,
      primaryLabel,
      primaryTooltip,
      secondaryLabel,
      secondaryTooltip,
      icon
    } = getItemOption(index);
    const selected = subheader
      ? checkGroupIsSelected(getGroupValues(displayOptions[index]))
      : isItemSelected(index);
    const handleClick = () => handleItemClick(index);
    const itemRef = focusIndex === index && focusRef;

    return (
      <SelectItem
        ref={itemRef}
        key={key}
        style={style}
        checkbox={multiple}
        isSelectAllItem={isSelectAll}
        primary={primaryLabel}
        selected={selected || (selected && isSelectedAllSelected())}
        onClick={handleClick}
        subheader={subheader}
        hasTooltip={tooltip}
        primaryTooltip={primaryTooltip}
        secondary={secondaryLabel}
        secondaryTooltip={secondaryTooltip}
        icon={icon}
        noWrap={noWrap}
        selectItemMaxWidth={menuWidthLocal}
      />
    );
  };

  const focusFirstOrSelectedItem = () => {
    if (focusRef.current) focusRef.current.focus();
  };

  const renderValueCount = (labels) =>
    labels.length > 1 ? `${labels.length} selecionados` : first(labels);

  const renderMultipleDisplay = () => {
    const labels = selectedIndexes.map(
      (index) => options[Math.max(0, index - optionsOffset)][primaryLabelKey]
    );
    return renderCount ? renderValueCount(labels) : labels.join(', ');
  };

  const renderValue = () =>
    multiple
      ? renderMultipleDisplay()
      : options[first(selectedIndexes) - optionsOffset][primaryLabelKey];

  const getItemHeight = ({ index }) => {
    const item = getItemOption(index);
    return item.secondaryLabel ? DOUBLE_ITEM_HEIGHT : ITEM_HEIGHT;
  };

  useEffect(
    () => {
      setVirtualizedWidth(inputRef.current.clientWidth);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputRef.current && inputRef.current.clientWidth]
  );

  return (
    <PrimaryTextField
      name={name}
      select
      ref={rootForkedRef}
      {...otherProps}
      color="primary"
      className={className}
      SelectProps={{
        ...otherProps.SelectProps,
        MenuProps: {
          onEntered: focusFirstOrSelectedItem,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          getContentAnchorEl: null,
          MenuListProps: {
            className: classes.menuList
          },
          classes: {
            paper: classes.menuPaper
          },
          PaperProps: {
            style: {
              borderRadius:
                displayOptions.length > MENU_MIN_HEIGHT / ITEM_HEIGHT ? '0 0 0 4px' : '0 0 4px 4px',
              maxWidth: menuWidthLocal,
              minWidth: null,
              width: menuWidthLocal
            }
          },
          onExited: () => {
            setDisplayOptions(additionalOptions.concat(options).map(mapToIndex));
          }
        },
        renderValue,
        open,
        onOpen: () => {
          setFocusIndex(findFocusIndex());
          setOpen(true);
          if (onMenuOpen) onMenuOpen();
        },
        onClose: () => {
          setOpen(false);
          if (onMenuClose) onMenuClose();
        },
        multiple: true
      }}
      value={selectedIndexes}
    >
      {!removeFilter && (
        <PrimaryTextField
          id={searchElementId}
          preventClick
          className={classes.searchFieldRoot}
          placeholder="filtrar"
          onChange={handleFilterChange}
          InputProps={{
            className: classes.smallSize,
            endAdornment: (
              <InputAdornment className={classes.searchFieldAdornmentIcon} position="end">
                <Icon name={SearchOutlined} width={10} height={10} />
              </InputAdornment>
            )
          }}
        />
      )}
      <ArrowKeyStepper
        key={`menu-${name}-options`}
        columnCount={1}
        rowCount={displayOptions.length}
      >
        {({ onSectionRendered }) => (
          <List
            className={classes.virtualizedList}
            width={menuWidthLocal}
            height={Math.min(
              MENU_MIN_HEIGHT,
              displayOptions.reduce(
                (acc, opt) =>
                  get(options, [opt, secondaryLabelKey])
                    ? acc + DOUBLE_ITEM_HEIGHT
                    : acc + ITEM_HEIGHT,
                0
              )
            )}
            rowCount={displayOptions.length}
            rowHeight={getItemHeight}
            rowRenderer={rowRenderer}
            onSectionRendered={onSectionRendered}
            scrollToIndex={focusIndex}
            style={{
              width: 'auto',
              outline: 'none'
            }}
            containerStyle={{
              width: 'auto',
              maxWidth: null,
              overflow: null
            }}
            containerProps={{}}
          />
        )}
      </ArrowKeyStepper>
    </PrimaryTextField>
  );
});

PrimarySelect.defaultProps = {
  valueKey: 'value',
  primaryLabelKey: 'label',
  primaryTooltipKey: 'label',
  optKey: 'id'
};

PrimarySelect.propTypes = {
  className: PropTypes.string,
  groupOptions: PropTypes.bool,
  menuWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  noWrap: PropTypes.bool,
  onChange: PropTypes.func,
  onMenuClose: PropTypes.func,
  onMenuOpen: PropTypes.func,
  options: PropTypes.array.isRequired,
  primaryLabelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  primaryTooltipKey: PropTypes.string,
  removeFilter: PropTypes.bool,
  renderCount: PropTypes.bool,
  secondaryLabelKey: PropTypes.string,
  secondaryTooltipKey: PropTypes.string,
  tooltip: PropTypes.bool,
  value: PropTypes.any.isRequired,
  valueIsObject: PropTypes.bool,
  valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  optKey: PropTypes.string
};

export default PrimarySelect;
