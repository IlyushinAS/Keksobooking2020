'use strict';

(function() {
  window.synchronizeFields = function(elem1, elem2, arr1, arr2, syncMetod) {
    // elem1 - изменяемый элемент
    // elem2 - подстраивающийся элемент
    // arr1 - массив значений изменяемого элемента
    // arr2 - массив значений подстраивающегося элемента
    // syncMetod - метод синхронизации (Пример: установки атрибутта min)

    for (let i = 0; i < arr1.length; i++) {
      if (elem1.value == arr1[i]) {
        syncMetod(elem2, arr2[i]);
      };
    };
  };
})();
