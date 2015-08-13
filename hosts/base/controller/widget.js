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
    querystring     = require("querystring");

//---------------------- HTTP запросы ----------------------//


/**
 * Виджет
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.index = function (req, res, next) {
    var result,
        reviews;
    if (!req.params.hasOwnProperty('text')) {
        res.render(__dirname + '/../view/', 'widget');
    }

    req.params.count    = 1;

    req.api('/v1/search.json?' + querystring.stringify(req.params), function (err, status, data) {
        if (err || status !== 200) {
            res.render(__dirname + '/../view/', 'widget');
            return;
        }


        result = JSON.parse(data);

        if (result.searchResult.results.length > 0 && result.searchResult.results[0].hasOwnProperty('model')) {
            req.api('/v1/model/' + result.searchResult.results[0].model.id + '/opinion.json', function (err, status, data) {
                if (err || status !== 200) {
                    res.render(__dirname + '/../view/', 'widget');
                    return;
                }
                reviews = JSON.parse(data);
                req.local.reviews = reviews;
                req.local.modelId = result.searchResult.results[0].model.id;
                req.local.text    = req.params.text;

                res.render(__dirname + '/../view/', 'widget', function (out) {
                    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
                    res.write(out);
                    res.end();
                });
            });
        } else {
            res.render(__dirname + '/../view/', 'widget');
        }
    });
};

/**
 * Айфрейм
 *
 * @method iframe
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.iframe = function (req, res, next) {
    req.local.search = req.params.search;
    res.render(__dirname + '/../view/', 'iframe');
};