'use strict';

//начальное состояние страницы, события на главном пине, открытие/закрытие попапа
//блок не выдаёт глобальных объектов

(function() {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  const mapBlock = document.querySelector('.map');
  const mapPins = mapBlock.querySelector('.map__pins');
  const noticeForm = document.querySelector('.notice__form');
  const fieldsets = noticeForm.querySelectorAll('fieldset');
  const mapPinMain = mapPins.querySelector('.map__pin--main');
  const mapFilterForm = document.querySelector('.map__filters');

  //начальное состояние страницы c заблокированной формой

  const disableFieldsets = function() {
    for (let fieldset of fieldsets) {
      fieldset.disabled = true;
    };
  };

  disableFieldsets();

  //функции при mouseup

  const enableFieldsets = function() {
    for (let fieldset of fieldsets) {
      fieldset.disabled = false;
    };
  };

  const removeClassMapFaded = function() {
    mapBlock.classList.remove('map--faded');
  };

  const removeClassNoticeFormDisabled = function() {
    noticeForm.classList.remove('notice__form--disabled');
  };

  const onMouseUpMainPin = function() {
    enableFieldsets();
    removeClassNoticeFormDisabled();
    removeClassMapFaded();
    window.pin.showMapPins(window.data.value);
    mapPinMain.removeEventListener('mouseup', onMouseUpMainPin);
  };

  const onKeyUpMainPin = function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      enableFieldsets();
      removeClassNoticeFormDisabled();
      removeClassMapFaded();
      window.pin.showMapPins(window.data.value);
      mapPinMain.removeEventListener('keyup', onKeyUpMainPin);
    };
  };

  const onPopupEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closeCard();
      window.pin.removeClassMapPinActive();
    };
  };

  const onError = function(errorMessage) {
    let node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(function(data) {
    window.data(data);

    mapPinMain.addEventListener('mouseup', onMouseUpMainPin);

    mapPinMain.addEventListener('keyup', onKeyUpMainPin);

    mapFilterForm.addEventListener('change', function() {
      const getUpdate = function() {
        window.filters.updateMapPins(window.data.value);
      };

      window.debounce(getUpdate);
    });
  }, onError);

  //открытие попапа

  mapPins.addEventListener('click', function(evt) {
    let target = evt.target.closest('.map__pin');

    if (!target) return;

    if (target.className === 'map__pin map__pin--main') return;

    window.closeCard();
    window.pin.removeClassMapPinActive();
    window.pin.addClassMapPinActive(target);
    const indexOffer = window.util.getIndexOffer(target);
    window.showCard(window.card.renderAdvertisement(indexOffer));

    document.addEventListener('keydown', onPopupEscPress);
  });

  //закрытие попапа

  mapBlock.addEventListener('click', function(evt) {
    let target = evt.target;

    if (target.className != 'popup__close') return;

    window.closeCard();
    window.pin.removeClassMapPinActive();

    document.removeEventListener('keydown', onPopupEscPress);
  });

  //движение пина

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.form.setAddressValue(mapPinMain.offsetLeft, mapPinMain.offsetTop);

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let x = mapPinMain.offsetLeft - shift.x;
      let y = mapPinMain.offsetTop - shift.y;

      //ограничения на перемещения по карте
      const yMax = 550;
      const yMin = 150;
      const xMax = 1200;
      const xMin = 0;

      if (y < yMin) {
        y = yMin;
      }

      if (y > yMax) {
        y = yMax;
      }

      if (x < xMin) {
        x = xMin;
      }

      if (x > xMax) {
        x = xMax;
      }

      mapPinMain.style.top = y + 'px';
      mapPinMain.style.left = x + 'px';

      window.form.setAddressValue(x, y);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
