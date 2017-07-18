/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): input.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Input = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'input';
  const NAME = 'input';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const TRANSITION_DURATION = 200;

  const DefaultOptions = {
    controlType: 'text',
    controlHeight: null
  };

  const Event = {
    FOCUS: `focus${EVENT_KEY}`,
    UNFOCUS: `focusout${EVENT_KEY}`,
    CHANGE: `change${EVENT_KEY}`,
    VALIDATE: `validate${EVENT_KEY}`,
    KEYUP: `keyup${EVENT_KEY}`,
    KEYDOWN: `keydown${EVENT_KEY}`
  };

  const ClassName = {
    // Selecting
    INPUT: `${Settings.FWP}${CLASSNAME}`,
    CONTROL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}control`,
    LABEL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}label`,
    HELPER: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}helper`,
    BORDER_STATUS: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}border-status`,

    // States
    ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}active`,
    VALID: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}valid`,
    INVALID: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}invalid`,

    // Modifiers
    TEXTAREA: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}textarea`,
    DATE: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}date`
  };

  const Transition = {
    ACTIVE_SHOW: Settings.ANIMATION_TIME * .2,
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Input {

    constructor($element, options = {}) {
      this._$element = $element;
      this._options = options;

      this._setup();
      this._setListeners();
    }


    // getters



    // public

    active() {

      this._active();

    }

    validate() {

      this._validate();

    }

    valid() {

      this._valid();

    }

    invalid() {

      this._invalid();

    }


    // private

    _focus() {

      this._active();

    }

    _unfocus() {

      this._validate();

    }

    _active() {

      let $control = this._$element.find(`.${ClassName.CONTROL}`);
      let $label = this._$element.find(`.${ClassName.LABEL}`);

      if(!this._$element.hasClass(ClassName.ACTIVE)){
        this._$element.addClass(ClassName.ACTIVE);

        $label.one(Settings.MD_ANIMATION_EVENT, (event) => {

          $control.css('border', 'none');
          $label.css('z-index', 1);

        }).emulateTransitionEnd(Transition.ACTIVE_SHOW);

      }

    }

    _change() {

      let $control = this._$element.find(`.${ClassName.CONTROL}`);
      let $label = this._$element.find(`.${ClassName.LABEL}`);

      if(this._options.controlType === 'textarea'){
        $control.css('height', `${this._options.controlHeight}px`);
        let lineHeight = parseInt(this._$element.css('line-height'), 10);
        let scrollHeight = $control.prop('scrollHeight');
        $control.css('height', `${scrollHeight + lineHeight}px`);
      }

    }

    _validate() {

      let $control = this._$element.find(`.${ClassName.CONTROL}`);

      if(!$control.get(0).validity.valid){

        this._invalid();

      }else if ($control.val().length > 0){

        this._valid();

      }else{

        this._noStatus();

      }

    }

    _valid() {

      this._$element.removeClass(ClassName.INVALID);
      this._$element.addClass(ClassName.VALID);
      this._setPositionBorderStatus();

    }

    _invalid() {

      this._$element.removeClass(ClassName.VALID);
      this._$element.addClass(ClassName.INVALID);
      this._setPositionBorderStatus();

    }

    _noStatus() {

      let $control = this._$element.find(`.${ClassName.CONTROL}`);
      let $label = this._$element.find(`.${ClassName.LABEL}`);

      this._$element.removeClass(`${ClassName.ACTIVE} ${ClassName.VALID} ${ClassName.INVALID}`);
      $control.css('border', '');
      $label.css('z-index', '');
      this._setPositionBorderStatus();

    }

    _appendBorderStatus() {

      if(this._$element.find(`.${ClassName.BORDER_STATUS}`).length === 0){
        let $borderStatus = $('<div>')
          .addClass(ClassName.BORDER_STATUS);
        this._$element.append($borderStatus);
        this._setPositionBorderStatus();
      }

    }

    _setPositionBorderStatus(){

      let $borderStatus = this._$element.find(`.${ClassName.BORDER_STATUS}`);

      if($borderStatus){
        let $helper = this._$element.find(`.${ClassName.HELPER}`);
        let inputPaddingBottom = parseInt(this._$element.css('padding-bottom'), 10);
        let helperHeight = 0;
        if($helper.length !== 0){
          helperHeight = $helper.outerHeight(true);
        }

        $borderStatus.css('bottom', `${inputPaddingBottom + helperHeight}px`);
      }

    }

    _setListeners() {

      $(this._$element).off(
        Event.FOCUS,
        `.${ClassName.CONTROL}`
      ).off(
        Event.UNFOCUS,
        `.${ClassName.CONTROL}`
      ).off(
        Event.CHANGE,
        `.${ClassName.CONTROL}`
      ).off(
        `${Event.KEYUP} ${Event.KEYDOWN} `,
        `.${ClassName.CONTROL}`
      );

      $(this._$element).on(
        Event.FOCUS,
        `.${ClassName.CONTROL}`,
        (e) => this._focus()
      ).on(
        Event.UNFOCUS,
        `.${ClassName.CONTROL}`,
        (e) => this._unfocus()
      ).on(
        Event.CHANGE,
        `.${ClassName.CONTROL}`,
        (e) => this._change()
      );

      if(this._options.controlType === 'textarea'){

        $(this._$element).on(
          `${Event.KEYUP} ${Event.KEYDOWN}`,
          `.${ClassName.CONTROL}`,
          (e) => this._change()
        );

      }

    }

    _setup() {

      // Check if the input has textarea or is type  number
      let $textarea = this._$element.find('textarea');
      let $number = this._$element.find('[type="number"]');
      let $date = this._$element.find('[type="datetime-local"], [type="date"], [type="month"], [type="week"], [type="time"]');

      if($textarea.length !== 0){
        this._$element.addClass(ClassName.TEXTAREA);
        this._options.controlType = 'textarea';
        this._options.controlHeight = parseInt(this._$element.css('height'), 10);
      }
      else if($number.length !== 0){
        this._options.controlType = 'number';
      }
      else if($date.length !== 0){
        this._$element.addClass(ClassName.DATE);
        this._options.controlType = 'date';
      }
      if($.inArray(this._options.controlType, ['text', 'textarea', 'number', 'date']) !== -1){
        this._appendBorderStatus();
      }

    }

    // static
    static _getRootElement($element) {
      let $parent = null;

      if ($element.hasClass(ClassName.INPUT)) {
        $parent = $element;
      }

      if (!$parent) {
        $parent = $element.closest(`.${ClassName.INPUT}`).first();
      }

      return $parent;
    }

    static _jQueryInterface(methodOrOptions) {
      return this.each(function () {

        let $element = $(this);
        let $rootElement = Input._getRootElement($element);
        let _options = Utility._setOptions(DefaultOptions, $rootElement.data());

        if (typeof methodOrOptions === 'object') {
          $.extend(_options, methodOrOptions);
          $rootElement.removeData(DATA_KEY);
        }

        let data = $rootElement.data(DATA_KEY);

        if (!data) {
          data = new Input($rootElement, _options);
          $rootElement.data(DATA_KEY, data);
        }

        if (typeof methodOrOptions === 'string') {
          if (data[methodOrOptions] === undefined) {
            throw new Error(`${CLASSNAME} has no method named "${methodName}"`);
          }
          data[methodOrOptions]();
        }

      });
    }

  }


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Input._jQueryInterface;
  $.fn[NAME].Constructor = Input;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Input._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Input actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.INPUT}`).input();


  return Input;

})(jQuery);
