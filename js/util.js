'use strict';

(function() {
  window.util = {
    randomInteger: function(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    shuffleArray: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },

    getIndexOffer: function(elem) {
      //получение index из data атрибута data-index-offer
      return +elem.dataset.indexOffer;
    }
  };
})();
