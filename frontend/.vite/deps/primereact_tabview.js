"use client";
import {
  TimesIcon
} from "./chunk-PIS7LQPW.js";
import {
  IconBase,
  Ripple
} from "./chunk-L66C4PKG.js";
import {
  ComponentBase,
  DomHandler,
  IconUtils,
  ObjectUtils,
  PrimeReactContext,
  UniqueComponentId,
  ariaLabel,
  classNames,
  useHandleStyle,
  useMergeProps,
  useMountEffect,
  useUpdateEffect
} from "./chunk-64K2YSKI.js";
import {
  require_react
} from "./chunk-LTZIYYLR.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/primereact/tabview/tabview.esm.js
var React3 = __toESM(require_react());

// node_modules/primereact/icons/chevronleft/index.esm.js
var React = __toESM(require_react());
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var ChevronLeftIcon = React.memo(React.forwardRef(function(inProps, ref) {
  var pti = IconBase.getPTI(inProps);
  return React.createElement("svg", _extends({
    ref,
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, pti), React.createElement("path", {
    d: "M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",
    fill: "currentColor"
  }));
}));
ChevronLeftIcon.displayName = "ChevronLeftIcon";

// node_modules/primereact/icons/chevronright/index.esm.js
var React2 = __toESM(require_react());
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends2.apply(null, arguments);
}
var ChevronRightIcon = React2.memo(React2.forwardRef(function(inProps, ref) {
  var pti = IconBase.getPTI(inProps);
  return React2.createElement("svg", _extends2({
    ref,
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, pti), React2.createElement("path", {
    d: "M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",
    fill: "currentColor"
  }));
}));
ChevronRightIcon.displayName = "ChevronRightIcon";

// node_modules/primereact/tabview/tabview.esm.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var classes = {
  navcontent: "p-tabview-nav-content",
  nav: "p-tabview-nav",
  inkbar: "p-tabview-ink-bar",
  panelcontainer: function panelcontainer(_ref) {
    var props = _ref.props;
    return classNames("p-tabview-panels", props.panelContainerClassName);
  },
  prevbutton: "p-tabview-nav-prev p-tabview-nav-btn p-link",
  nextbutton: "p-tabview-nav-next p-tabview-nav-btn p-link",
  root: function root(_ref2) {
    var props = _ref2.props;
    return classNames("p-tabview p-component", {
      "p-tabview-scrollable": props.scrollable
    });
  },
  navcontainer: "p-tabview-nav-container",
  tab: {
    header: function header(_ref3) {
      var selected = _ref3.selected, disabled = _ref3.disabled, headerClassName = _ref3.headerClassName, _className = _ref3._className;
      return classNames("p-unselectable-text", {
        "p-tabview-selected p-highlight": selected,
        "p-disabled": disabled
      }, headerClassName, _className);
    },
    headertitle: "p-tabview-title",
    headeraction: "p-tabview-nav-link",
    closeIcon: "p-tabview-close",
    content: function content(_ref4) {
      var props = _ref4.props, selected = _ref4.selected, getTabProp = _ref4.getTabProp, tab = _ref4.tab, isSelected = _ref4.isSelected, shouldUseTab = _ref4.shouldUseTab, index = _ref4.index;
      return shouldUseTab(tab, index) && (!props.renderActiveOnly || isSelected(index)) ? classNames(getTabProp(tab, "contentClassName"), getTabProp(tab, "className"), "p-tabview-panel", {
        "p-hidden": !selected
      }) : void 0;
    }
  }
};
var inlineStyles = {
  tab: {
    header: function header2(_ref5) {
      var headerStyle = _ref5.headerStyle, _style = _ref5._style;
      return _objectSpread$1(_objectSpread$1({}, headerStyle || {}), _style || {});
    },
    content: function content2(_ref6) {
      var props = _ref6.props, getTabProp = _ref6.getTabProp, tab = _ref6.tab, isSelected = _ref6.isSelected, shouldUseTab = _ref6.shouldUseTab, index = _ref6.index;
      return shouldUseTab(tab, index) && (!props.renderActiveOnly || isSelected(index)) ? _objectSpread$1(_objectSpread$1({}, getTabProp(tab, "contentStyle") || {}), getTabProp(tab, "style") || {}) : void 0;
    }
  }
};
var TabViewBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: "TabView",
    id: null,
    activeIndex: 0,
    className: null,
    onBeforeTabChange: null,
    onBeforeTabClose: null,
    onTabChange: null,
    onTabClose: null,
    panelContainerClassName: null,
    panelContainerStyle: null,
    renderActiveOnly: true,
    scrollable: false,
    style: null,
    children: void 0
  },
  css: {
    classes,
    inlineStyles
  }
});
var TabPanelBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: "TabPanel",
    children: void 0,
    className: null,
    closable: false,
    closeIcon: null,
    contentClassName: null,
    contentStyle: null,
    disabled: false,
    header: null,
    headerClassName: null,
    headerStyle: null,
    headerTemplate: null,
    leftIcon: null,
    nextButton: null,
    prevButton: null,
    rightIcon: null,
    style: null,
    visible: true
  },
  getCProp: function getCProp(tab, name) {
    return ObjectUtils.getComponentProp(tab, name, TabPanelBase.defaultProps);
  },
  getCProps: function getCProps(tab) {
    return ObjectUtils.getComponentProps(tab, TabPanelBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(tab) {
    return ObjectUtils.getComponentDiffProps(tab, TabPanelBase.defaultProps);
  }
});
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var TabPanel = function TabPanel2() {
};
var TabView = React3.forwardRef(function(inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React3.useContext(PrimeReactContext);
  var props = TabViewBase.getProps(inProps, context);
  var _React$useState = React3.useState(props.id), _React$useState2 = _slicedToArray(_React$useState, 2), idState = _React$useState2[0], setIdState = _React$useState2[1];
  var _React$useState3 = React3.useState(true), _React$useState4 = _slicedToArray(_React$useState3, 2), backwardIsDisabledState = _React$useState4[0], setBackwardIsDisabledState = _React$useState4[1];
  var _React$useState5 = React3.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), forwardIsDisabledState = _React$useState6[0], setForwardIsDisabledState = _React$useState6[1];
  var _React$useState7 = React3.useState([]), _React$useState8 = _slicedToArray(_React$useState7, 2), hiddenTabsState = _React$useState8[0], setHiddenTabsState = _React$useState8[1];
  var _React$useState9 = React3.useState(props.activeIndex), _React$useState10 = _slicedToArray(_React$useState9, 2), activeIndexState = _React$useState10[0], setActiveIndexState = _React$useState10[1];
  var elementRef = React3.useRef(null);
  var contentRef = React3.useRef(null);
  var navRef = React3.useRef(null);
  var inkbarRef = React3.useRef(null);
  var prevBtnRef = React3.useRef(null);
  var nextBtnRef = React3.useRef(null);
  var tabsRef = React3.useRef({});
  var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
  var count = React3.Children.count(props.children);
  var metaData = {
    props,
    state: {
      id: idState,
      isPrevButtonDisabled: backwardIsDisabledState,
      isNextButtonDisabled: forwardIsDisabledState,
      hiddenTabsState,
      activeIndex: activeIndexState
    }
  };
  var _TabViewBase$setMetaD = TabViewBase.setMetaData(_objectSpread({}, metaData)), ptm = _TabViewBase$setMetaD.ptm, ptmo = _TabViewBase$setMetaD.ptmo, cx = _TabViewBase$setMetaD.cx, sx = _TabViewBase$setMetaD.sx, isUnstyled = _TabViewBase$setMetaD.isUnstyled;
  useHandleStyle(TabViewBase.css.styles, isUnstyled, {
    name: "tabview"
  });
  var getTabPT = function getTabPT2(tab, key, index) {
    var tabMetaData = {
      props: tab.props,
      parent: metaData,
      context: {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        active: index == activeIndexState,
        disabled: getTabProp(tab, "disabled")
      }
    };
    return mergeProps(ptm("tab.".concat(key), {
      tab: tabMetaData
    }), ptm("tabpanel.".concat(key), {
      tabpanel: tabMetaData
    }), ptm("tabpanel.".concat(key), tabMetaData), ptmo(getTabProp(tab, "pt"), key, tabMetaData));
  };
  var isSelected = function isSelected2(index) {
    return index === activeIndex;
  };
  var getTabProp = function getTabProp2(tab, name) {
    return TabPanelBase.getCProp(tab, name);
  };
  var shouldUseTab = function shouldUseTab2(tab) {
    return tab && getTabProp(tab, "visible") && ObjectUtils.isValidChild(tab, "TabPanel") && hiddenTabsState.every(function(_i) {
      return _i !== tab.key;
    });
  };
  var findVisibleActiveTab = function findVisibleActiveTab2(i) {
    var tabsInfo = React3.Children.map(props.children, function(tab, index) {
      if (shouldUseTab(tab)) {
        return {
          tab,
          index
        };
      }
    });
    return tabsInfo.find(function(_ref) {
      var tab = _ref.tab, index = _ref.index;
      return !getTabProp(tab, "disabled") && index >= i;
    }) || tabsInfo.reverse().find(function(_ref2) {
      var tab = _ref2.tab, index = _ref2.index;
      return !getTabProp(tab, "disabled") && i > index;
    });
  };
  var onTabHeaderClose = function onTabHeaderClose2(event, index) {
    event.preventDefault();
    var onBeforeTabClose = props.onBeforeTabClose, onTabClose = props.onTabClose, children = props.children;
    var key = children[index].key;
    if (onBeforeTabClose && onBeforeTabClose({
      originalEvent: event,
      index
    }) === false) {
      return;
    }
    setHiddenTabsState([].concat(_toConsumableArray(hiddenTabsState), [key]));
    if (onTabClose) {
      onTabClose({
        originalEvent: event,
        index
      });
    }
  };
  var onTabHeaderClick = function onTabHeaderClick2(event, tab, index) {
    changeActiveIndex(event, tab, index);
  };
  var changeActiveIndex = function changeActiveIndex2(event, tab, index) {
    if (event) {
      event.preventDefault();
    }
    if (!getTabProp(tab, "disabled")) {
      if (props.onBeforeTabChange && props.onBeforeTabChange({
        originalEvent: event,
        index
      }) === false) {
        return;
      }
      if (props.onTabChange) {
        props.onTabChange({
          originalEvent: event,
          index
        });
      } else {
        setActiveIndexState(index);
      }
    }
    updateScrollBar({
      index
    });
  };
  var _onKeyDown = function onKeyDown(event, tab, index) {
    switch (event.code) {
      case "ArrowLeft":
        onTabArrowLeftKey(event);
        break;
      case "ArrowRight":
        onTabArrowRightKey(event);
        break;
      case "Home":
        onTabHomeKey(event);
        break;
      case "End":
        onTabEndKey(event);
        break;
      case "PageDown":
        onPageDownKey(event);
        break;
      case "PageUp":
        onPageUpKey(event);
        break;
      case "Enter":
      case "NumpadEnter":
      case "Space":
        onTabEnterKey(event, tab, index);
        break;
    }
  };
  var onTabArrowRightKey = function onTabArrowRightKey2(event) {
    var nextHeaderAction = _findNextHeaderAction(event.target.parentElement);
    nextHeaderAction ? changeFocusedTab(nextHeaderAction) : onTabHomeKey(event);
    event.preventDefault();
  };
  var onTabArrowLeftKey = function onTabArrowLeftKey2(event) {
    var prevHeaderAction = _findPrevHeaderAction(event.target.parentElement);
    prevHeaderAction ? changeFocusedTab(prevHeaderAction) : onTabEndKey(event);
    event.preventDefault();
  };
  var onTabHomeKey = function onTabHomeKey2(event) {
    var firstHeaderAction = findFirstHeaderAction();
    changeFocusedTab(firstHeaderAction);
    event.preventDefault();
  };
  var onTabEndKey = function onTabEndKey2(event) {
    var lastHeaderAction = findLastHeaderAction();
    changeFocusedTab(lastHeaderAction);
    event.preventDefault();
  };
  var onPageDownKey = function onPageDownKey2(event) {
    updateScrollBar({
      index: React3.Children.count(props.children) - 1
    });
    event.preventDefault();
  };
  var onPageUpKey = function onPageUpKey2(event) {
    updateScrollBar({
      index: 0
    });
    event.preventDefault();
  };
  var onTabEnterKey = function onTabEnterKey2(event, tab, index) {
    changeActiveIndex(event, tab, index);
    event.preventDefault();
  };
  var _findNextHeaderAction = function findNextHeaderAction(tabElement) {
    var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var headerElement = selfCheck ? tabElement : tabElement.nextElementSibling;
    return headerElement ? DomHandler.getAttribute(headerElement, "data-p-disabled") || DomHandler.getAttribute(headerElement, "data-pc-section") === "inkbar" ? _findNextHeaderAction(headerElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
  };
  var _findPrevHeaderAction = function findPrevHeaderAction(tabElement) {
    var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var headerElement = selfCheck ? tabElement : tabElement.previousElementSibling;
    return headerElement ? DomHandler.getAttribute(headerElement, "data-p-disabled") || DomHandler.getAttribute(headerElement, "data-pc-section") === "inkbar" ? _findPrevHeaderAction(headerElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
  };
  var findFirstHeaderAction = function findFirstHeaderAction2() {
    return _findNextHeaderAction(navRef.current.firstElementChild, true);
  };
  var findLastHeaderAction = function findLastHeaderAction2() {
    return _findPrevHeaderAction(navRef.current.lastElementChild, true);
  };
  var changeFocusedTab = function changeFocusedTab2(element) {
    if (element) {
      DomHandler.focus(element);
      updateScrollBar({
        element
      });
    }
  };
  var updateInkBar = function updateInkBar2() {
    var tabHeader = tabsRef.current["tab_".concat(activeIndex)];
    inkbarRef.current.style.width = DomHandler.getWidth(tabHeader) + "px";
    inkbarRef.current.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(navRef.current).left + "px";
  };
  var updateScrollBar = function updateScrollBar2(_ref3) {
    var index = _ref3.index, element = _ref3.element;
    var tabHeader = element || tabsRef.current["tab_".concat(index)];
    if (tabHeader && tabHeader.scrollIntoView) {
      tabHeader.scrollIntoView({
        block: "nearest"
      });
    }
  };
  var updateButtonState = function updateButtonState2() {
    var _contentRef$current = contentRef.current, scrollLeft = _contentRef$current.scrollLeft, scrollWidth = _contentRef$current.scrollWidth;
    var width = DomHandler.getWidth(contentRef.current);
    setBackwardIsDisabledState(scrollLeft === 0);
    setForwardIsDisabledState(parseInt(scrollLeft) === scrollWidth - width);
  };
  var onScroll = function onScroll2(event) {
    props.scrollable && updateButtonState();
    event.preventDefault();
  };
  var getVisibleButtonWidths = function getVisibleButtonWidths2() {
    return [prevBtnRef.current, nextBtnRef.current].reduce(function(acc, el) {
      return el ? acc + DomHandler.getWidth(el) : acc;
    }, 0);
  };
  var navBackward = function navBackward2() {
    var width = DomHandler.getWidth(contentRef.current) - getVisibleButtonWidths();
    var pos = contentRef.current.scrollLeft - width;
    contentRef.current.scrollLeft = pos <= 0 ? 0 : pos;
  };
  var navForward = function navForward2() {
    var width = DomHandler.getWidth(contentRef.current) - getVisibleButtonWidths();
    var pos = contentRef.current.scrollLeft + width;
    var lastPos = contentRef.current.scrollWidth - width;
    contentRef.current.scrollLeft = pos >= lastPos ? lastPos : pos;
  };
  var reset = function reset2() {
    setBackwardIsDisabledState(true);
    setForwardIsDisabledState(false);
    setHiddenTabsState([]);
    if (props.onTabChange) {
      props.onTabChange({
        index: activeIndex
      });
    } else {
      setActiveIndexState(props.activeIndex);
    }
  };
  React3.useEffect(function() {
    updateInkBar();
    updateButtonState();
  });
  useMountEffect(function() {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  useUpdateEffect(function() {
    if (ObjectUtils.isNotEmpty(hiddenTabsState)) {
      var tabInfo = findVisibleActiveTab(hiddenTabsState[hiddenTabsState.length - 1]);
      tabInfo && onTabHeaderClick(null, tabInfo.tab, tabInfo.index);
    }
  }, [hiddenTabsState]);
  useUpdateEffect(function() {
    if (props.activeIndex !== activeIndexState) {
      updateScrollBar({
        index: props.activeIndex
      });
    }
  }, [props.activeIndex]);
  React3.useImperativeHandle(ref, function() {
    return {
      props,
      reset,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var onCloseIconKeyDown = function onCloseIconKeyDown2(event, index) {
    event.preventDefault();
    event.stopPropagation();
    switch (event.code) {
      case "Space":
      case "NumpadEnter":
      case "Enter":
        onTabHeaderClose(event, index);
        break;
    }
  };
  var createTabHeader = function createTabHeader2(tab, index) {
    var selected = isSelected(index);
    var _TabPanelBase$getCPro = TabPanelBase.getCProps(tab), headerStyle = _TabPanelBase$getCPro.headerStyle, headerClassName = _TabPanelBase$getCPro.headerClassName, _style = _TabPanelBase$getCPro.style, _className = _TabPanelBase$getCPro.className, disabled = _TabPanelBase$getCPro.disabled, leftIcon = _TabPanelBase$getCPro.leftIcon, rightIcon = _TabPanelBase$getCPro.rightIcon, header3 = _TabPanelBase$getCPro.header, headerTemplate = _TabPanelBase$getCPro.headerTemplate, closable = _TabPanelBase$getCPro.closable, closeIcon = _TabPanelBase$getCPro.closeIcon;
    var headerId = idState + "_header_" + index;
    var ariaControls = idState + index + "_content";
    var tabIndex = disabled || !selected ? -1 : 0;
    var leftIconElement = leftIcon && IconUtils.getJSXIcon(leftIcon, void 0, {
      props
    });
    var headerTitleProps = mergeProps({
      className: cx("tab.headertitle")
    }, getTabPT(tab, "headertitle", index));
    var titleElement = React3.createElement("span", headerTitleProps, header3);
    var rightIconElement = rightIcon && IconUtils.getJSXIcon(rightIcon, void 0, {
      props
    });
    var closeIconProps = mergeProps({
      className: cx("tab.closeIcon"),
      onClick: function onClick(e) {
        return onTabHeaderClose(e, index);
      },
      onKeyDown: function onKeyDown(e) {
        return onCloseIconKeyDown(e, index);
      },
      tabIndex: 0,
      "aria-label": ariaLabel("close") || "Close"
    }, getTabPT(tab, "closeIcon", index));
    var icon = closeIcon || React3.createElement(TimesIcon, closeIconProps);
    var closableIconElement = closable ? IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props
    }) : null;
    var headerActionProps = mergeProps({
      id: headerId,
      role: "tab",
      className: cx("tab.headeraction"),
      tabIndex,
      "aria-controls": ariaControls,
      "aria-selected": selected,
      "aria-disabled": disabled,
      onClick: function onClick(e) {
        return onTabHeaderClick(e, tab, index);
      },
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e, tab, index);
      }
    }, getTabPT(tab, "headeraction", index));
    var content4 = (
      // eslint-disable /
      React3.createElement("a", headerActionProps, leftIconElement, titleElement, rightIconElement, closableIconElement, React3.createElement(Ripple, null))
    );
    if (headerTemplate) {
      var defaultContentOptions = {
        className: "p-tabview-nav-link",
        titleClassName: "p-tabview-title",
        onClick: function onClick(e) {
          return onTabHeaderClick(e, tab, index);
        },
        onKeyDown: function onKeyDown(e) {
          return _onKeyDown(e, tab, index);
        },
        leftIconElement,
        titleElement,
        rightIconElement,
        element: content4,
        props,
        index,
        selected,
        ariaControls
      };
      content4 = ObjectUtils.getJSXElement(headerTemplate, defaultContentOptions);
    }
    var headerProps = mergeProps({
      ref: function ref2(el) {
        return tabsRef.current["tab_".concat(index)] = el;
      },
      className: cx("tab.header", {
        selected,
        disabled,
        headerClassName,
        _className
      }),
      style: sx("tab.header", {
        headerStyle,
        _style
      }),
      role: "presentation"
    }, getTabPT(tab, "root", index), getTabPT(tab, "header", index));
    return React3.createElement("li", headerProps, content4);
  };
  var createTabHeaders = function createTabHeaders2() {
    return React3.Children.map(props.children, function(tab, index) {
      if (shouldUseTab(tab)) {
        return createTabHeader(tab, index);
      }
    });
  };
  var createNavigator = function createNavigator2() {
    var headers = createTabHeaders();
    var navContentProps = mergeProps({
      id: idState + "_navcontent",
      ref: contentRef,
      className: cx("navcontent"),
      style: props.style,
      onScroll
    }, ptm("navcontent"));
    var navProps = mergeProps({
      ref: navRef,
      className: cx("nav"),
      role: "tablist"
    }, ptm("nav"));
    var inkbarProps = mergeProps({
      ref: inkbarRef,
      "aria-hidden": "true",
      role: "presentation",
      className: cx("inkbar")
    }, ptm("inkbar"));
    return React3.createElement("div", navContentProps, React3.createElement("ul", navProps, headers, React3.createElement("li", inkbarProps)));
  };
  var createContent = function createContent2() {
    var panelContainerProps = mergeProps({
      className: cx("panelcontainer"),
      style: props.panelContainerStyle
    }, ptm("panelcontainer"));
    var contents = React3.Children.map(props.children, function(tab, index) {
      if (shouldUseTab(tab) && (!props.renderActiveOnly || isSelected(index))) {
        var selected = isSelected(index);
        var contentId = idState + index + "_content";
        var ariaLabelledBy = idState + "_header_" + index;
        var contentProps = mergeProps({
          id: contentId,
          className: cx("tab.content", {
            props,
            selected,
            getTabProp,
            tab,
            isSelected,
            shouldUseTab,
            index
          }),
          style: sx("tab.content", {
            props,
            getTabProp,
            tab,
            isSelected,
            shouldUseTab,
            index
          }),
          role: "tabpanel",
          "aria-labelledby": ariaLabelledBy
        }, TabPanelBase.getCOtherProps(tab), getTabPT(tab, "root", index), getTabPT(tab, "content", index));
        return React3.createElement("div", contentProps, !props.renderActiveOnly ? getTabProp(tab, "children") : selected && getTabProp(tab, "children"));
      }
    });
    return React3.createElement("div", panelContainerProps, contents);
  };
  var createPrevButton = function createPrevButton2() {
    var prevIconProps = mergeProps({
      "aria-hidden": "true"
    }, ptm("previcon"));
    var icon = props.prevButton || React3.createElement(ChevronLeftIcon, prevIconProps);
    var leftIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, prevIconProps), {
      props
    });
    var prevButtonProps = mergeProps({
      ref: prevBtnRef,
      type: "button",
      className: cx("prevbutton"),
      "aria-label": ariaLabel("prevPageLabel"),
      onClick: function onClick(e) {
        return navBackward();
      }
    }, ptm("prevbutton"));
    if (props.scrollable && !backwardIsDisabledState) {
      return React3.createElement("button", prevButtonProps, leftIcon, React3.createElement(Ripple, null));
    }
    return null;
  };
  var createNextButton = function createNextButton2() {
    var nextIconProps = mergeProps({
      "aria-hidden": "true"
    }, ptm("nexticon"));
    var icon = props.nextButton || React3.createElement(ChevronRightIcon, nextIconProps);
    var rightIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, nextIconProps), {
      props
    });
    var nextButtonProps = mergeProps({
      ref: nextBtnRef,
      type: "button",
      className: cx("nextbutton"),
      "aria-label": ariaLabel("nextPageLabel"),
      onClick: function onClick(e) {
        return navForward();
      }
    }, ptm("nextbutton"));
    if (props.scrollable && !forwardIsDisabledState) {
      return React3.createElement("button", nextButtonProps, rightIcon, React3.createElement(Ripple, null));
    }
  };
  var rootProps = mergeProps({
    id: idState,
    ref: elementRef,
    style: props.style,
    className: classNames(props.className, cx("root"))
  }, TabViewBase.getOtherProps(props), ptm("root"));
  var navContainerProps = mergeProps({
    className: cx("navcontainer")
  }, ptm("navcontainer"));
  var navigator = createNavigator();
  var content3 = createContent();
  var prevButton = createPrevButton();
  var nextButton = createNextButton();
  return React3.createElement("div", rootProps, React3.createElement("div", navContainerProps, prevButton, navigator, nextButton), content3);
});
TabPanel.displayName = "TabPanel";
TabView.displayName = "TabView";
export {
  TabPanel,
  TabView
};
//# sourceMappingURL=primereact_tabview.js.map
