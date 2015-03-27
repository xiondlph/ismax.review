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
var mongo       = require('mongodb'),
    Server      = mongo.Server,
    Db          = mongo.Db,
    BSON        = mongo.BSONPure,
    server      = new Server('localhost', 27017, {auto_reconnect: true}),
    db          = new Db('review', server, {safe:true});


/**
 * Експорт объекта базы данных
 *
 * @attribute db
 * @type Object
 */
exports.db = db;


/**
 * Експорт объекта bson
 *
 * @attribute bson
 * @type Object
 */
exports.bson = BSON;