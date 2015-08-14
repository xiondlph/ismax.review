/**
 * Widget контроллер
 *
 * @module      Hosts.Base.Controller.Widget
 * @class       Controller.Widget
 * @namespace   Hosts.Base
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


String.prototype.fnv32a = function () {
    var i,
        FNV1_32A_INIT   = 0x811c9dc5,
        hval            = FNV1_32A_INIT;

    for (i = 0; i < this.length; ++i) {
        hval ^= this.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
};


Date.prototype.dateParse = function () {
    var _humanMonth = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декобря'
        ],
        _current    = new Date(),
        _date       = this,
        _year       = '',
        _month      = '',
        _day        = '';

    if (_current.getFullYear() !== _date.getFullYear()) {
        _year = ' ' + _date.getFullYear();
    }

    if (_current.getMonth() !== _date.getMonth()) {
        _month = ' ' + _humanMonth[_date.getMonth()];
    }

    if (_current.getDate() - _date.getDate() > 1 || _month.length > 0 || _year.length > 0) {
        _month = _month.length > 0 ? _month : ' ' + _humanMonth[_date.getMonth()];
        _day = _date.getDate();
    } else if (_current.getDate() - _date.getDate() > 0) {
        _day = 'Вчера';
    } else {
        _day = 'Сегодня';
    }

    return _day + _month + _year;
};


// Объявление модулей
var http            = require('http'),
    querystring     = require("querystring"),
    UglifyJS        = require("uglify-js");

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
        reviews,
        page = 1;

    if (!req.params.hasOwnProperty('text')) {
        res.render(__dirname + '/../view/', 'widget');
    }

    if (req.params.hasOwnProperty('page')) {
        page = req.params.page;
        delete req.params.page;
    }

    req.params.count    = 1;

    req.api('/v1/search.json?' + querystring.stringify(req.params), function (err, status, data) {
        if (err || status !== 200) {
            res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
            res.render(__dirname + '/../view/', 'widget');
            return;
        }


        result = JSON.parse(data);

        if (result.searchResult.results.length > 0 && result.searchResult.results[0].hasOwnProperty('model')) {
            req.api('/v1/model/' + result.searchResult.results[0].model.id + '/opinion.json?page=' + page, function (err, status, data) {
                if (err || status !== 200) {
                    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
                    res.render(__dirname + '/../view/', 'widget');
                    return;
                }
                reviews = JSON.parse(data);
                req.local.reviews = reviews;
                req.local.modelId = result.searchResult.results[0].model.id;
                req.local.text    = req.params.text;
                req.local.isFirst = +page === 1;
                res.render(__dirname + '/../view/', 'widget', function (out) {
                    var _out = UglifyJS.minify(out, {fromString: true});

                    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
                    res.write(_out.code);
                    res.end();
                });
            });
        } else {
            res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
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