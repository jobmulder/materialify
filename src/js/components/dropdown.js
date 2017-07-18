/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): dropdown.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Dropdown = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'dropdown';
  const NAME = 'dropdown';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const DefaultOptions = {
    toggle: true,
    position: {
      top: 0,
      right: 'auto',
      bottom: 'auto',
      left: 0,
    }
  };

  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    TOGGLE: `toggle${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`,
    UNFOCUS: `click.unfocus${EVENT_KEY}`,
    MOUSE_ENTER: `mouseenter${EVENT_KEY}`,
    MOUSE_LEAVE: `mouseleave${EVENT_KEY}`
  };

  const ClassName = {
    // Selecting
    DROPDOWN: `${Settings.FWP}${CLASSNAME}`,
    LIST: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}list`,
    BTN_MAIN: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}btn-main`,
    // States
    ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}active`,
    CLOSING: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}closing`
  };

  const Transition = {
    SHOW: Settings.ANIMATION_TIME * .5,
    HIDE: Settings.ANIMATION_TIME * .5
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Dropdown {

    constructor(element, options = {}) {
      this._element = element;
      this._options = options;

      this._isAnimating = false;

      this._setListeners();
    }


    // getters



    // public
    toggle(element) {

      element = element || this._element;

      this._toggle(element);

    }

    show(element) {

      element = element || this._element;

      this._show(element);

    }

    hide(element) {

      element = element || this._element;

      this._hide(element);

    }


    // private

    _toggle(element, event = null) {
      let rootElement = this._getRootElement(element, event);

      if(this._isAnimating){
        return;
      }

      // If a a element is used for the toggle button prevent page from redirecting
      if(event){
        event.preventDefault();
      }

      // Fire toggle event
      let toggleEvent = Utility._triggerEvent(rootElement, Event.TOGGLE);

      // Fire hide / show event based on the state before toggle
      if(rootElement.hasClass(ClassName.ACTIVE)){

        let hideEvent = Utility._triggerEvent(rootElement, Event.HIDE);

      }else{

        let showEvent = Utility._triggerEvent(rootElement, Event.SHOW);

      }

      // Fire hidden / shown event based on the state after toggle
      // Wait for animation to finish
      if(!rootElement.hasClass(ClassName.ACTIVE)){

        this._showAnimationEndEvent(rootElement);

      }else{

        this._hideAnimationEndEvent(rootElement);

      }
    }

    _show(element) {
      let rootElement = this._getRootElement(element);

      if(this._isAnimating || rootElement.hasClass(ClassName.ACTIVE)){
        return;
      }

      let showEvent = Utility._triggerEvent(rootElement, Event.SHOW);

      this._showAnimationEndEvent(rootElement);

    }

    _hide(element) {
      let rootElement = this._getRootElement(element);

      if(this._isAnimating || !rootElement.hasClass(ClassName.ACTIVE)){
        return;
      }

      let hideEvent = Utility._triggerEvent($(rootElement), Event.HIDE);

      this._hideAnimationEndEvent(rootElement);

    }

    _unfocus(element, event = null) {

      if($(event.target)[0] === element[0]  || $(event.target).closest(`.${ClassName.DROPDOWN}`)[0] === element[0]){
        return;
      }

      let hideEvent = Utility._triggerEvent(element, Event.HIDE);

      this._hideAnimationEndEvent(element);

    }

    _showAnimationEndEvent(element){

      this._applyPosition();

      element.addClass(ClassName.ACTIVE);
      this._isAnimating = true;

      element.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        let shownEvent = Utility._triggerEvent($(this._element), Event.SHOWN);

        // Add unfocus event after show animation is finished
        $(document).off(
          Event.UNFOCUS
        ).on(
          Event.UNFOCUS,
          (event) => this._unfocus($(this._element), event)
        );

      }).emulateTransitionEnd(Transition.SHOW);

    }

    _hideAnimationEndEvent(element){

      element.addClass(ClassName.CLOSING);
      element.removeClass(ClassName.ACTIVE);
      this._isAnimating = true;

      element.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        let hiddenEvent = Utility._triggerEvent(element, Event.HIDDEN);
        element.removeClass(ClassName.CLOSING);

        // If there are no other dropdowns active unbind click event
        if($(`.${ClassName.DROPDOWN}.${ClassName.ACTIVE}`).length === 0){
          $(document).off(
            Event.UNFOCUS
          );
        }

      }).emulateTransitionEnd(Transition.HIDE);

    }

    _applyPosition(){
      $(this._element).find(`.${ClassName.LIST}`).css(this._options.position);
    }

    _getRootElement(element, event = null) {
      element = element || this._element;

      if(event !== null){
        element = event.target;
      }

      let parent = null;

      if ($(element).hasClass(ClassName.DROPDOWN)) {
        parent = $(element);
      }

      if (!parent && $(element).closest(`.${ClassName.DROPDOWN}`).length !== 0) {
        parent = $(element).closest(`.${ClassName.DROPDOWN}`).first();
      }

      return parent;
    }

    _setListeners() {
      if(this._options.toggle){
        $(this._element).find(`.${ClassName.BTN_MAIN}`).off(
          Event.CLICK
        ).on(
          Event.CLICK,
          (event) => this._toggle(event.currentTarget, event)
        );
      }

      if(!this._options.toggle){
        $(this._element).find(`.${ClassName.BTN_MAIN}`).off(
          Event.MOUSE_ENTER
        ).on(
          Event.MOUSE_ENTER,
          (event) => this._show(event.currentTarget)
        );

        $(this._element).find(`.${ClassName.DROPDOWN}`).off(
          Event.MOUSE_LEAVE
        ).on(
          Event.MOUSE_LEAVE,
          (event) => this._hide(event.currentTarget)
        );
      }
    }

    // static

    static _jQueryInterface(options) {
      return this.each(function () {

        const $element = $(this);
        const _options = Utility._setOptions(DefaultOptions, $(this).data());

        if (typeof options === 'object') {
          $.extend(_options, options);
          $element.removeData(DATA_KEY);
        }

        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this, _options);
          $element.data(DATA_KEY, data);
        }

        if (typeof options === 'string') {
          if (data[options] === undefined) {
            throw new Error(`${CLASSNAME} has no method named "${options}"`);
          }
          data[options](this);
        }

      });
    }

  }


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Dropdown actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.DROPDOWN}`).dropdown();

  return Dropdown;

})(jQuery);
