/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): fab.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Fab = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'fab';
  const NAME = 'fab';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const DefaultOptions = {
    toggle: false
  };

  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    TOGGLE: `toggle${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`,
    MOUSE_ENTER: `mouseenter${EVENT_KEY}`,
    MOUSE_LEAVE: `mouseleave${EVENT_KEY}`
  };

  const ClassName = {
    // Selecting
    FAB: `${Settings.FWP}${CLASSNAME}`,
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

  class Fab {

    constructor(element, options) {
      this._element = element;
      this._options = Utility._setOptions(DefaultOptions, options);

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

    _showAnimationEndEvent(element){

      element.addClass(ClassName.ACTIVE);
      this._isAnimating = true;

      element.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        let shownEvent = Utility._triggerEvent(element, Event.SHOWN);

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

      }).emulateTransitionEnd(Transition.HIDE);

    }

    _getRootElement(element, event = null) {
      element = element || this._element;

      if(event !== null){
        element = event.currentTarget;
      }

      let parent = null;

      if ($(element).hasClass(ClassName.FAB)) {
        parent = $(element);
      }

      if (!parent) {
        parent = $(element).closest(`.${ClassName.FAB}`).first();
      }

      return parent;
    }

    _setListeners() {
      // Unbind all events
      $(document).off(
        Event.CLICK,
        `.${ClassName.FAB} .${ClassName.BTN_MAIN}`
      ).off(
        Event.MOUSE_ENTER,
        `.${ClassName.FAB} .${ClassName.BTN_MAIN}`
      ).off(
        Event.MOUSE_LEAVE,
        `.${ClassName.FAB}`
      );

      if(this._options.toggle){
        $(document).on(
          Event.CLICK,
          `.${ClassName.FAB} .${ClassName.BTN_MAIN}`,
          (event) => this._toggle(event.currentTarget, event)
        );
      }

      if(!this._options.toggle){
        $(document).on(
          Event.MOUSE_ENTER,
          `.${ClassName.FAB} .${ClassName.BTN_MAIN}`,
          (event) => this._show(event.currentTarget, event)
        );

        $(document).on(
          Event.MOUSE_LEAVE,
          `.${ClassName.FAB}`,
          (event) => this._hide(event.currentTarget, event)
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
          data = new Fab(this, _options);
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

  $.fn[NAME]             = Fab._jQueryInterface;
  $.fn[NAME].Constructor = Fab;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Fab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Fab actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.FAB}`).fab();

  return Fab;

})(jQuery);
