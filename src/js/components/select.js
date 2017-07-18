/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): select.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Select = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'select';
  const NAME = 'select';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const TRANSITION_DURATION = 200;

  const DefaultOptions = {
    multiple: false
  };

  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    TOGGLE: `toggle${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`,
    CHANGE: `change${EVENT_KEY}`,
    UNFOCUS: `click.unfocus${EVENT_KEY}`
  };

  const ClassName = {
    // Selecting
    SELECT: `${Settings.FWP}${CLASSNAME}`,
    CONTROL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}control`,
    ITEM: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}item`,
    ITEM_ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}item${Settings.MODIFIER}active`,
    ITEM_DISABLED: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}item${Settings.MODIFIER}disabled`,
    ITEM_GROUP: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}item${Settings.MODIFIER}group`,
    ITEM_GROUP_LABEL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}item${Settings.MODIFIER}group-label`,
    LABEL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}label`,
    TOGGLE: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}toggle`,

    // States
    ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}active`,
  };

  const Transition = {
    SHOW: Settings.ANIMATION_TIME * .5,
    HIDE: Settings.ANIMATION_TIME * .5,
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Select {

    constructor($element, options = {}) {
      this._$element = $element;
      this._options = options;
      this._isAnimating = false;

      this._setup();
      this._setListeners();
    }


    // getters



    // public

    show() {

      this._show();

    }

    hide() {

      this._hide();

    }



    // private

    _show() {

      if(this._isAnimating || this._$element.hasClass(ClassName.ACTIVE)){
        return;
      }

      let showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

      this._showAnimationEndEvent();

    }

    _hide() {

      if(this._isAnimating || !this._$element.hasClass(ClassName.ACTIVE)){
        return;
      }

      let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

      this._hideAnimationEndEvent();

    }

    _optionClick(e) {

      let $nativeSelect = this._$element.find(`select`);
      let $toggle = this._$element.find(`.${ClassName.TOGGLE}`);
      let $options = this._$element.find(`.${ClassName.ITEM}`);
      let $activeOptions = this._$element.find(`.${ClassName.ITEM_ACTIVE}`);
      let $option = $(e.currentTarget);

      if($option.is(`.${ClassName.ITEM_GROUP_LABEL}, .${ClassName.ITEM_DISABLED}`)){
        return;
      }

      if($(e.target).is('select')){
        e.stopPropagation();
      }

      if(!this._options.multiple){

        $activeOptions.removeClass(ClassName.ITEM_ACTIVE);
        $option.addClass(ClassName.ITEM_ACTIVE);

        $nativeSelect.val($option.data('value'));

        Utility._triggerEvent(this._$element, Event.CHANGE, {value: $option.data('value')});

        $toggle.text($option.text());

        this._hide();

      }else{

        let multiVal = [];
        let toggleText = '';

        $.each($activeOptions, (index, activeOption) => {

          let $activeOption = $(activeOption);
          multiVal.push($activeOption.data('value'));

        });

        // New item deselected
        if($option.hasClass(ClassName.ITEM_ACTIVE)){

          $option.removeClass(ClassName.ITEM_ACTIVE);

          toggleText = this._$element.find(`.${ClassName.ITEM_ACTIVE}`).last().text();

          multiVal.splice($.inArray($option.data('value'), multiVal), 1);

        // Item selected
        }else{

          $option.addClass(ClassName.ITEM_ACTIVE);

          toggleText = $option.text();

          multiVal.push($option.data('value'));

        }

        $toggle.text(toggleText);

        Utility._triggerEvent(this._$element, Event.CHANGE, {value: multiVal});

      }

    }

    _unfocus(event) {

      if(this._isAnimating || $(event.target)[0] === this._$element[0]  || $(event.target).closest(`.${ClassName.SELECT}`)[0] === this._$element[0]){
        return;
      }

      let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

      this._hideAnimationEndEvent();

    }

    _showAnimationEndEvent(){

      let $control = this._$element.find(`.${ClassName.CONTROL}`);

      this._isAnimating = true;
      $control.slideDown(Transition.SHOW);
      this._$element.addClass(ClassName.ACTIVE);

      $control.one(Settings.MD_ANIMATION_EVENT, () => {

        this._isAnimating = false;
        let shownEvent = Utility._triggerEvent(this._$element, Event.SHOWN);

        // Add unfocus event after show animation is finished
        $(document).off(
          Event.UNFOCUS
        ).on(
          Event.UNFOCUS,
          (event) => this._unfocus(event)
        );

      }).emulateTransitionEnd(Transition.SHOW);

    }

    _hideAnimationEndEvent(){

      let $control = this._$element.find(`.${ClassName.CONTROL}`);

      this._isAnimating = true;
      $control.slideUp(Transition.HIDE);
      this._$element.removeClass(ClassName.ACTIVE);

      this._$element.one(Settings.MD_ANIMATION_EVENT, (e) => {

        this._isAnimating = false;
        let hiddenEvent = Utility._triggerEvent(this._$element, Event.HIDDEN);

        // If there are no other selects active unbind click event
        if($(`.${ClassName.SELECT}.${ClassName.ACTIVE}`).length === 0){
          $(document).off(
            Event.UNFOCUS
          );
        }

      }).emulateTransitionEnd(Transition.HIDE);

    }


    _setListeners() {

      $(this._$element).off(
        Event.CLICK,
        `.${ClassName.TOGGLE}`
      ).off(
        Event.CLICK,
        `.${ClassName.ITEM}`
      );

      $(this._$element).on(
        Event.CLICK,
        `.${ClassName.TOGGLE}`,
        (e) => this._show()
      ).on(
        Event.CLICK,
        `.${ClassName.ITEM}`,
        (e) => this._optionClick(e)
      );

    }

    _setup() {

      let $select = this._$element.find('select');

      if($select.is('[multiple]')){
        this._options.multiple = true;
      }

      let selectedText = $select.find(':selected').text();

      let $toggle = $('<span>')
        .text(selectedText)
        .addClass(ClassName.TOGGLE);

      let $control = $('<ul>')
        .addClass(ClassName.CONTROL);

      $.each($select.children(), (index, groupOrOption) => {
        let $groupOrOption = $(groupOrOption);

        $control.append(this._buildItem($groupOrOption));

        if($groupOrOption.prop('tagName') === 'OPTGROUP'){

          $.each($groupOrOption.children(), (index, option) => {

            let $option = $(option);
            $control.append(this._buildItem($option));

          });

        }

      });

      this._$element.append($toggle);
      this._$element.append($control);

    }

    _buildItem($groupOrOption) {

      let $item = null;

      if($groupOrOption.prop('tagName') === 'OPTGROUP'){

        $item = $('<li>')
          .text($groupOrOption.prop('label'))
          .addClass(`${ClassName.ITEM} ${ClassName.ITEM_GROUP_LABEL}`);

      }else{
        let itemClassName = ClassName.ITEM;

        if($groupOrOption.parent().prop('tagName') === 'OPTGROUP'){
          itemClassName += ` ${ClassName.ITEM_GROUP}`;
        }
        if($groupOrOption.is(':disabled')){
          itemClassName += ` ${ClassName.ITEM_DISABLED}`;
        }

        $item = $('<li>')
          .text($groupOrOption.text())
          .data('value', $groupOrOption.val())
          .addClass(itemClassName);

      }

      return $item;

    }

    // static
    static _getRootElement($element) {
      let $parent = null;

      if ($element.hasClass(ClassName.SELECT)) {
        $parent = $element;
      }

      if (!$parent) {
        $parent = $element.closest(`.${ClassName.SELECT}`).first();
      }

      return $parent;
    }

    static _jQueryInterface(methodOrOptions) {
      return this.each(function () {

        let $element = $(this);
        let $rootElement = Select._getRootElement($element);
        let _options = Utility._setOptions(DefaultOptions, $rootElement.data());

        if (typeof methodOrOptions === 'object') {
          $.extend(_options, methodOrOptions);
          $rootElement.removeData(DATA_KEY);
        }

        let data = $rootElement.data(DATA_KEY);

        if (!data) {
          data = new Select($rootElement, _options);
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

  $.fn[NAME]             = Select._jQueryInterface;
  $.fn[NAME].Constructor = Select;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Select._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Select actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.SELECT}`).select();


  return Select;

})(jQuery);
