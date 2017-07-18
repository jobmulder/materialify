/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): layout.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Layout = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'layout';
  const NAME = 'layout';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const DefaultOptions = {
    closeOnLinkClicked: true,
    multipleCollapsibleActive: false,
    drawerClipped: false,
    toolbarWaterfall: false
  };

  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    TOGGLE: `toggle${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`,
    MOUSE_ENTER: `mouseenter${EVENT_KEY}`,
    MOUSE_LEAVE: `mouseleave${EVENT_KEY}`,
    SCROLL: `scroll${EVENT_KEY}`
  };

  const ClassName = {
    // Selecting
    LAYOUT: `${Settings.FWP}${CLASSNAME}`,
    NAV: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}nav`,
    DRAWER: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}drawer`,
    TOOLBAR: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}toolbar`,
    OVERLAY: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}overlay`,
    MAIN: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}main`,
    TOGGLE_DRAWER: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}toggle-drawer`,

    DRAWER_LINK: `${Settings.FWP}drawer${Settings.ELEMENT}link`,
    // States
    DRAWER_ACTIVE: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}active`,
    DRAWER_CLOSING: `${Settings.FWP}${CLASSNAME}${Settings.MODIFIER}closing`,
    DRAWER_ITEM_ACTIVE: `${Settings.FWP}drawer${Settings.ELEMENT}item${Settings.MODIFIER}active`,

    // Modifiers
    NAV_CLIPPED: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}nav${Settings.MODIFIER}clipped`,
    NAV_WATERFALL: `${Settings.FWP}${CLASSNAME}${Settings.ELEMENT}nav${Settings.MODIFIER}waterfall`,


    // Collapsible
    // Selecting
    COLLAPSIBLE_ITEM: `${Settings.FWP}drawer${Settings.ELEMENT}collapsible-item`,
    COLLAPSIBLE_TITLE: `${Settings.FWP}drawer${Settings.ELEMENT}collapsible-title`,
    COLLAPSIBLE_BODY: `${Settings.FWP}drawer${Settings.ELEMENT}collapsible-body`,
    // States
    COLLAPSIBLE_ACTIVE: `${Settings.FWP}drawer${Settings.ELEMENT}collapsible-item${Settings.MODIFIER}active`,
    COLLAPSIBLE_CLOSING: `${Settings.FWP}drawer${Settings.MODIFIER}closing`
  };

  const Transition = {
    SHOW: Settings.ANIMATION_TIME * .3,
    HIDE: Settings.ANIMATION_TIME * .3
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Layout {

    constructor($element, options = {}) {
      this._$element = $element;
      this._options = options;

      // Check if the NAV_CLIPPED or NAV_WATERFALL class is added to the nav
      let $nav = this._$element.find(`.${ClassName.NAV}`);
      if($nav.hasClass(ClassName.NAV_CLIPPED)){
        this._options.drawerClipped = true;
      }
      if($nav.hasClass(ClassName.NAV_WATERFALL)){
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
    toggle() {

      this._toggle();

    }

    show() {

      this._show();

    }

    hide() {

      this._hide();

    }

    // //////
    // private
    // //////

    // //////
    // Drawer methods
    // //////

    _toggle() {

      if(this._isAnimating){
        return;
      }

      // Fire toggle event
      let toggleEvent = Utility._triggerEvent(this._$element, Event.TOGGLE);

      // Fire hide / show event based on the state before toggle
      if(this._$element.hasClass(ClassName.DRAWER_ACTIVE)){

        let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

      }else{

        let showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

      }

      // Fire hidden / shown event based on the state after toggle
      // Wait for animation to finish
      if(!this._$element.hasClass(ClassName.DRAWER_ACTIVE)){

        this._showAnimationEndEvent();

      }else{

        this._hideAnimationEndEvent();

      }
    }

    _show() {

      if(this._isAnimating || this._$element.hasClass(ClassName.DRAWER_ACTIVE)){
        return;
      }

      let showEvent = Utility._triggerEvent(this._$element, Event.SHOW);

      this._showAnimationEndEvent();

    }

    _hide() {

      if(this._isAnimating || !this._$element.hasClass(ClassName.DRAWER_ACTIVE)){
        return;
      }

      let hideEvent = Utility._triggerEvent(this._$element, Event.HIDE);

      this._hideAnimationEndEvent();

    }

    _scroll() {

      var drawerTop = 0;
      let $drawer = this._$element.find(`.${ClassName.DRAWER}`);
      let $toolbar = this._$element.find(`.${ClassName.TOOLBAR}`);
      let $main = this._$element.find(`.${ClassName.MAIN}`);
      let fromTop = $(document).scrollTop();
      let toolbarHeight = $toolbar.outerHeight();


      $drawer.css('top', 0);
      $main.css('margin-top', 0);

      if(this._options.toolbarWaterfall === true){
        $main.css('margin-top', `${toolbarHeight}px`);
        if(fromTop > 0){
          $toolbar.removeClass(`${Settings.FWP}shadow-none`);
          $toolbar.addClass(`${Settings.FWP}shadow-xs`);
        }else{
          $toolbar.addClass(`${Settings.FWP}shadow-none`);
          $toolbar.removeClass(`${Settings.FWP}shadow-xs`);
        }
        if(this._options.drawerClipped === true){
          $drawer.css('top', `${toolbarHeight}px`);
        }
      }else if(this._options.drawerClipped === true){
        let difference = toolbarHeight - fromTop;
        if(difference > 0){
          drawerTop = difference;
        }
        $drawer.css('top', `${drawerTop}px`);
      }
    }

    _showAnimationEndEvent(){

      this._$element.addClass(ClassName.DRAWER_ACTIVE);
      this._isAnimating = true;

      this._$element.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        let shownEvent = Utility._triggerEvent(this._$element, Event.SHOWN);

      }).emulateTransitionEnd(Transition.SHOW);

    }

    _hideAnimationEndEvent(){

      this._$element.addClass(ClassName.DRAWER_CLOSING);
      this._$element.removeClass(ClassName.DRAWER_ACTIVE);
      this._isAnimating = true;

      this._$element.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        let hiddenEvent = Utility._triggerEvent(this._$element, Event.HIDDEN);
        this._$element.removeClass(ClassName.DRAWER_CLOSING);

      }).emulateTransitionEnd(Transition.HIDE);

    }

    _linkClick($item) {
      this._itemToggle($item);

      if($item.hasClass(ClassName.COLLAPSIBLE_ITEM)){
        this._collapsibleToggle($item);
        return;
      }

      if(this._options.closeOnLinkClicked){
        this._hide();
        return;
      }
    }

    // //////
    // Item methods
    // //////
    _itemToggle($item){

      // Remove all active classes
      $.each(this._$element.find(`.${ClassName.DRAWER_ITEM_ACTIVE}`), (index, activeItem) => {
        $(activeItem).removeClass(ClassName.DRAWER_ITEM_ACTIVE);
      });

      // Add active class to parent and current item
      $item.addClass(ClassName.DRAWER_ITEM_ACTIVE);
      $item.closest(`.${ClassName.COLLAPSIBLE_ITEM}`).addClass(ClassName.DRAWER_ITEM_ACTIVE);
    }

    // //////
    // Dropdown methods
    // //////
    _collapsibleToggle($item) {

      if(this._isAnimating){
        return;
      }

      // If multipleActive is false and the current item is going to be set to active: hide all active items
      if(!this._options.multipleCollapsibleActive && !$item.hasClass(ClassName.COLLAPSIBLE_ACTIVE)){
        $.each(this._$element.find(`.${ClassName.COLLAPSIBLE_ACTIVE}`), (index, activeItem) => {
          this._collapsibleHide($(activeItem), false);
        });
      }

      // Fire hidden / shown event based on the state
      if(!$item.hasClass(ClassName.COLLAPSIBLE_ACTIVE)){

        this._collapsibleShowAnimationEndEvent($item);

      }else{

        this._collapsibleHideAnimationEndEvent($item);

      }
    }

    _collapsibleHide($item, checkIsAnimating = true) {

      if((checkIsAnimating && this._isAnimating) || !$item.hasClass(ClassName.COLLAPSIBLE_ACTIVE)){
        return;
      }

      this._collapsibleHideAnimationEndEvent($item);

    }

    _collapsibleShowAnimationEndEvent($item){

      $item.find(`> .${ClassName.COLLAPSIBLE_BODY}`).slideDown(Transition.SHOW);
      $item.addClass(ClassName.COLLAPSIBLE_ACTIVE);
      this._isAnimating = true;

      $item.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;

      }).emulateTransitionEnd(Transition.SHOW);

    }

    _collapsibleHideAnimationEndEvent($item){

      $item.find(`> .${ClassName.COLLAPSIBLE_BODY}`).slideUp(Transition.HIDE);
      $item.addClass(ClassName.COLLAPSIBLE_CLOSING);
      $item.removeClass(ClassName.COLLAPSIBLE_ACTIVE);
      this._isAnimating = true;

      $item.one(Settings.MD_ANIMATION_EVENT, (event) => {

        this._isAnimating = false;
        $item.removeClass(ClassName.COLLAPSIBLE_CLOSING);

      }).emulateTransitionEnd(Transition.HIDE);

    }

    // //////
    // Listeners
    // //////
    _setListeners() {
      // Unbind all events
      $(document).off(
        Event.CLICK,
        `.${ClassName.TOGGLE_DRAWER}`
      ).off(
        Event.CLICK,
        `.${ClassName.OVERLAY}`
      ).off(
        Event.CLICK,
        `.${ClassName.DRAWER_LINK}`
      ).off(
        Event.SCROLL
      );

      $(document).on(
        Event.CLICK,
        `.${ClassName.TOGGLE_DRAWER}`,
        (event) => this._toggle()
      );
      $(document).on(
        Event.CLICK,
        `.${ClassName.OVERLAY}`,
        (event) => this._hide()
      );
      if(this._options.drawerClipped || this._options.toolbarWaterfall){
        $(document).on(
          Event.SCROLL,
          Utility._debounce((event) => this._scroll(), 50)
        );
      }
      $(document).on(
        Event.CLICK,
        `.${ClassName.DRAWER_LINK}`,
        (event) => this._linkClick($(event.currentTarget).parent())
      );

    }

    // //////
    // static
    // //////
    static _getRootElement($element) {

      let $parent = null;

      if ($element.hasClass(ClassName.LAYOUT)) {
        $parent = $element;
      }

      if (!$parent) {
        $parent = $element.closest(`.${ClassName.LAYOUT}`).first();
      }

      return $parent;
    }

    static _jQueryInterface(methodOrOptions) {
      return this.each(function () {

        let $element = $(this);
        let $rootElement = Layout._getRootElement($element);
        let _options = Utility._setOptions(DefaultOptions, $rootElement.data());

        if (typeof methodOrOptions === 'object' || methodOrOptions === undefined) {
          $.extend(_options, methodOrOptions);
          $rootElement.removeData(DATA_KEY);
        }

        let data = $rootElement.data(DATA_KEY);

        if (!data) {
          data = new Layout($rootElement, _options);
          $rootElement.data(DATA_KEY, data);
        }

        if (typeof methodOrOptions === 'string') {
          if (data[methodOrOptions] === undefined) {
            throw new Error(`${CLASSNAME} has no method named "${methodOrOptions}"`);
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

  $.fn[NAME]             = Layout._jQueryInterface;
  $.fn[NAME].Constructor = Layout;
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Layout._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Listen for Layout actions
   * ------------------------------------------------------------------------
   */

  $(`.${ClassName.LAYOUT}`).layout();

  return Layout;

})(jQuery);
