'use strict';

(function() {
  const mapFilterForm = document.querySelector('.map__filters');
  const apartmentType = mapFilterForm.querySelector('#housing-type');
  const pricePerNight = mapFilterForm.querySelector('#housing-price');
  const roomsNumber = mapFilterForm.querySelector('#housing-rooms');
  const capacity = mapFilterForm.querySelector('#housing-guests');
  const features = mapFilterForm.querySelector('#housing-features');

  let inputArr = Array.from(features.querySelectorAll('input'));

  //начальное состояние
  window.filteredData = window.data;

  const filterApartmentType = function(advertisement) {
    switch (apartmentType.value) {
      case 'flat':
        return advertisement.offer.type === 'flat';
      case 'house':
        return advertisement.offer.type === 'house';
      case 'bungalo':
        return advertisement.offer.type === 'bungalo';
      default:
        return advertisement;
    };
  };

  const filterRoomsNumber = function(advertisement) {
    switch (roomsNumber.value) {
      case '1':
        return advertisement.offer.rooms === 1;
      case '2':
        return advertisement.offer.rooms === 2;
      case '3':
        return advertisement.offer.rooms === 3;
      default:
        return advertisement;
    };
  };

  const filterPricePerNight = function(advertisement) {
    switch (pricePerNight.value) {
      case 'low':
        return advertisement.offer.price < 10000;
      case 'middle':
        return (advertisement.offer.price >= 10000 && advertisement.offer.price <= 50000);
      case 'high':
        return advertisement.offer.price > 50000;
      default:
        return advertisement;
    };
  };

  const filterCapacity = function(advertisement) {
    switch (capacity.value) {
      case '1':
        return advertisement.offer.guests = 1;
      case '2':
        return advertisement.offer.guests = 2;
      default:
        return advertisement;
    };
  };

  let selectedFeaturesTags = [];

  const filterFeature = function(advertisement) {
    return selectedFeaturesTags.every(feature => advertisement.offer.features.includes(feature));
  };

  const filterData = function(data) {

    selectedFeaturesTags = inputArr.reduce(
      (tags, input) => {
        if (input.checked) {
          tags.push(input.value);
        }

        return tags;
      },
      []
    );

    filteredData = data.
    filter(filterApartmentType).
    filter(filterRoomsNumber).
    filter(filterPricePerNight).
    filter(filterCapacity).
    filter(filterFeature);

    return filteredData;
  };

  window.filters = {
    updateMapPins: function(data) {
      window.pin.removeMapPins();
      window.pin.showMapPins(filterData(data));
    }
  };
})();
