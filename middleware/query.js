/**
 * Слой работы с query данными
 *
 * @module      Middleware.Query
 * @class      	Query
 * @namespace   Middleware
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var url         	= require('url'),
		querystring 	= require('querystring');

//---------------------- HTTP запросы ----------------------//

/**
 * Экспорт метода получения query данных
 *
 * @method query
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
module.exports = function(req, res, next){

	// Создание объекта параметров
	// в случае его отсудсвия
	if(!('params' in req)){

		/**
		 * GET параметры в объекте запроса
		 *
		 * @property params
		 * @type Object
		 */
		req.params = {}
	}

	var query = querystring.parse(url.parse(req.url).query);

	for(var key in query){
		req.params[key] = query[key];
	}

	req._path = url.parse(req.url).pathname;
	next();
};