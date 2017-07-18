/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): card.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Card = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'card';
  const NAME = 'card';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const TRANSITION_DURATION = 150;


  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    TOGGLE: `toggle${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`
  };

  const ClassName = {
    // Selecting
    CARD: `${Settings.FWP}${CLASSNAME}`,
    IMG_CONTAINER: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}img-container`,
    SHOW_ICON: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}btn-show`,
    HIDE_ICON: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}btn-hide`,
    // States
    ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}active`
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Card {

    constructor($element) {
      this._$element = $element;

      this._setListeners();
    }


    // getters



    // public
    toggle() {

      this._toggle();

    }

    show() {

      this._show();

    }

    hide() {

      this._hide();

    }


    // private

    _toggle() {

      // Fire toggle event
      let toggleEvent = Utility._triggerEvent(this._$element, Event.TOGGLE);

      // Fire hide / show event based on the state before toggle
      if(this._$element.hasClass(ClassName.ACTIVE)){

        let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

      }else{

        let showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

      }

      // Add / remove class active
      this._$element.toggleClass(ClassName.ACTIVE);

      // Fire hidden / shown event based on the state after toggle
      // Wait for animation to finish
      this._$element.one(Settings.ANIMATION_EVENT, (event) => {

        if(this._$element.hasClass(ClassName.ACTIVE)){

          let shownEvent = Utility._triggerEvent(this._$element, Event.SHOWN);

        }else{

          let hiddenEvent = Utility._triggerEvent(this._$element, Event.HIDDEN);

        }

      });

    }

    _show() {

      let showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

      this._$element.addClass(ClassName.ACTIVE);

      this._$element.one(Settings.ANIMATION_EVENT, (event) => {

        let shownEvent = Utility._triggerEvent(this._$element, Event.SHOWN);

      });

    }

    _hide() {

      let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

      this._$element.removeClass(ClassName.ACTIVE);

      this._$element.one(Settings.ANIMATION_EVENT, (event) => {

        let hiddenEvent = Utility._triggerEvent(this._$element, Event.HIDDEN);

      });

    }

    _setListeners() {

      $(this._$element).off(
        Event.CLICK,
        `.${ClassName.IMG_CONTAINER}, .${ClassName.SHOW_ICON}`
      ).off(
        Event.CLICK,
        `.${ClassName.HIDE_ICON}`
      );

      $(this._$element).on(
        Event.CLICK,
        `.${ClassName.IMG_CONTAINER}, .${ClassName.SHOW_ICON}`,
        (event) => this._show()
      ).on(
        Event.CLICK,
        `.${ClassName.HIDE_ICON}`,
        (event) => this._hide()
      );

    }

    // static
    static _getRootElement($element) {
      let $parent = null;

      if ($element.hasClass(ClassName.CARD)) {
        $parent = $element;
      }

      if (!$parent) {
        $parent = $element.closest(`.${ClassName.CARD}`).first();
      }

      return $parent;
    }

    static _jQueryInterface(methodName) {
      return this.each(function () {

        let $element = $(this);
        let $rootElement = Card._getRootElement($element);
        let data = $rootElement.data(DATA_KEY);

        if (!data) {
          data = new Card($rootElement);
          $rootElement.data(DATA_KEY, data);
        }

        if (typeof methodName === 'string') {
          if (data[methodName] === undefined) {
            throw new Error(`${CLASSNAME} has no method named "${methodName}"`);
          }
          data[methodName]();
        }

      });
    }

  }


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Card._jQueryInterface;
  $.fn[NAME].Constructor = Card;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Card._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Card actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.CARD}`).card();


  return Card;

})(jQuery);
