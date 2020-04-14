'use strict';
//рендер карточки

(function() {
  const featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  const template = document.querySelector('template').content;
  const advertisementTemplate = template.querySelector('article.map__card');

  const type = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  window.card = {
    renderAdvertisement: function(index) {

      let advertisementElement = advertisementTemplate.cloneNode(true);

      const offer = window.pin.cardInfo[index].offer;
      const author = window.pin.cardInfo[index].author;

      advertisementElement.querySelector('h3').textContent = offer.title;
      advertisementElement.querySelector('small').textContent = offer.address;
      advertisementElement.querySelector('.popup__price').textContent = `${offer.price}\u20BD/ночь`;
      advertisementElement.querySelector('h4').textContent = type[offer.type];
      advertisementElement.querySelector('h4 ~ p').textContent = `${offer.rooms} комнаты для
      ${offer.guests} гостей`;
      advertisementElement.querySelector('p:nth-child(8)').textContent = `Заезд после ${offer.checkin},
      выезд до ${offer.checkout}`;
        for (let i = 0; i < featuresArr.length; i++) {
          //убираем из карточки отсутствующие удобства
          if (!offer.features.includes(featuresArr[i])) {
            advertisementElement.querySelector(`.feature--${featuresArr[i]}`).style.display = "none";
          };
        };
      advertisementElement.querySelector('p:nth-child(10)').textContent = offer.description;
      advertisementElement.querySelector('.popup__avatar').src = author.avatar;

      return advertisementElement;
    }
  };
})();
