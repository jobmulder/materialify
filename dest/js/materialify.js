'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * material.design (v0.0.1): settings.js
 * Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Settings = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'settings';
  var VERSION = '0.0.1';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ABBR = 'md';
  var FWP = ABBR + '-';
  var ELEMENT = '__';
  var MODIFIER = '--';
  var ANIMATION_TIME = 1000;
  var ANIMATION_EVENT = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
  var MD_ANIMATION_EVENT = ABBR + 'TransitionEnd';

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Settings = function () {
    function Settings() {
      _classCallCheck(this, Settings);
    }

    _createClass(Settings, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'ABBR',
      get: function get() {
        return ABBR;
      }
    }, {
      key: 'FWP',
      get: function get() {
        return FWP;
      }
    }, {
      key: 'ELEMENT',
      get: function get() {
        return ELEMENT;
      }
    }, {
      key: 'MODIFIER',
      get: function get() {
        return MODIFIER;
      }
    }, {
      key: 'MODE',
      get: function get() {
        return MODE;
      }
    }, {
      key: 'ANIMATION_TIME',
      get: function get() {
        return ANIMATION_TIME;
      }
    }, {
      key: 'ANIMATION_EVENT',
      get: function get() {
        return ANIMATION_EVENT;
      }
    }, {
      key: 'MD_ANIMATION_EVENT',
      get: function get() {
        return MD_ANIMATION_EVENT;
      }

      // public


      // private


      // static


    }]);

    return Settings;
  }();

  return Settings;
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): utility.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Utility = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'utility';
  var NAME = 'utility';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Utility = function () {
    function Utility() {
      _classCallCheck(this, Utility);
    }

    _createClass(Utility, [{
      key: 'example',


      // getters


      // public
      value: function example(element) {

        this._example(element);
      }

      // private

    }, {
      key: '_example',
      value: function _example(element) {}

      // static

    }], [{
      key: '_setOptions',
      value: function _setOptions(defaultOptions, options) {
        var finalOptions = $.extend({}, defaultOptions, options);
        return finalOptions;
      }
    }, {
      key: '_triggerEvent',
      value: function _triggerEvent($element, name) {
        var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var eventTrigger = $.Event(name);

        $element.trigger(eventTrigger, data);
        return eventTrigger;
      }
    }, {
      key: '_emulateTransitionEnd',
      value: function _emulateTransitionEnd(duration) {
        var _this = this;

        var called = false;

        $(this).one(Settings.MD_ANIMATION_EVENT, function () {
          called = true;
        });

        setTimeout(function () {
          if (!called) {
            Utility._triggerEvent(_this, Settings.MD_ANIMATION_EVENT);
          }
        }, duration);

        return this;
      }
    }, {
      key: '_debounce',
      value: function _debounce(func, wait, immediate) {
        var timeout;
        return function () {
          var context = this,
              args = arguments;
          var later = function later() {
            timeout = null;
            if (!immediate) {
              func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) {
            func.apply(context, args);
          }
        };
      }
    }, {
      key: '_throttle',
      value: function _throttle(func, limit) {
        var wait = false;
        return function () {
          var context = this,
              args = arguments;
          if (!wait) {
            func.apply(context, args);
            wait = true;
            setTimeout(function () {
              wait = false;
            }, limit);
          }
        };
      }
    }]);

    return Utility;
  }();

  $.fn.emulateTransitionEnd = Utility._emulateTransitionEnd;

  return Utility;
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): card.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Card = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'card';
  var NAME = 'card';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    TOGGLE: 'toggle' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    CARD: '' + Settings.FWP + CLASSNAME,
    IMG_CONTAINER: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'img-container',
    SHOW_ICON: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'btn-show',
    HIDE_ICON: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'btn-hide',
    // States
    ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Card = function () {
    function Card($element) {
      _classCallCheck(this, Card);

      this._$element = $element;

      this._setListeners();
    }

    // getters


    // public


    _createClass(Card, [{
      key: 'toggle',
      value: function toggle() {

        this._toggle();
      }
    }, {
      key: 'show',
      value: function show() {

        this._show();
      }
    }, {
      key: 'hide',
      value: function hide() {

        this._hide();
      }

      // private

    }, {
      key: '_toggle',
      value: function _toggle() {
        var _this = this;

        // Fire toggle event
        var toggleEvent = Utility._triggerEvent(this._$element, Event.TOGGLE);

        // Fire hide / show event based on the state before toggle
        if (this._$element.hasClass(ClassName.ACTIVE)) {

          var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);
        } else {

          var showEvent = Utility._triggerEvent(this._$element, Event.SHOW);
        }

        // Add / remove class active
        this._$element.toggleClass(ClassName.ACTIVE);

        // Fire hidden / shown event based on the state after toggle
        // Wait for animation to finish
        this._$element.one(Settings.ANIMATION_EVENT, function (event) {

          if (_this._$element.hasClass(ClassName.ACTIVE)) {

            var shownEvent = Utility._triggerEvent(_this._$element, Event.SHOWN);
          } else {

            var hiddenEvent = Utility._triggerEvent(_this._$element, Event.HIDDEN);
          }
        });
      }
    }, {
      key: '_show',
      value: function _show() {
        var _this2 = this;

        var showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

        this._$element.addClass(ClassName.ACTIVE);

        this._$element.one(Settings.ANIMATION_EVENT, function (event) {

          var shownEvent = Utility._triggerEvent(_this2._$element, Event.SHOWN);
        });
      }
    }, {
      key: '_hide',
      value: function _hide() {
        var _this3 = this;

        var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

        this._$element.removeClass(ClassName.ACTIVE);

        this._$element.one(Settings.ANIMATION_EVENT, function (event) {

          var hiddenEvent = Utility._triggerEvent(_this3._$element, Event.HIDDEN);
        });
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this4 = this;

        $(this._$element).off(Event.CLICK, '.' + ClassName.IMG_CONTAINER + ', .' + ClassName.SHOW_ICON).off(Event.CLICK, '.' + ClassName.HIDE_ICON);

        $(this._$element).on(Event.CLICK, '.' + ClassName.IMG_CONTAINER + ', .' + ClassName.SHOW_ICON, function (event) {
          return _this4._show();
        }).on(Event.CLICK, '.' + ClassName.HIDE_ICON, function (event) {
          return _this4._hide();
        });
      }

      // static

    }], [{
      key: '_getRootElement',
      value: function _getRootElement($element) {
        var $parent = null;

        if ($element.hasClass(ClassName.CARD)) {
          $parent = $element;
        }

        if (!$parent) {
          $parent = $element.closest('.' + ClassName.CARD).first();
        }

        return $parent;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(methodName) {
        return this.each(function () {

          var $element = $(this);
          var $rootElement = Card._getRootElement($element);
          var data = $rootElement.data(DATA_KEY);

          if (!data) {
            data = new Card($rootElement);
            $rootElement.data(DATA_KEY, data);
          }

          if (typeof methodName === 'string') {
            if (data[methodName] === undefined) {
              throw new Error(CLASSNAME + ' has no method named "' + methodName + '"');
            }
            data[methodName]();
          }
        });
      }
    }]);

    return Card;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Card._jQueryInterface;
  $.fn[NAME].Constructor = Card;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Card._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Card actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.CARD).card();

  return Card;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): fab.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Fab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'fab';
  var NAME = 'fab';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var DefaultOptions = {
    toggle: false
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    TOGGLE: 'toggle' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    MOUSE_ENTER: 'mouseenter' + EVENT_KEY,
    MOUSE_LEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    FAB: '' + Settings.FWP + CLASSNAME,
    BTN_MAIN: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'btn-main',
    // States
    ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'active',
    CLOSING: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'closing'
  };

  var Transition = {
    SHOW: Settings.ANIMATION_TIME * .5,
    HIDE: Settings.ANIMATION_TIME * .5
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Fab = function () {
    function Fab(element, options) {
      _classCallCheck(this, Fab);

      this._element = element;
      this._options = Utility._setOptions(DefaultOptions, options);

      this._isAnimating = false;
      this._setListeners();
    }

    // getters


    // public

    _createClass(Fab, [{
      key: 'toggle',
      value: function toggle(element) {

        element = element || this._element;

        this._toggle(element);
      }
    }, {
      key: 'show',
      value: function show(element) {

        element = element || this._element;

        this._show(element);
      }
    }, {
      key: 'hide',
      value: function hide(element) {

        element = element || this._element;

        this._hide(element);
      }

      // private

    }, {
      key: '_toggle',
      value: function _toggle(element) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var rootElement = this._getRootElement(element, event);

        if (this._isAnimating) {
          return;
        }

        // Fire toggle event
        var toggleEvent = Utility._triggerEvent(rootElement, Event.TOGGLE);

        // Fire hide / show event based on the state before toggle
        if (rootElement.hasClass(ClassName.ACTIVE)) {

          var hideEvent = Utility._triggerEvent(rootElement, Event.HIDE);
        } else {

          var showEvent = Utility._triggerEvent(rootElement, Event.SHOW);
        }

        // Fire hidden / shown event based on the state after toggle
        // Wait for animation to finish
        if (!rootElement.hasClass(ClassName.ACTIVE)) {

          this._showAnimationEndEvent(rootElement);
        } else {

          this._hideAnimationEndEvent(rootElement);
        }
      }
    }, {
      key: '_show',
      value: function _show(element) {
        var rootElement = this._getRootElement(element);

        if (this._isAnimating || rootElement.hasClass(ClassName.ACTIVE)) {
          return;
        }

        var showEvent = Utility._triggerEvent(rootElement, Event.SHOW);

        this._showAnimationEndEvent(rootElement);
      }
    }, {
      key: '_hide',
      value: function _hide(element) {
        var rootElement = this._getRootElement(element);

        if (this._isAnimating || !rootElement.hasClass(ClassName.ACTIVE)) {
          return;
        }

        var hideEvent = Utility._triggerEvent($(rootElement), Event.HIDE);

        this._hideAnimationEndEvent(rootElement);
      }
    }, {
      key: '_showAnimationEndEvent',
      value: function _showAnimationEndEvent(element) {
        var _this = this;

        element.addClass(ClassName.ACTIVE);
        this._isAnimating = true;

        element.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this._isAnimating = false;
          var shownEvent = Utility._triggerEvent(element, Event.SHOWN);
        }).emulateTransitionEnd(Transition.SHOW);
      }
    }, {
      key: '_hideAnimationEndEvent',
      value: function _hideAnimationEndEvent(element) {
        var _this2 = this;

        element.addClass(ClassName.CLOSING);
        element.removeClass(ClassName.ACTIVE);
        this._isAnimating = true;

        element.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this2._isAnimating = false;
          var hiddenEvent = Utility._triggerEvent(element, Event.HIDDEN);
          element.removeClass(ClassName.CLOSING);
        }).emulateTransitionEnd(Transition.HIDE);
      }
    }, {
      key: '_getRootElement',
      value: function _getRootElement(element) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        element = element || this._element;

        if (event !== null) {
          element = event.currentTarget;
        }

        var parent = null;

        if ($(element).hasClass(ClassName.FAB)) {
          parent = $(element);
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.FAB).first();
        }

        return parent;
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this3 = this;

        // Unbind all events
        $(document).off(Event.CLICK, '.' + ClassName.FAB + ' .' + ClassName.BTN_MAIN).off(Event.MOUSE_ENTER, '.' + ClassName.FAB + ' .' + ClassName.BTN_MAIN).off(Event.MOUSE_LEAVE, '.' + ClassName.FAB);

        if (this._options.toggle) {
          $(document).on(Event.CLICK, '.' + ClassName.FAB + ' .' + ClassName.BTN_MAIN, function (event) {
            return _this3._toggle(event.currentTarget, event);
          });
        }

        if (!this._options.toggle) {
          $(document).on(Event.MOUSE_ENTER, '.' + ClassName.FAB + ' .' + ClassName.BTN_MAIN, function (event) {
            return _this3._show(event.currentTarget, event);
          });

          $(document).on(Event.MOUSE_LEAVE, '.' + ClassName.FAB, function (event) {
            return _this3._hide(event.currentTarget, event);
          });
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(options) {
        return this.each(function () {

          var $element = $(this);
          var _options = Utility._setOptions(DefaultOptions, $(this).data());

          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            $.extend(_options, options);
            $element.removeData(DATA_KEY);
          }

          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Fab(this, _options);
            $element.data(DATA_KEY, data);
          }

          if (typeof options === 'string') {
            if (data[options] === undefined) {
              throw new Error(CLASSNAME + ' has no method named "' + options + '"');
            }
            data[options](this);
          }
        });
      }
    }]);

    return Fab;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Fab._jQueryInterface;
  $.fn[NAME].Constructor = Fab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Fab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Fab actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.FAB).fab();

  return Fab;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): dropdown.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'dropdown';
  var NAME = 'dropdown';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var DefaultOptions = {
    toggle: true,
    position: {
      top: 0,
      right: 'auto',
      bottom: 'auto',
      left: 0
    }
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    TOGGLE: 'toggle' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    UNFOCUS: 'click.unfocus' + EVENT_KEY,
    MOUSE_ENTER: 'mouseenter' + EVENT_KEY,
    MOUSE_LEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    DROPDOWN: '' + Settings.FWP + CLASSNAME,
    LIST: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'list',
    BTN_MAIN: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'btn-main',
    // States
    ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'active',
    CLOSING: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'closing'
  };

  var Transition = {
    SHOW: Settings.ANIMATION_TIME * .5,
    HIDE: Settings.ANIMATION_TIME * .5
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Dropdown);

      this._element = element;
      this._options = options;

      this._isAnimating = false;

      this._setListeners();
    }

    // getters


    // public


    _createClass(Dropdown, [{
      key: 'toggle',
      value: function toggle(element) {

        element = element || this._element;

        this._toggle(element);
      }
    }, {
      key: 'show',
      value: function show(element) {

        element = element || this._element;

        this._show(element);
      }
    }, {
      key: 'hide',
      value: function hide(element) {

        element = element || this._element;

        this._hide(element);
      }

      // private

    }, {
      key: '_toggle',
      value: function _toggle(element) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var rootElement = this._getRootElement(element, event);

        if (this._isAnimating) {
          return;
        }

        // If a a element is used for the toggle button prevent page from redirecting
        if (event) {
          event.preventDefault();
        }

        // Fire toggle event
        var toggleEvent = Utility._triggerEvent(rootElement, Event.TOGGLE);

        // Fire hide / show event based on the state before toggle
        if (rootElement.hasClass(ClassName.ACTIVE)) {

          var hideEvent = Utility._triggerEvent(rootElement, Event.HIDE);
        } else {

          var showEvent = Utility._triggerEvent(rootElement, Event.SHOW);
        }

        // Fire hidden / shown event based on the state after toggle
        // Wait for animation to finish
        if (!rootElement.hasClass(ClassName.ACTIVE)) {

          this._showAnimationEndEvent(rootElement);
        } else {

          this._hideAnimationEndEvent(rootElement);
        }
      }
    }, {
      key: '_show',
      value: function _show(element) {
        var rootElement = this._getRootElement(element);

        if (this._isAnimating || rootElement.hasClass(ClassName.ACTIVE)) {
          return;
        }

        var showEvent = Utility._triggerEvent(rootElement, Event.SHOW);

        this._showAnimationEndEvent(rootElement);
      }
    }, {
      key: '_hide',
      value: function _hide(element) {
        var rootElement = this._getRootElement(element);

        if (this._isAnimating || !rootElement.hasClass(ClassName.ACTIVE)) {
          return;
        }

        var hideEvent = Utility._triggerEvent($(rootElement), Event.HIDE);

        this._hideAnimationEndEvent(rootElement);
      }
    }, {
      key: '_unfocus',
      value: function _unfocus(element) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


        if ($(event.target)[0] === element[0] || $(event.target).closest('.' + ClassName.DROPDOWN)[0] === element[0]) {
          return;
        }

        var hideEvent = Utility._triggerEvent(element, Event.HIDE);

        this._hideAnimationEndEvent(element);
      }
    }, {
      key: '_showAnimationEndEvent',
      value: function _showAnimationEndEvent(element) {
        var _this = this;

        this._applyPosition();

        element.addClass(ClassName.ACTIVE);
        this._isAnimating = true;

        element.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this._isAnimating = false;
          var shownEvent = Utility._triggerEvent($(_this._element), Event.SHOWN);

          // Add unfocus event after show animation is finished
          $(document).off(Event.UNFOCUS).on(Event.UNFOCUS, function (event) {
            return _this._unfocus($(_this._element), event);
          });
        }).emulateTransitionEnd(Transition.SHOW);
      }
    }, {
      key: '_hideAnimationEndEvent',
      value: function _hideAnimationEndEvent(element) {
        var _this2 = this;

        element.addClass(ClassName.CLOSING);
        element.removeClass(ClassName.ACTIVE);
        this._isAnimating = true;

        element.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this2._isAnimating = false;
          var hiddenEvent = Utility._triggerEvent(element, Event.HIDDEN);
          element.removeClass(ClassName.CLOSING);

          // If there are no other dropdowns active unbind click event
          if ($('.' + ClassName.DROPDOWN + '.' + ClassName.ACTIVE).length === 0) {
            $(document).off(Event.UNFOCUS);
          }
        }).emulateTransitionEnd(Transition.HIDE);
      }
    }, {
      key: '_applyPosition',
      value: function _applyPosition() {
        $(this._element).find('.' + ClassName.LIST).css(this._options.position);
      }
    }, {
      key: '_getRootElement',
      value: function _getRootElement(element) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        element = element || this._element;

        if (event !== null) {
          element = event.target;
        }

        var parent = null;

        if ($(element).hasClass(ClassName.DROPDOWN)) {
          parent = $(element);
        }

        if (!parent && $(element).closest('.' + ClassName.DROPDOWN).length !== 0) {
          parent = $(element).closest('.' + ClassName.DROPDOWN).first();
        }

        return parent;
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this3 = this;

        if (this._options.toggle) {
          $(this._element).find('.' + ClassName.BTN_MAIN).off(Event.CLICK).on(Event.CLICK, function (event) {
            return _this3._toggle(event.currentTarget, event);
          });
        }

        if (!this._options.toggle) {
          $(this._element).find('.' + ClassName.BTN_MAIN).off(Event.MOUSE_ENTER).on(Event.MOUSE_ENTER, function (event) {
            return _this3._show(event.currentTarget);
          });

          $(this._element).find('.' + ClassName.DROPDOWN).off(Event.MOUSE_LEAVE).on(Event.MOUSE_LEAVE, function (event) {
            return _this3._hide(event.currentTarget);
          });
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(options) {
        return this.each(function () {

          var $element = $(this);
          var _options = Utility._setOptions(DefaultOptions, $(this).data());

          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            $.extend(_options, options);
            $element.removeData(DATA_KEY);
          }

          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Dropdown(this, _options);
            $element.data(DATA_KEY, data);
          }

          if (typeof options === 'string') {
            if (data[options] === undefined) {
              throw new Error(CLASSNAME + ' has no method named "' + options + '"');
            }
            data[options](this);
          }
        });
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Dropdown actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.DROPDOWN).dropdown();

  return Dropdown;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): collapsible.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Collapsible = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'collapsible';
  var NAME = 'collapsible';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var DefaultOptions = {
    multipleActive: false
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    TOGGLE: 'toggle' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    COLLAPSIBLE: '' + Settings.FWP + CLASSNAME,
    ITEM: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'item',
    TITLE: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'title',
    BODY: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'body',
    // States
    ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'item' + Settings.MODIFIER + 'active',
    CLOSING: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'closing'
  };

  var Transition = {
    SHOW: Settings.ANIMATION_TIME * .5,
    HIDE: Settings.ANIMATION_TIME * .5
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapsible = function () {
    function Collapsible($element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Collapsible);

      this._$element = $element;
      this._options = options;

      this._isAnimating = false;

      this._setListeners();
    }

    // getters


    // public


    _createClass(Collapsible, [{
      key: 'toggle',
      value: function toggle(index) {

        var $item = this._getItem(index);

        this._toggle($item);
      }
    }, {
      key: 'show',
      value: function show(index) {

        var $item = this._getItem(index);

        this._show($item);
      }
    }, {
      key: 'hide',
      value: function hide(index) {

        var $item = this._getItem(index);

        this._hide($item);
      }

      // private

    }, {
      key: '_toggle',
      value: function _toggle($item) {
        var _this = this;

        if (this._isAnimating) {
          return;
        }

        // If multipleActive is false and the current item is going to be set to active: hide all active items
        if (!this._options.multipleActive && !$item.hasClass(ClassName.ACTIVE)) {
          $.each(this._getActiveItems(), function (index, activeItem) {
            _this._hide($(activeItem), false);
          });
        }

        var eventData = this._getEventReturnData($item);

        // Fire toggle event
        var toggleEvent = Utility._triggerEvent(this._$element, Event.TOGGLE, eventData);

        // Fire hide / show event based on the state before toggle
        if ($item.hasClass(ClassName.ACTIVE)) {

          var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE, eventData);
        } else {

          var showEvent = Utility._triggerEvent(this._$element, Event.SHOW, eventData);
        }

        // Fire hidden / shown event based on the state
        if (!$item.hasClass(ClassName.ACTIVE)) {

          this._showAnimationEndEvent($item, eventData);
        } else {

          this._hideAnimationEndEvent($item, eventData);
        }
      }
    }, {
      key: '_show',
      value: function _show($item) {
        var _this2 = this;

        if (this._isAnimating || $item.hasClass(ClassName.ACTIVE)) {
          return;
        }

        // If multipleActive is false hide all active items
        if (!this._options.multipleActive) {
          $.each(this._getActiveItems(), function (index, activeItem) {
            _this2._hide($(activeItem), false);
          });
        }

        var eventData = this._getEventReturnData($item);

        var showEvent = Utility._triggerEvent(this._$element, Event.SHOW, eventData);

        this._showAnimationEndEvent($item, eventData);
      }
    }, {
      key: '_hide',
      value: function _hide($item) {
        var checkIsAnimating = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


        var eventData = this._getEventReturnData($item);

        if (checkIsAnimating && this._isAnimating || !$item.hasClass(ClassName.ACTIVE)) {
          return;
        }

        var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE, eventData);

        this._hideAnimationEndEvent($item, eventData);
      }
    }, {
      key: '_showAnimationEndEvent',
      value: function _showAnimationEndEvent($item, eventData) {
        var _this3 = this;

        $item.find('> .' + ClassName.BODY).slideDown(Transition.SHOW);
        $item.addClass(ClassName.ACTIVE);
        this._isAnimating = true;

        $item.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this3._isAnimating = false;
          var shownEvent = Utility._triggerEvent(_this3._$element, Event.SHOWN, eventData);
        }).emulateTransitionEnd(Transition.SHOW);
      }
    }, {
      key: '_hideAnimationEndEvent',
      value: function _hideAnimationEndEvent($item, eventData) {
        var _this4 = this;

        $item.find('> .' + ClassName.BODY).slideUp(Transition.HIDE);
        $item.addClass(ClassName.CLOSING);
        $item.removeClass(ClassName.ACTIVE);
        this._isAnimating = true;

        $item.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this4._isAnimating = false;
          var hiddenEvent = Utility._triggerEvent(_this4._$element, Event.HIDDEN, eventData);
          $item.removeClass(ClassName.CLOSING);
        }).emulateTransitionEnd(Transition.HIDE);
      }
    }, {
      key: '_getItem',
      value: function _getItem(index) {
        return this._$element.find('.' + ClassName.ITEM).eq(index);
      }
    }, {
      key: '_getItemIndex',
      value: function _getItemIndex($item) {
        return this._$element.find('.' + ClassName.ITEM).index($item);
      }
    }, {
      key: '_getActiveItems',
      value: function _getActiveItems() {
        return this._$element.find('.' + ClassName.ACTIVE);
      }
    }, {
      key: '_getEventReturnData',
      value: function _getEventReturnData($item) {
        var data = {
          index: this._getItemIndex($item),
          item: $item[0]
        };
        return data;
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this5 = this;

        this._$element.find('.' + ClassName.TITLE).off(Event.CLICK).on(Event.CLICK, function (event) {
          return _this5._toggle($(event.currentTarget).parent());
        });
      }

      // static

    }], [{
      key: '_getRootElement',
      value: function _getRootElement($element) {
        var $parent = null;

        if ($element.hasClass(ClassName.COLLAPSIBLE)) {
          $parent = $element;
        }

        if (!$parent && $element.closest('.' + ClassName.COLLAPSIBLE).length !== 0) {
          $parent = $element.closest('.' + ClassName.COLLAPSIBLE).first();
        }

        return $parent;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(methodOrOptions) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        return this.each(function () {

          var $element = $(this);
          var $rootElement = Collapsible._getRootElement($element);
          var _options = Utility._setOptions(DefaultOptions, $rootElement.data());

          if ((typeof methodOrOptions === 'undefined' ? 'undefined' : _typeof(methodOrOptions)) === 'object' || methodOrOptions === undefined) {
            $.extend(_options, methodOrOptions);
            $rootElement.removeData(DATA_KEY);
          }

          var data = $rootElement.data(DATA_KEY);

          if (!data) {
            data = new Collapsible($rootElement, _options);
            $rootElement.data(DATA_KEY, data);
          }

          if (typeof methodOrOptions === 'string' && typeof index === 'number') {
            if (data[methodOrOptions] === undefined) {
              throw new Error(CLASSNAME + ' has no method named "' + options + '"');
            }
            data[methodOrOptions](index);
          }
        });
      }
    }]);

    return Collapsible;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapsible._jQueryInterface;
  $.fn[NAME].Constructor = Collapsible;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapsible._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Collapsible actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.COLLAPSIBLE).collapsible();

  return Collapsible;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): input.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Input = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'input';
  var NAME = 'input';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 200;

  var DefaultOptions = {
    controlType: 'text',
    controlHeight: null
  };

  var Event = {
    FOCUS: 'focus' + EVENT_KEY,
    UNFOCUS: 'focusout' + EVENT_KEY,
    CHANGE: 'change' + EVENT_KEY,
    VALIDATE: 'validate' + EVENT_KEY,
    KEYUP: 'keyup' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    INPUT: '' + Settings.FWP + CLASSNAME,
    CONTROL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'control',
    LABEL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'label',
    HELPER: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'helper',
    BORDER_STATUS: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'border-status',

    // States
    ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'active',
    VALID: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'valid',
    INVALID: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'invalid',

    // Modifiers
    TEXTAREA: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'textarea',
    DATE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'date'
  };

  var Transition = {
    ACTIVE_SHOW: Settings.ANIMATION_TIME * .2
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Input = function () {
    function Input($element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Input);

      this._$element = $element;
      this._options = options;

      this._setup();
      this._setListeners();
    }

    // getters


    // public

    _createClass(Input, [{
      key: 'active',
      value: function active() {

        this._active();
      }
    }, {
      key: 'validate',
      value: function validate() {

        this._validate();
      }
    }, {
      key: 'valid',
      value: function valid() {

        this._valid();
      }
    }, {
      key: 'invalid',
      value: function invalid() {

        this._invalid();
      }

      // private

    }, {
      key: '_focus',
      value: function _focus() {

        this._active();
      }
    }, {
      key: '_unfocus',
      value: function _unfocus() {

        this._validate();
      }
    }, {
      key: '_active',
      value: function _active() {

        var $control = this._$element.find('.' + ClassName.CONTROL);
        var $label = this._$element.find('.' + ClassName.LABEL);

        if (!this._$element.hasClass(ClassName.ACTIVE)) {
          this._$element.addClass(ClassName.ACTIVE);

          $label.one(Settings.MD_ANIMATION_EVENT, function (event) {

            $control.css('border', 'none');
            $label.css('z-index', 1);
          }).emulateTransitionEnd(Transition.ACTIVE_SHOW);
        }
      }
    }, {
      key: '_change',
      value: function _change() {

        var $control = this._$element.find('.' + ClassName.CONTROL);
        var $label = this._$element.find('.' + ClassName.LABEL);

        if (this._options.controlType === 'textarea') {
          $control.css('height', this._options.controlHeight + 'px');
          var lineHeight = parseInt(this._$element.css('line-height'), 10);
          var scrollHeight = $control.prop('scrollHeight');
          $control.css('height', scrollHeight + lineHeight + 'px');
        }
      }
    }, {
      key: '_validate',
      value: function _validate() {

        var $control = this._$element.find('.' + ClassName.CONTROL);

        if (!$control.get(0).validity.valid) {

          this._invalid();
        } else if ($control.val().length > 0) {

          this._valid();
        } else {

          this._noStatus();
        }
      }
    }, {
      key: '_valid',
      value: function _valid() {

        this._$element.removeClass(ClassName.INVALID);
        this._$element.addClass(ClassName.VALID);
        this._setPositionBorderStatus();
      }
    }, {
      key: '_invalid',
      value: function _invalid() {

        this._$element.removeClass(ClassName.VALID);
        this._$element.addClass(ClassName.INVALID);
        this._setPositionBorderStatus();
      }
    }, {
      key: '_noStatus',
      value: function _noStatus() {

        var $control = this._$element.find('.' + ClassName.CONTROL);
        var $label = this._$element.find('.' + ClassName.LABEL);

        this._$element.removeClass(ClassName.ACTIVE + ' ' + ClassName.VALID + ' ' + ClassName.INVALID);
        $control.css('border', '');
        $label.css('z-index', '');
        this._setPositionBorderStatus();
      }
    }, {
      key: '_appendBorderStatus',
      value: function _appendBorderStatus() {

        if (this._$element.find('.' + ClassName.BORDER_STATUS).length === 0) {
          var $borderStatus = $('<div>').addClass(ClassName.BORDER_STATUS);
          this._$element.append($borderStatus);
          this._setPositionBorderStatus();
        }
      }
    }, {
      key: '_setPositionBorderStatus',
      value: function _setPositionBorderStatus() {

        var $borderStatus = this._$element.find('.' + ClassName.BORDER_STATUS);

        if ($borderStatus) {
          var $helper = this._$element.find('.' + ClassName.HELPER);
          var inputPaddingBottom = parseInt(this._$element.css('padding-bottom'), 10);
          var helperHeight = 0;
          if ($helper.length !== 0) {
            helperHeight = $helper.outerHeight(true);
          }

          $borderStatus.css('bottom', inputPaddingBottom + helperHeight + 'px');
        }
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this = this;

        $(this._$element).off(Event.FOCUS, '.' + ClassName.CONTROL).off(Event.UNFOCUS, '.' + ClassName.CONTROL).off(Event.CHANGE, '.' + ClassName.CONTROL).off(Event.KEYUP + ' ' + Event.KEYDOWN + ' ', '.' + ClassName.CONTROL);

        $(this._$element).on(Event.FOCUS, '.' + ClassName.CONTROL, function (e) {
          return _this._focus();
        }).on(Event.UNFOCUS, '.' + ClassName.CONTROL, function (e) {
          return _this._unfocus();
        }).on(Event.CHANGE, '.' + ClassName.CONTROL, function (e) {
          return _this._change();
        });

        if (this._options.controlType === 'textarea') {

          $(this._$element).on(Event.KEYUP + ' ' + Event.KEYDOWN, '.' + ClassName.CONTROL, function (e) {
            return _this._change();
          });
        }
      }
    }, {
      key: '_setup',
      value: function _setup() {

        // Check if the input has textarea or is type  number
        var $textarea = this._$element.find('textarea');
        var $number = this._$element.find('[type="number"]');
        var $date = this._$element.find('[type="datetime-local"], [type="date"], [type="month"], [type="week"], [type="time"]');

        if ($textarea.length !== 0) {
          this._$element.addClass(ClassName.TEXTAREA);
          this._options.controlType = 'textarea';
          this._options.controlHeight = parseInt(this._$element.css('height'), 10);
        } else if ($number.length !== 0) {
          this._options.controlType = 'number';
        } else if ($date.length !== 0) {
          this._$element.addClass(ClassName.DATE);
          this._options.controlType = 'date';
        }
        if ($.inArray(this._options.controlType, ['text', 'textarea', 'number', 'date']) !== -1) {
          this._appendBorderStatus();
        }
      }

      // static

    }], [{
      key: '_getRootElement',
      value: function _getRootElement($element) {
        var $parent = null;

        if ($element.hasClass(ClassName.INPUT)) {
          $parent = $element;
        }

        if (!$parent) {
          $parent = $element.closest('.' + ClassName.INPUT).first();
        }

        return $parent;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(methodOrOptions) {
        return this.each(function () {

          var $element = $(this);
          var $rootElement = Input._getRootElement($element);
          var _options = Utility._setOptions(DefaultOptions, $rootElement.data());

          if ((typeof methodOrOptions === 'undefined' ? 'undefined' : _typeof(methodOrOptions)) === 'object') {
            $.extend(_options, methodOrOptions);
            $rootElement.removeData(DATA_KEY);
          }

          var data = $rootElement.data(DATA_KEY);

          if (!data) {
            data = new Input($rootElement, _options);
            $rootElement.data(DATA_KEY, data);
          }

          if (typeof methodOrOptions === 'string') {
            if (data[methodOrOptions] === undefined) {
              throw new Error(CLASSNAME + ' has no method named "' + methodName + '"');
            }
            data[methodOrOptions]();
          }
        });
      }
    }]);

    return Input;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Input._jQueryInterface;
  $.fn[NAME].Constructor = Input;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Input._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Input actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.INPUT).input();

  return Input;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): select.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Select = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'select';
  var NAME = 'select';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 200;

  var DefaultOptions = {
    multiple: false
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    TOGGLE: 'toggle' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CHANGE: 'change' + EVENT_KEY,
    UNFOCUS: 'click.unfocus' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    SELECT: '' + Settings.FWP + CLASSNAME,
    CONTROL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'control',
    ITEM: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'item',
    ITEM_ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'item' + Settings.MODIFIER + 'active',
    ITEM_DISABLED: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'item' + Settings.MODIFIER + 'disabled',
    ITEM_GROUP: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'item' + Settings.MODIFIER + 'group',
    ITEM_GROUP_LABEL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'item' + Settings.MODIFIER + 'group-label',
    LABEL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'label',
    TOGGLE: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'toggle',

    // States
    ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'active'
  };

  var Transition = {
    SHOW: Settings.ANIMATION_TIME * .5,
    HIDE: Settings.ANIMATION_TIME * .5
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Select = function () {
    function Select($element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Select);

      this._$element = $element;
      this._options = options;
      this._isAnimating = false;

      this._setup();
      this._setListeners();
    }

    // getters


    // public

    _createClass(Select, [{
      key: 'show',
      value: function show() {

        this._show();
      }
    }, {
      key: 'hide',
      value: function hide() {

        this._hide();
      }

      // private

    }, {
      key: '_show',
      value: function _show() {

        if (this._isAnimating || this._$element.hasClass(ClassName.ACTIVE)) {
          return;
        }

        var showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

        this._showAnimationEndEvent();
      }
    }, {
      key: '_hide',
      value: function _hide() {

        if (this._isAnimating || !this._$element.hasClass(ClassName.ACTIVE)) {
          return;
        }

        var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

        this._hideAnimationEndEvent();
      }
    }, {
      key: '_optionClick',
      value: function _optionClick(e) {

        var $nativeSelect = this._$element.find('select');
        var $toggle = this._$element.find('.' + ClassName.TOGGLE);
        var $options = this._$element.find('.' + ClassName.ITEM);
        var $activeOptions = this._$element.find('.' + ClassName.ITEM_ACTIVE);
        var $option = $(e.currentTarget);

        if ($option.is('.' + ClassName.ITEM_GROUP_LABEL + ', .' + ClassName.ITEM_DISABLED)) {
          return;
        }

        if ($(e.target).is('select')) {
          e.stopPropagation();
        }

        if (!this._options.multiple) {

          $activeOptions.removeClass(ClassName.ITEM_ACTIVE);
          $option.addClass(ClassName.ITEM_ACTIVE);

          $nativeSelect.val($option.data('value'));

          Utility._triggerEvent(this._$element, Event.CHANGE, { value: $option.data('value') });

          $toggle.text($option.text());

          this._hide();
        } else {

          var multiVal = [];
          var toggleText = '';

          $.each($activeOptions, function (index, activeOption) {

            var $activeOption = $(activeOption);
            multiVal.push($activeOption.data('value'));
          });

          // New item deselected
          if ($option.hasClass(ClassName.ITEM_ACTIVE)) {

            $option.removeClass(ClassName.ITEM_ACTIVE);

            toggleText = this._$element.find('.' + ClassName.ITEM_ACTIVE).last().text();

            multiVal.splice($.inArray($option.data('value'), multiVal), 1);

            // Item selected
          } else {

            $option.addClass(ClassName.ITEM_ACTIVE);

            toggleText = $option.text();

            multiVal.push($option.data('value'));
          }

          $toggle.text(toggleText);

          Utility._triggerEvent(this._$element, Event.CHANGE, { value: multiVal });
        }
      }
    }, {
      key: '_unfocus',
      value: function _unfocus(event) {

        if (this._isAnimating || $(event.target)[0] === this._$element[0] || $(event.target).closest('.' + ClassName.SELECT)[0] === this._$element[0]) {
          return;
        }

        var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

        this._hideAnimationEndEvent();
      }
    }, {
      key: '_showAnimationEndEvent',
      value: function _showAnimationEndEvent() {
        var _this = this;

        var $control = this._$element.find('.' + ClassName.CONTROL);

        this._isAnimating = true;
        $control.slideDown(Transition.SHOW);
        this._$element.addClass(ClassName.ACTIVE);

        $control.one(Settings.MD_ANIMATION_EVENT, function () {

          _this._isAnimating = false;
          var shownEvent = Utility._triggerEvent(_this._$element, Event.SHOWN);

          // Add unfocus event after show animation is finished
          $(document).off(Event.UNFOCUS).on(Event.UNFOCUS, function (event) {
            return _this._unfocus(event);
          });
        }).emulateTransitionEnd(Transition.SHOW);
      }
    }, {
      key: '_hideAnimationEndEvent',
      value: function _hideAnimationEndEvent() {
        var _this2 = this;

        var $control = this._$element.find('.' + ClassName.CONTROL);

        this._isAnimating = true;
        $control.slideUp(Transition.HIDE);
        this._$element.removeClass(ClassName.ACTIVE);

        this._$element.one(Settings.MD_ANIMATION_EVENT, function (e) {

          _this2._isAnimating = false;
          var hiddenEvent = Utility._triggerEvent(_this2._$element, Event.HIDDEN);

          // If there are no other selects active unbind click event
          if ($('.' + ClassName.SELECT + '.' + ClassName.ACTIVE).length === 0) {
            $(document).off(Event.UNFOCUS);
          }
        }).emulateTransitionEnd(Transition.HIDE);
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this3 = this;

        $(this._$element).off(Event.CLICK, '.' + ClassName.TOGGLE).off(Event.CLICK, '.' + ClassName.ITEM);

        $(this._$element).on(Event.CLICK, '.' + ClassName.TOGGLE, function (e) {
          return _this3._show();
        }).on(Event.CLICK, '.' + ClassName.ITEM, function (e) {
          return _this3._optionClick(e);
        });
      }
    }, {
      key: '_setup',
      value: function _setup() {
        var _this4 = this;

        var $select = this._$element.find('select');

        if ($select.is('[multiple]')) {
          this._options.multiple = true;
        }

        var selectedText = $select.find(':selected').text();

        var $toggle = $('<span>').text(selectedText).addClass(ClassName.TOGGLE);

        var $control = $('<ul>').addClass(ClassName.CONTROL);

        $.each($select.children(), function (index, groupOrOption) {
          var $groupOrOption = $(groupOrOption);

          $control.append(_this4._buildItem($groupOrOption));

          if ($groupOrOption.prop('tagName') === 'OPTGROUP') {

            $.each($groupOrOption.children(), function (index, option) {

              var $option = $(option);
              $control.append(_this4._buildItem($option));
            });
          }
        });

        this._$element.append($toggle);
        this._$element.append($control);
      }
    }, {
      key: '_buildItem',
      value: function _buildItem($groupOrOption) {

        var $item = null;

        if ($groupOrOption.prop('tagName') === 'OPTGROUP') {

          $item = $('<li>').text($groupOrOption.prop('label')).addClass(ClassName.ITEM + ' ' + ClassName.ITEM_GROUP_LABEL);
        } else {
          var itemClassName = ClassName.ITEM;

          if ($groupOrOption.parent().prop('tagName') === 'OPTGROUP') {
            itemClassName += ' ' + ClassName.ITEM_GROUP;
          }
          if ($groupOrOption.is(':disabled')) {
            itemClassName += ' ' + ClassName.ITEM_DISABLED;
          }

          $item = $('<li>').text($groupOrOption.text()).data('value', $groupOrOption.val()).addClass(itemClassName);
        }

        return $item;
      }

      // static

    }], [{
      key: '_getRootElement',
      value: function _getRootElement($element) {
        var $parent = null;

        if ($element.hasClass(ClassName.SELECT)) {
          $parent = $element;
        }

        if (!$parent) {
          $parent = $element.closest('.' + ClassName.SELECT).first();
        }

        return $parent;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(methodOrOptions) {
        return this.each(function () {

          var $element = $(this);
          var $rootElement = Select._getRootElement($element);
          var _options = Utility._setOptions(DefaultOptions, $rootElement.data());

          if ((typeof methodOrOptions === 'undefined' ? 'undefined' : _typeof(methodOrOptions)) === 'object') {
            $.extend(_options, methodOrOptions);
            $rootElement.removeData(DATA_KEY);
          }

          var data = $rootElement.data(DATA_KEY);

          if (!data) {
            data = new Select($rootElement, _options);
            $rootElement.data(DATA_KEY, data);
          }

          if (typeof methodOrOptions === 'string') {
            if (data[methodOrOptions] === undefined) {
              throw new Error(CLASSNAME + ' has no method named "' + methodName + '"');
            }
            data[methodOrOptions]();
          }
        });
      }
    }]);

    return Select;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Select._jQueryInterface;
  $.fn[NAME].Constructor = Select;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Select._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Select actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.SELECT).select();

  return Select;
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): range.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Range = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'range';
  var NAME = 'range';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 200;

  var Event = {
    MOUSE_DOWN: 'mousedown' + EVENT_KEY,
    MOUSE_UP: 'mouseup' + EVENT_KEY,
    MOUSE_MOVE: 'mousemove' + EVENT_KEY,
    MOUSE_OUT: 'mouseout' + EVENT_KEY,
    TOUCH_START: 'touchstart' + EVENT_KEY,
    TOUCH_END: 'touchend' + EVENT_KEY,
    TOUCH_MOVE: 'touchmove' + EVENT_KEY,
    TOUCH_LEAVE: 'touchleave' + EVENT_KEY,
    INPUT: 'input' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    RANGE: '' + Settings.FWP + CLASSNAME,
    CONTROL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'control',
    LABEL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'label',
    VALUE: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'value',
    VALUE_LABEL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'value-label',

    // States
    ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'active',
    CLOSING: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'closing',

    // Modifier
    RANGE_LABEL: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'label'
  };

  var Transition = {
    SHOW: Settings.ANIMATION_TIME * .2,
    HIDE: Settings.ANIMATION_TIME * .2
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Range = function () {
    function Range($element) {
      _classCallCheck(this, Range);

      this._$element = $element;

      this._setup();
      this._setListeners();
    }

    // getters


    // public


    // private

    _createClass(Range, [{
      key: '_drag',
      value: function _drag(e) {

        this._position(e);
        this._updateValueLabel();
      }
    }, {
      key: '_focus',
      value: function _focus() {

        this._$element.addClass(ClassName.ACTIVE);

        this._updateValueLabel();
      }
    }, {
      key: '_unfocus',
      value: function _unfocus() {}
    }, {
      key: '_leave',
      value: function _leave() {
        var _this = this;

        this._$element.removeClass(ClassName.ACTIVE);
        this._$element.addClass(ClassName.CLOSING);

        this._$element.one(Settings.MD_ANIMATION_EVENT, function () {

          _this._$element.removeClass(ClassName.CLOSING);
        }).emulateTransitionEnd(Transition.HIDE);
      }
    }, {
      key: '_position',
      value: function _position(e) {

        var $control = this._$element.find('.' + ClassName.CONTROL);
        var $valueLabel = this._$element.find('.' + ClassName.VALUE_LABEL);

        var width = $control.width();
        var max = parseFloat($control.attr('max'));
        var min = parseFloat($control.attr('min'));
        var percent = (parseFloat($control.val()) - min) / (max - min);
        var offset = percent * width;

        $valueLabel.css('left', offset + 'px');
        $valueLabel.css('margin-left', '-' + (.5 + percent) + 'rem');
      }
    }, {
      key: '_updateValueLabel',
      value: function _updateValueLabel() {

        var $control = this._$element.find('.' + ClassName.CONTROL);
        var $label = this._$element.find('.' + ClassName.VALUE);

        var value = $control.val();

        $label.text(value);
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this2 = this;

        $(this._$element).off(Event.MOUSE_DOWN + ' ' + Event.TOUCH_START, '.' + ClassName.CONTROL).off(Event.MOUSE_MOVE + ' ' + Event.TOUCH_MOVE, '.' + ClassName.CONTROL).off(Event.MOUSE_UP + ' ' + Event.TOUCH_END, '.' + ClassName.CONTROL).off(Event.MOUSE_OUT + ' ' + Event.TOUCH_LEAVE, '.' + ClassName.CONTROL);

        $(this._$element).on(Event.MOUSE_DOWN + ' ' + Event.TOUCH_START, '.' + ClassName.CONTROL, function (e) {
          return _this2._focus();
        }).on(Event.INPUT + ' ' + Event.MOUSE_MOVE + ' ' + Event.TOUCH_MOVE, '.' + ClassName.CONTROL, function (e) {
          return _this2._drag(e);
        }).on(Event.MOUSE_UP + ' ' + Event.TOUCH_END, '.' + ClassName.CONTROL, function (e) {
          return _this2._unfocus();
        }).on(Event.MOUSE_OUT + ' ' + Event.TOUCH_LEAVE, '.' + ClassName.CONTROL, function (e) {
          return _this2._leave();
        });
      }
    }, {
      key: '_setup',
      value: function _setup() {

        var $valueLabel = $('<span>').addClass(ClassName.VALUE_LABEL);

        var $value = $('<span>').addClass(ClassName.VALUE);

        $valueLabel.append($value);

        this._$element.append($valueLabel);
      }

      // static

    }], [{
      key: '_getRootElement',
      value: function _getRootElement($element) {
        var $parent = null;

        if ($element.hasClass(ClassName.RANGE)) {
          $parent = $element;
        }

        if (!$parent) {
          $parent = $element.closest('.' + ClassName.RANGE).first();
        }

        return $parent;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface() {
        return this.each(function () {

          var $element = $(this);
          var $rootElement = Range._getRootElement($element);

          var data = $rootElement.data(DATA_KEY);

          if (!data) {
            data = new Range($rootElement);
            $rootElement.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return Range;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Range._jQueryInterface;
  $.fn[NAME].Constructor = Range;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Range._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Range actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.RANGE + '.' + ClassName.RANGE_LABEL).range();

  return Range;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): layout.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

var Layout = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var CLASSNAME = 'layout';
  var NAME = 'layout';
  var DATA_KEY = Settings.ABBR + '.' + CLASSNAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var DefaultOptions = {
    closeOnLinkClicked: true,
    multipleCollapsibleActive: false,
    drawerClipped: false,
    toolbarWaterfall: false
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    TOGGLE: 'toggle' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    MOUSE_ENTER: 'mouseenter' + EVENT_KEY,
    MOUSE_LEAVE: 'mouseleave' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY
  };

  var ClassName = {
    // Selecting
    LAYOUT: '' + Settings.FWP + CLASSNAME,
    NAV: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'nav',
    DRAWER: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'drawer',
    TOOLBAR: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'toolbar',
    OVERLAY: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'overlay',
    MAIN: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'main',
    TOGGLE_DRAWER: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'toggle-drawer',

    DRAWER_LINK: Settings.FWP + 'drawer' + Settings.ELEMENT + 'link',
    // States
    DRAWER_ACTIVE: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'active',
    DRAWER_CLOSING: '' + Settings.FWP + CLASSNAME + Settings.MODIFIER + 'closing',
    DRAWER_ITEM_ACTIVE: Settings.FWP + 'drawer' + Settings.ELEMENT + 'item' + Settings.MODIFIER + 'active',

    // Modifiers
    NAV_CLIPPED: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'nav' + Settings.MODIFIER + 'clipped',
    NAV_WATERFALL: '' + Settings.FWP + CLASSNAME + Settings.ELEMENT + 'nav' + Settings.MODIFIER + 'waterfall',

    // Collapsible
    // Selecting
    COLLAPSIBLE_ITEM: Settings.FWP + 'drawer' + Settings.ELEMENT + 'collapsible-item',
    COLLAPSIBLE_TITLE: Settings.FWP + 'drawer' + Settings.ELEMENT + 'collapsible-title',
    COLLAPSIBLE_BODY: Settings.FWP + 'drawer' + Settings.ELEMENT + 'collapsible-body',
    // States
    COLLAPSIBLE_ACTIVE: Settings.FWP + 'drawer' + Settings.ELEMENT + 'collapsible-item' + Settings.MODIFIER + 'active',
    COLLAPSIBLE_CLOSING: Settings.FWP + 'drawer' + Settings.MODIFIER + 'closing'
  };

  var Transition = {
    SHOW: Settings.ANIMATION_TIME * .3,
    HIDE: Settings.ANIMATION_TIME * .3
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Layout = function () {
    function Layout($element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Layout);

      this._$element = $element;
      this._options = options;

      // Check if the NAV_CLIPPED or NAV_WATERFALL class is added to the nav
      var $nav = this._$element.find('.' + ClassName.NAV);
      if ($nav.hasClass(ClassName.NAV_CLIPPED)) {
        this._options.drawerClipped = true;
      }
      if ($nav.hasClass(ClassName.NAV_WATERFALL)) {
        this._options.toolbarWaterfall = true;
      }

      this._isAnimating = false;

      this._setListeners();
      this._scroll();
    }

    // //////
    // getters
    // //////


    // //////
    // public
    // //////


    _createClass(Layout, [{
      key: 'toggle',
      value: function toggle() {

        this._toggle();
      }
    }, {
      key: 'show',
      value: function show() {

        this._show();
      }
    }, {
      key: 'hide',
      value: function hide() {

        this._hide();
      }

      // //////
      // private
      // //////

      // //////
      // Drawer methods
      // //////

    }, {
      key: '_toggle',
      value: function _toggle() {

        if (this._isAnimating) {
          return;
        }

        // Fire toggle event
        var toggleEvent = Utility._triggerEvent(this._$element, Event.TOGGLE);

        // Fire hide / show event based on the state before toggle
        if (this._$element.hasClass(ClassName.DRAWER_ACTIVE)) {

          var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);
        } else {

          var showEvent = Utility._triggerEvent(this._$element, Event.SHOW);
        }

        // Fire hidden / shown event based on the state after toggle
        // Wait for animation to finish
        if (!this._$element.hasClass(ClassName.DRAWER_ACTIVE)) {

          this._showAnimationEndEvent();
        } else {

          this._hideAnimationEndEvent();
        }
      }
    }, {
      key: '_show',
      value: function _show() {

        if (this._isAnimating || this._$element.hasClass(ClassName.DRAWER_ACTIVE)) {
          return;
        }

        var showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

        this._showAnimationEndEvent();
      }
    }, {
      key: '_hide',
      value: function _hide() {

        if (this._isAnimating || !this._$element.hasClass(ClassName.DRAWER_ACTIVE)) {
          return;
        }

        var hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

        this._hideAnimationEndEvent();
      }
    }, {
      key: '_scroll',
      value: function _scroll() {

        var drawerTop = 0;
        var $drawer = this._$element.find('.' + ClassName.DRAWER);
        var $toolbar = this._$element.find('.' + ClassName.TOOLBAR);
        var $main = this._$element.find('.' + ClassName.MAIN);
        var fromTop = $(document).scrollTop();
        var toolbarHeight = $toolbar.outerHeight();

        $drawer.css('top', 0);
        $main.css('margin-top', 0);

        if (this._options.toolbarWaterfall === true) {
          $main.css('margin-top', toolbarHeight + 'px');
          if (fromTop > 0) {
            $toolbar.removeClass(Settings.FWP + 'shadow-none');
            $toolbar.addClass(Settings.FWP + 'shadow-xs');
          } else {
            $toolbar.addClass(Settings.FWP + 'shadow-none');
            $toolbar.removeClass(Settings.FWP + 'shadow-xs');
          }
          if (this._options.drawerClipped === true) {
            $drawer.css('top', toolbarHeight + 'px');
          }
        } else if (this._options.drawerClipped === true) {
          var difference = toolbarHeight - fromTop;
          if (difference > 0) {
            drawerTop = difference;
          }
          $drawer.css('top', drawerTop + 'px');
        }
      }
    }, {
      key: '_showAnimationEndEvent',
      value: function _showAnimationEndEvent() {
        var _this = this;

        this._$element.addClass(ClassName.DRAWER_ACTIVE);
        this._isAnimating = true;

        this._$element.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this._isAnimating = false;
          var shownEvent = Utility._triggerEvent(_this._$element, Event.SHOWN);
        }).emulateTransitionEnd(Transition.SHOW);
      }
    }, {
      key: '_hideAnimationEndEvent',
      value: function _hideAnimationEndEvent() {
        var _this2 = this;

        this._$element.addClass(ClassName.DRAWER_CLOSING);
        this._$element.removeClass(ClassName.DRAWER_ACTIVE);
        this._isAnimating = true;

        this._$element.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this2._isAnimating = false;
          var hiddenEvent = Utility._triggerEvent(_this2._$element, Event.HIDDEN);
          _this2._$element.removeClass(ClassName.DRAWER_CLOSING);
        }).emulateTransitionEnd(Transition.HIDE);
      }
    }, {
      key: '_linkClick',
      value: function _linkClick($item) {
        this._itemToggle($item);

        if ($item.hasClass(ClassName.COLLAPSIBLE_ITEM)) {
          this._collapsibleToggle($item);
          return;
        }

        if (this._options.closeOnLinkClicked) {
          this._hide();
          return;
        }
      }

      // //////
      // Item methods
      // //////

    }, {
      key: '_itemToggle',
      value: function _itemToggle($item) {

        // Remove all active classes
        $.each(this._$element.find('.' + ClassName.DRAWER_ITEM_ACTIVE), function (index, activeItem) {
          $(activeItem).removeClass(ClassName.DRAWER_ITEM_ACTIVE);
        });

        // Add active class to parent and current item
        $item.addClass(ClassName.DRAWER_ITEM_ACTIVE);
        $item.closest('.' + ClassName.COLLAPSIBLE_ITEM).addClass(ClassName.DRAWER_ITEM_ACTIVE);
      }

      // //////
      // Dropdown methods
      // //////

    }, {
      key: '_collapsibleToggle',
      value: function _collapsibleToggle($item) {
        var _this3 = this;

        if (this._isAnimating) {
          return;
        }

        // If multipleActive is false and the current item is going to be set to active: hide all active items
        if (!this._options.multipleCollapsibleActive && !$item.hasClass(ClassName.COLLAPSIBLE_ACTIVE)) {
          $.each(this._$element.find('.' + ClassName.COLLAPSIBLE_ACTIVE), function (index, activeItem) {
            _this3._collapsibleHide($(activeItem), false);
          });
        }

        // Fire hidden / shown event based on the state
        if (!$item.hasClass(ClassName.COLLAPSIBLE_ACTIVE)) {

          this._collapsibleShowAnimationEndEvent($item);
        } else {

          this._collapsibleHideAnimationEndEvent($item);
        }
      }
    }, {
      key: '_collapsibleHide',
      value: function _collapsibleHide($item) {
        var checkIsAnimating = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


        if (checkIsAnimating && this._isAnimating || !$item.hasClass(ClassName.COLLAPSIBLE_ACTIVE)) {
          return;
        }

        this._collapsibleHideAnimationEndEvent($item);
      }
    }, {
      key: '_collapsibleShowAnimationEndEvent',
      value: function _collapsibleShowAnimationEndEvent($item) {
        var _this4 = this;

        $item.find('> .' + ClassName.COLLAPSIBLE_BODY).slideDown(Transition.SHOW);
        $item.addClass(ClassName.COLLAPSIBLE_ACTIVE);
        this._isAnimating = true;

        $item.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this4._isAnimating = false;
        }).emulateTransitionEnd(Transition.SHOW);
      }
    }, {
      key: '_collapsibleHideAnimationEndEvent',
      value: function _collapsibleHideAnimationEndEvent($item) {
        var _this5 = this;

        $item.find('> .' + ClassName.COLLAPSIBLE_BODY).slideUp(Transition.HIDE);
        $item.addClass(ClassName.COLLAPSIBLE_CLOSING);
        $item.removeClass(ClassName.COLLAPSIBLE_ACTIVE);
        this._isAnimating = true;

        $item.one(Settings.MD_ANIMATION_EVENT, function (event) {

          _this5._isAnimating = false;
          $item.removeClass(ClassName.COLLAPSIBLE_CLOSING);
        }).emulateTransitionEnd(Transition.HIDE);
      }

      // //////
      // Listeners
      // //////

    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this6 = this;

        // Unbind all events
        $(document).off(Event.CLICK, '.' + ClassName.TOGGLE_DRAWER).off(Event.CLICK, '.' + ClassName.OVERLAY).off(Event.CLICK, '.' + ClassName.DRAWER_LINK).off(Event.SCROLL);

        $(document).on(Event.CLICK, '.' + ClassName.TOGGLE_DRAWER, function (event) {
          return _this6._toggle();
        });
        $(document).on(Event.CLICK, '.' + ClassName.OVERLAY, function (event) {
          return _this6._hide();
        });
        if (this._options.drawerClipped || this._options.toolbarWaterfall) {
          $(document).on(Event.SCROLL, Utility._debounce(function (event) {
            return _this6._scroll();
          }, 50));
        }
        $(document).on(Event.CLICK, '.' + ClassName.DRAWER_LINK, function (event) {
          return _this6._linkClick($(event.currentTarget).parent());
        });
      }

      // //////
      // static
      // //////

    }], [{
      key: '_getRootElement',
      value: function _getRootElement($element) {

        var $parent = null;

        if ($element.hasClass(ClassName.LAYOUT)) {
          $parent = $element;
        }

        if (!$parent) {
          $parent = $element.closest('.' + ClassName.LAYOUT).first();
        }

        return $parent;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(methodOrOptions) {
        return this.each(function () {

          var $element = $(this);
          var $rootElement = Layout._getRootElement($element);
          var _options = Utility._setOptions(DefaultOptions, $rootElement.data());

          if ((typeof methodOrOptions === 'undefined' ? 'undefined' : _typeof(methodOrOptions)) === 'object' || methodOrOptions === undefined) {
            $.extend(_options, methodOrOptions);
            $rootElement.removeData(DATA_KEY);
          }

          var data = $rootElement.data(DATA_KEY);

          if (!data) {
            data = new Layout($rootElement, _options);
            $rootElement.data(DATA_KEY, data);
          }

          if (typeof methodOrOptions === 'string') {
            if (data[methodOrOptions] === undefined) {
              throw new Error(CLASSNAME + ' has no method named "' + methodOrOptions + '"');
            }
            data[methodOrOptions]();
          }
        });
      }
    }]);

    return Layout;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Layout._jQueryInterface;
  $.fn[NAME].Constructor = Layout;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Layout._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Layout actions
   * ------------------------------------------------------------------------
   */

  $('.' + ClassName.LAYOUT).layout();

  return Layout;
}(jQuery);