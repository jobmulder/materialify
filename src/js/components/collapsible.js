/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): collapsible.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Collapsible = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'collapsible';
  const NAME = 'collapsible';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const DefaultOptions = {
    multipleActive: false
  };

  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    TOGGLE: `toggle${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`
  };

  var ClassName = {
    // Selecting
    COLLAPSIBLE: `${Settings.FWP}${CLASSNAME}`,
    ITEM: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}item`,
    TITLE: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}title`,
    BODY: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}body`,
    // States
    ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}item${Settings.MODIFIER}active`,
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

  class Collapsible {

    constructor($element, options = {}) {
      this._$element = $element;
      this._options = options;

      this._isAnimating = false;

      this._setListeners();
    }


    // getters



    // public
    toggle(index) {

      let $item = this._getItem(index);

      this._toggle($item);

    }

    show(index) {

      let $item = this._getItem(index);

      this._show($item);

    }

    hide(index) {

      let $item = this._getItem(index);

      this._hide($item);

    }


    // private

    _toggle($item) {

      if(this._isAnimating){
        return;
      }

      // If multipleActive is false and the current item is going to be set to active: hide all active items
      if(!this._options.multipleActive && !$item.hasClass(ClassName.ACTIVE)){
        $.each(this._getActiveItems(), (index, activeItem) => {
          this._hide($(activeItem), false);
        });
      }

      let eventData = this._getEventReturnData($item);


      // Fire toggle event
      let toggleEvent = Utility._triggerEvent(this._$element, Event.TOGGLE, eventData);

      // Fire hide / show event based on the state before toggle
      if($item.hasClass(ClassName.ACTIVE)){

        let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE, eventData);

      }else{

        let showEvent = Utility._triggerEvent(this._$element, Event.SHOW, eventData);

      }

      // Fire hidden / shown event based on the state
      if(!$item.hasClass(ClassName.ACTIVE)){

        this._showAnimationEndEvent($item, eventData);

      }else{

        this._hideAnimationEndEvent($item, eventData);

      }
    }

    _show($item) {

      if(this._isAnimating || $item.hasClass(ClassName.ACTIVE)){
        return;
      }

      // If multipleActive is false hide all active items
      if(!this._options.multipleActive){
        $.each(this._getActiveItems(), (index, activeItem) => {
          this._hide($(activeItem), false);
        });
      }

      let eventData = this._getEventReturnData($item);

      let showEvent = Utility._triggerEvent(this._$element, Event.SHOW, eventData);

      this._showAnimationEndEvent($item, eventData);

    }

    _hide($item, checkIsAnimating = true) {

      let eventData = this._getEventReturnData($item);

      if((checkIsAnimating && this._isAnimating) || !$item.hasClass(ClassName.ACTIVE)){
        return;
      }

      let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE, eventData);

      this._hideAnimationEndEvent($item, eventData);

    }

    _showAnimationEndEvent($item, eventData){

      $item.find(`> .${ClassName.BODY}`).slideDown(Transition.SHOW);
      $item.addClass(ClassName.ACTIVE);
      this._isAnimating = true;

      $item.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        let shownEvent = Utility._triggerEvent(this._$element, Event.SHOWN, eventData);

      }).emulateTransitionEnd(Transition.SHOW);

    }

    _hideAnimationEndEvent($item, eventData){

      $item.find(`> .${ClassName.BODY}`).slideUp(Transition.HIDE);
      $item.addClass(ClassName.CLOSING);
      $item.removeClass(ClassName.ACTIVE);
      this._isAnimating = true;

      $item.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        let hiddenEvent = Utility._triggerEvent(this._$element, Event.HIDDEN, eventData);
        $item.removeClass(ClassName.CLOSING);

      }).emulateTransitionEnd(Transition.HIDE);

    }

    _getItem(index) {
      return this._$element.find(`.${ClassName.ITEM}`).eq(index);
    }

    _getItemIndex($item) {
      return this._$element.find(`.${ClassName.ITEM}`).index($item);
    }

    _getActiveItems() {
      return this._$element.find(`.${ClassName.ACTIVE}`);
    }

    _getEventReturnData($item) {
      let data = {
        index: this._getItemIndex($item),
        item: $item[0]
      };
      return data;
    }

    _setListeners() {
      this._$element.find(`.${ClassName.TITLE}`).off(
        Event.CLICK
      ).on(
        Event.CLICK,
        (event) => this._toggle($(event.currentTarget).parent())
      );
    }


    // static
    static _getRootElement($element) {
      let $parent = null;

      if ($element.hasClass(ClassName.COLLAPSIBLE)) {
        $parent = $element;
      }

      if (!$parent && $element.closest(`.${ClassName.COLLAPSIBLE}`).length !== 0) {
        $parent = $element.closest(`.${ClassName.COLLAPSIBLE}`).first();
      }

      return $parent;
    }

    static _jQueryInterface(methodOrOptions, index = null) {
      return this.each(function () {

        let $element = $(this);
        let $rootElement = Collapsible._getRootElement($element);
        let _options = Utility._setOptions(DefaultOptions, $rootElement.data());

        if (typeof methodOrOptions === 'object' || methodOrOptions === undefined) {
          $.extend(_options, methodOrOptions);
          $rootElement.removeData(DATA_KEY);
        }

        let data = $rootElement.data(DATA_KEY);

        if (!data) {
          data = new Collapsible($rootElement, _options);
          $rootElement.data(DATA_KEY, data);
        }

        if (typeof methodOrOptions === 'string' && typeof index === 'number') {
          if (data[methodOrOptions] === undefined) {
            throw new Error(`${CLASSNAME} has no method named "${options}"`);
          }
          data[methodOrOptions](index);
        }

      });
    }

  }


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Collapsible._jQueryInterface;
  $.fn[NAME].Constructor = Collapsible;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapsible._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Collapsible actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.COLLAPSIBLE}`).collapsible();

  return Collapsible;

})(jQuery);
