'use strict';

(function() {
  const mapBlock = document.querySelector('.map');
  const mapFiltersContainer = mapBlock.querySelector('.map__filters-container');

  window.showCard = function(elem) {
    mapFiltersContainer.before(elem);
  };
})();

