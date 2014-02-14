/**!
 * Dada Base adapter
 *
 * @package    ismax.review
 * @subpackage library
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Адаптер Базы данных
 **/

// Объявление модулей
var mongo       = require('mongodb'),
    Server      = mongo.Server,
    Db          = mongo.Db,
    BSON        = mongo.BSONPure,
    server      = new Server('localhost', 27017, {auto_reconnect: true}),
    db          = new Db('review', server, {safe:true});

// Експорт объекта базы данных
exports.db = db;

// Експорт объекта bson
exports.bson = BSON;