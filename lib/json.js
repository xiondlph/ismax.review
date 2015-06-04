/**
 * Модуль работы с json данными
 *
 * @module      Lib.Json
 * @class       Json
 * @namespace   Lib
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей


/**
 * Преобразование строки в json
 *
 * @method parse
 * @param {String} str Строка объекта
 * @return {Object|Boolean} data json объект
 */
exports.parse = function (str) {
    try {
        var data = JSON.parse(str);
        return data;
    } catch (e) {
        return false;
    }
};