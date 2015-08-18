/**
 * Адаптер Базы данных MongoDB
 *
 * @module      Lib.Db
 * @class       Db
 * @namespace   Lib
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var MongoClient     = require('mongodb').MongoClient,

    // Инициализация объекта БД для последующего
    // экспорта (до соединения и авторизации)
    _db = {};

// Соединение с БД (во время запуска сервера)
MongoClient.connect('mongodb://shareview:hwnd_des83@ds059712.mongolab.com:59712/shareview', function (err, db) {
    if (err) {
        throw new Error('Mongo error - ' + err.message);
    }

    _db = db;
});


/**
 * Експорт объекта базы данных
 *
 * @method db
 * @return {Object} db
 */
exports.db = function () {
    return _db;
};