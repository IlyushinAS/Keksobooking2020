'use strict';

//блок генерации пинов, добавление/удаление иx классов

(function() {
  const mapBlock = document.querySelector('.map');
  const mapPins = mapBlock.querySelector('.map__pins');
  const pins = document.createDocumentFragment();

  const renderPins = function(data) {

    //массив данных с пинов, которые используются для отрисовки карточки объявления
    window.pin.cardInfo = data.slice();

    let pinAmount

    if (data.length > 5) {
      pinAmount = 5;
      window.pin.cardInfo.length = 5;
    } else {
      pinAmount = data.length;
    };

    for (let index = 0; index < pinAmount; index++) {
      let newButton = document.createElement('button');
      newButton.className = 'map__pin';
      newButton.setAttribute('data-index-offer', `${index}`);


      let locationX = data[index].location.x;
      let locationY = data[index].location.y;

      let left = locationX + 'px';
      let top = locationY + 'px';
      newButton.style.left = left;
      newButton.style.top = top;

      let avatar = data[index].author.avatar
      newButton.innerHTML = `<img src="${avatar}" width="40" height="40" draggable="false">`;

      pins.append(newButton);
    };
  };

  const findMapPins = function() {
    //ищет пины и возвращает их массив, за исключением главного

    let pinArr = Array.from(document.querySelectorAll('.map__pin'));

    //убираем главный пин (находится первым в массиве)

    pinArr.shift();

    return pinArr;
  };

  window.pin = {
    showMapPins: function(data) {
      renderPins(data);
      mapPins.append(pins);
    },

    removeMapPins: function() {
      findMapPins().map(function(pin) {
        pin.remove();
      });
    },

    addClassMapPinActive: function(elem) {
      elem.classList.add('map__pin--active');
    },

    removeClassMapPinActive: function() {
      let mapPinActive = mapPins.querySelector('.map__pin--active');

      if (mapPinActive === null) return;

      mapPinActive.classList.remove('map__pin--active');
    }
  };
})();
