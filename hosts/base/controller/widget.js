/**
 * Widget контроллер
 *
 * @module      Hosts.Base.Controller.Widget
 * @class       Controller.Widget
 * @namespace   Hosts.Base
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http            = require('http'),
    querystring     = require("querystring"),
    urlencode       = require("urlencode");

//---------------------- HTTP запросы ----------------------//


/**
 * Домашняя страница
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.index = function (req, res, next) {
    var request;

    if (req.params.hasOwnProperty('text')) {
        req.params.text     = urlencode(req.params.text)
        req.params.count    = 1;

        req.api('/v1/search.json?' + querystring.stringify(req.params), function (err, status, data) {
            var result = JSON.parse(data);
            if(result.searchResult.results.length > 0 && result.searchResult.results[0].hasOwnProperty('model')){
                console.log(result.searchResult.results[0].model);
            }
        });
    } else {
        res.render(__dirname + '/../view/', 'widget');
    }
};