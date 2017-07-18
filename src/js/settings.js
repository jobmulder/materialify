/**
 * --------------------------------------------------------------------------
 * material.design (v0.0.1): settings.js
 * Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

const Settings = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'settings';
  const VERSION = '0.0.1';
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const ABBR = 'md';
  const FWP = `${ABBR}-`;
  const ELEMENT = '__';
  const MODIFIER = '--';
  const ANIMATION_TIME = 1000;
  const ANIMATION_EVENT = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
  const MD_ANIMATION_EVENT = `${ABBR}TransitionEnd`;

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Settings {

    // getters

    static get VERSION() {
      return VERSION;
    }

    static get ABBR() {
      return ABBR;
    }
    static get FWP() {
      return FWP;
    }
    static get ELEMENT() {
      return ELEMENT;
    }
    static get MODIFIER() {
      return MODIFIER;
    }
    static get MODE() {
      return MODE;
    }
    static get ANIMATION_TIME() {
      return ANIMATION_TIME;
    }
    static get ANIMATION_EVENT() {
      return ANIMATION_EVENT;
    }
    static get MD_ANIMATION_EVENT() {
      return MD_ANIMATION_EVENT;
    }


    // public


    // private


    // static


  }

  return Settings;

})(jQuery);
