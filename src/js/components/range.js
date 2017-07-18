/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): range.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Range = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'range';
  const NAME = 'range';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const TRANSITION_DURATION = 200;

  const Event = {
    MOUSE_DOWN: `mousedown${EVENT_KEY}`,
    MOUSE_UP: `mouseup${EVENT_KEY}`,
    MOUSE_MOVE: `mousemove${EVENT_KEY}`,
    MOUSE_OUT: `mouseout${EVENT_KEY}`,
    TOUCH_START: `touchstart${EVENT_KEY}`,
    TOUCH_END: `touchend${EVENT_KEY}`,
    TOUCH_MOVE: `touchmove${EVENT_KEY}`,
    TOUCH_LEAVE: `touchleave${EVENT_KEY}`,
    INPUT: `input${EVENT_KEY}`
  };

  const ClassName = {
    // Selecting
    RANGE: `${Settings.FWP}${CLASSNAME}`,
    CONTROL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}control`,
    LABEL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}label`,
    VALUE: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}value`,
    VALUE_LABEL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}value-label`,

    // States
    ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}active`,
    CLOSING: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}closing`,

    // Modifier
    RANGE_LABEL: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}label`
  };

  const Transition = {
    SHOW: Settings.ANIMATION_TIME * .2,
    HIDE: Settings.ANIMATION_TIME * .2,
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Range {

    constructor($element) {
      this._$element = $element;

      this._setup();
      this._setListeners();
    }


    // getters


    // public


    // private

    _drag(e) {

      this._position(e);
      this._updateValueLabel();

    }

    _focus() {

      this._$element.addClass(ClassName.ACTIVE);

      this._updateValueLabel();


    }

    _unfocus() {

    }

    _leave() {

      this._$element.removeClass(ClassName.ACTIVE);
      this._$element.addClass(ClassName.CLOSING);

      this._$element.one(Settings.MD_ANIMATION_EVENT, () => {

        this._$element.removeClass(ClassName.CLOSING);

      }).emulateTransitionEnd(Transition.HIDE);

    }

    _position(e) {

      let $control = this._$element.find(`.${ClassName.CONTROL}`);
      let $valueLabel = this._$element.find(`.${ClassName.VALUE_LABEL}`);

      let width = $control.width();
      let max = parseFloat($control.attr('max'));
      let min = parseFloat($control.attr('min'));
      let percent = (parseFloat($control.val()) - min) / (max - min);
      let offset = percent * width;

      $valueLabel.css('left', `${offset}px`);
      $valueLabel.css('margin-left', `-${.5 + percent}rem`);


    }

    _updateValueLabel() {

      let $control = this._$element.find(`.${ClassName.CONTROL}`);
      let $label = this._$element.find(`.${ClassName.VALUE}`);

      let value = $control.val();

      $label.text(value);

    }

    _setListeners() {

      $(this._$element).off(
        `${Event.MOUSE_DOWN} ${Event.TOUCH_START}`,
        `.${ClassName.CONTROL}`
      ).off(
        `${Event.MOUSE_MOVE} ${Event.TOUCH_MOVE}`,
        `.${ClassName.CONTROL}`
      ).off(
        `${Event.MOUSE_UP} ${Event.TOUCH_END}`,
        `.${ClassName.CONTROL}`
      ).off(
        `${Event.MOUSE_OUT} ${Event.TOUCH_LEAVE}`,
        `.${ClassName.CONTROL}`
      );

      $(this._$element).on(
        `${Event.MOUSE_DOWN} ${Event.TOUCH_START}`,
        `.${ClassName.CONTROL}`,
        (e) => this._focus()
      ).on(
        `${Event.INPUT} ${Event.MOUSE_MOVE} ${Event.TOUCH_MOVE}`,
        `.${ClassName.CONTROL}`,
        (e) => this._drag(e)
      ).on(
        `${Event.MOUSE_UP} ${Event.TOUCH_END}`,
        `.${ClassName.CONTROL}`,
        (e) => this._unfocus()
      ).on(
        `${Event.MOUSE_OUT} ${Event.TOUCH_LEAVE}`,
        `.${ClassName.CONTROL}`,
        (e) => this._leave()
      );

    }

    _setup() {

      let $valueLabel = $('<span>')
        .addClass(ClassName.VALUE_LABEL);

      let $value = $('<span>')
        .addClass(ClassName.VALUE);

      $valueLabel.append($value);

      this._$element.append($valueLabel);

    }


    // static
    static _getRootElement($element) {
      let $parent = null;

      if ($element.hasClass(ClassName.RANGE)) {
        $parent = $element;
      }

      if (!$parent) {
        $parent = $element.closest(`.${ClassName.RANGE}`).first();
      }

      return $parent;
    }

    static _jQueryInterface() {
      return this.each(function () {

        let $element = $(this);
        let $rootElement = Range._getRootElement($element);

        let data = $rootElement.data(DATA_KEY);

        if (!data) {
          data = new Range($rootElement);
          $rootElement.data(DATA_KEY, data);
        }

      });
    }

  }


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Range._jQueryInterface;
  $.fn[NAME].Constructor = Range;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Range._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Range actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.RANGE}.${ClassName.RANGE_LABEL}`).range();


  return Range;

})(jQuery);
