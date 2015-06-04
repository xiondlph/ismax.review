/**
 * Index контроллер
 *
 * @module      Hosts.Base.Controller.Index
 * @class       Controller.Index
 * @namespace   Hosts.Base
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http            = require('http');

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
    res.render(__dirname + '/../view/', 'index');
};


/**
 * Страница назначения
 *
 * @method destiny
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.destiny = function (req, res, next) {
    res.render(__dirname + '/../view/', 'destiny');
};


/**
 * Страница о сервисе
 *
 * @method about
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.about = function (req, res, next) {
    res.render(__dirname + '/../view/', 'about');
};


/**
 * Страница условий использования
 *
 * @method terms
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.terms = function (req, res, next) {
    res.render(__dirname + '/../view/', 'terms');
};


/**
 * Страница о парсере яндекс маркет
 *
 * @method ymparser
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.ymparser = function (req, res, next) {
    res.render(__dirname + '/../view/', 'ymparser');
};

/**
 * Страница о API яндекс маркет
 *
 * @method ymapi
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.ymapi = function (req, res, next) {
    res.render(__dirname + '/../view/', 'ymapi');
};


/**
 * Страница об отзывах яднекс маркет
 *
 * @method review
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.review = function (req, res, next) {
    res.render(__dirname + '/../view/', 'review');
};


/**
 * Страница списка готовых решений
 *
 * @method solutions
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.solutions = function (req, res, next) {
    res.render(__dirname + '/../view/', 'solutions');
};


/**
 * Страница Sitemap.xml
 *
 * @method sitemap
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.sitemap = function (req, res, next) {
    res.render(__dirname + '/../view/', 'sitemap');
};


/**
 * Страница 404 ошибки
 *
 * @method notfound
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.notfound = function (req, res) {
    res.statusCode = 404;
    res.render(__dirname + '/../view/', '404');
};