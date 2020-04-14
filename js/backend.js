'use strict';

(function() {
  const server_url = 'https://javascript.pages.academy/keksobooking';

  const setup = function(onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(`Неизвестный статус: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function() {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = 10000; //10s

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      let xhr = setup(onLoad, onError);

      xhr.open('POST', server_url);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      let xhr = setup(onLoad, onError);

      xhr.open('GET', `${server_url}/data`);
      xhr.send();
    }
  };
})();
