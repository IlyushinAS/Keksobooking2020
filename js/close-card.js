'use strict';

(function() {

  const mapBlock = document.querySelector('.map');

  window.closeCard = function() {
    let card = mapBlock.querySelector('.popup');

    if (card === null) return;

    card.remove();
  };
})();
