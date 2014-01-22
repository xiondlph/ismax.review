/**!
 * Query middleware
 *
 * @package    ismax.review
 * @subpackage Мiddleware
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Слой работы с query данными
 **/

// Объявление модулей
var url         	= require('url'),
		querystring 	= require('querystring');

//---------------------- HTTP запросы ----------------------//
exports.middleware = function(req, res, next){

	// Зоздание объекта параметров
	// в случае его отсудсвия
	if(!('params' in req)){
		req.params = {}
	}

	query = querystring.parse(url.parse(req.url).query);

	for(var key in query){
		req.params[key] = query[key];
	}
	next();
};