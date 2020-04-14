'use strict';

//блок валидации формы и синхронизации полей формы

(function () {
  const noticeForm = document.querySelector('.notice__form');
  const address = noticeForm.querySelector('#address');
  const title = noticeForm.querySelector('#title');
  const pricePerNigth = noticeForm.querySelector('#price');
  const checkinTime = noticeForm.querySelector('#timein');
  const checkoutTime = noticeForm.querySelector('#timeout');
  const apartmentType = noticeForm.querySelector('#type');
  const roomsNumber = noticeForm.querySelector('#room_number');
  const capacity = noticeForm.querySelector('#capacity');
  const apartmentTypeArr = ['bungalo', 'flat', 'house', 'palace'];
  const minPriceArr = ['0', '1000', '5000', '10000'];

  const mapPinMain = document.querySelector('.map__pin--main');

  //валидация формы

  const addBorderColorRed = function(elem) {
    elem.style.borderColor = '#ff0000';
  };

  const removeBorderColor = function(elem) {
    elem.style.borderColor = '';
  };

  const showValidityError = function(input) {
    if (!input.validity.valid) {
      addBorderColorRed(input);
    } else {
      removeBorderColor(input);
    };
  };

  address.addEventListener('invalid', function() {
    if (address.validity.valueMissing) {
      address.setCustomValidity('Обязательное поле');
    } else {
      address.setCustomValidity('');
    };

    showValidityError(address);
  });

  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок не должен превышать 100-та символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    };

    showValidityError(title);
  });

  pricePerNigth.addEventListener('invalid', function() {
    let minPrice = pricePerNigth.getAttribute('min');

    if (pricePerNigth.validity.rangeOverflow) {
      pricePerNigth.setCustomValidity('Максимальная цена 1 000 000');
    } else if (pricePerNigth.validity.rangeUnderflow) {
      pricePerNigth.setCustomValidity(`Минимальная цена ${minPrice}`);
    } else if (pricePerNigth.validity.valueMissing) {
      pricePerNigth.setCustomValidity('Обязательное поле');
    } else {
      pricePerNigth.setCustomValidity('');
    };

    showValidityError(pricePerNigth);
  });

  //синхронизация полей формы

  const synchValues = function(elem1, elem2) {
    elem2.value = elem1.value;
  };

  const setAttributeMin = function(elem, value) {
    elem.min = value;
  };

  const synchRoomNumberCapacity = function() {
    if (roomsNumber.value === capacity.value) return;

    if (roomsNumber.value === '100') {
      capacity.value = '0';
      return;
    };

    capacity.value = roomsNumber.value;
  };

  const disableCapacityOption = function() {

    let options = capacity.options;

    if (roomsNumber.value === '100') {

      for (let option = 0; option < (options.length - 1); option++) {
        options[option].disabled = true;
      };

    } else if (roomsNumber.value === '1') {
      options[0].disabled = true;
      options[1].disabled = true;
      options[3].disabled = true;
    } else if (roomsNumber.value === '2') {
      options[0].disabled = true;
      options[3].disabled = true;
    } else {
      options[3].disabled = true;
    };
  };

  const enableCapacityOption = function() {
    let options = capacity.options;
    for (let option of options) {
      option.disabled = false;
    };
  };

  checkinTime.addEventListener('change', function() {
    synchValues(checkinTime, checkoutTime);
  });

  checkoutTime.addEventListener('change', function() {
    synchValues(checkoutTime, checkinTime);
  });

  apartmentType.addEventListener('change', function() {
    window.synchronizeFields(apartmentType, pricePerNigth, apartmentTypeArr, minPriceArr, setAttributeMin);
  });

  roomsNumber.addEventListener('change', function() {
    enableCapacityOption();
    synchRoomNumberCapacity();
    disableCapacityOption();
  });

  //отправка формы

  const resetMapPinMainPosition = function(x, y) {
    mapPinMain.style.top = `${y} px`;
    mapPinMain.style.left = `${x} px`;
  };

  const onLoadForm = function() {
    noticeForm.reset();

    //сброс значения главного пина
    const x = 600;
    const y = 375;

    resetMapPinMainPosition(x, y);
    address.setAttribute('value', `x: ${x}, y: ${y}`);
  };

  const onErrorForm = function(errorMessage) {
    let node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  noticeForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), onLoadForm, onErrorForm);
  });

  //функция установки значений в поле адреса

  window.form = {
    setAddressValue: function(x, y) {
      address.setAttribute('value', `x: ${x}, y: ${y}`);
    }
  };
})();
