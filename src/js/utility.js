/**
* --------------------------------------------------------------------------
* material.design (v0.0.1): utility.js
* Licensed under MIT (https://github.com/jobmulder/material.design/blob/master/LICENSE)
* --------------------------------------------------------------------------
*/

const Utility = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const CLASSNAME = 'utility';
  const NAME = 'utility';
  const DATA_KEY = `${Settings.ABBR}.${CLASSNAME}`;
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Utility {

    // getters



    // public
    example(element) {

      this._example(element);

    }


    // private

    _example(element) {

    }

    // static

    static _setOptions(defaultOptions, options) {
      let finalOptions = $.extend({}, defaultOptions, options);
      return finalOptions;
    }


    static _triggerEvent($element, name, data = {}) {
      let eventTrigger = $.Event(name);

      $element.trigger(eventTrigger, data);
      return eventTrigger;
    }


    static _emulateTransitionEnd(duration) {
      let called = false;

      $(this).one(Settings.MD_ANIMATION_EVENT, () => {
        called = true;
      });

      setTimeout(() => {
        if(!called){
          Utility._triggerEvent(this, Settings.MD_ANIMATION_EVENT);
        }
      }, duration);

      return this;
    }

    static _debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if(!immediate){
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow){
          func.apply(context, args);
        }
      };
    }

    static _throttle(func, limit) {
      var wait = false;
      return function() {
        var context = this, args = arguments;
        if (!wait) {
          func.apply(context, args);
          wait = true;
          setTimeout(function(){
            wait = false;
          }, limit);
        }
      };
    }
  }

  $.fn.emulateTransitionEnd = Utility._emulateTransitionEnd;

  return Utility;

})(jQuery);
