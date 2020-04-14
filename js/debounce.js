'use strict';
(function () {

  const DEBOUNCE_INTERVAL = 500; // ms

  let lastTimeout;

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  }
})();
