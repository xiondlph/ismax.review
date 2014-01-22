/**!
 * Post middleware
 *
 * @package    ismax.review
 * @subpackage Мiddleware
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Слой работы с post данными
 **/

// Объявление модулей
var querystring 	= require('querystring'),
		json 					= require('../lib/json');

//---------------------- HTTP запросы ----------------------//
exports.middleware = function(req, res, next){
	// Объект POST данных
  var _post = '';

	// Принятие POST данных
  req.addListener("data", function(data){
    _post += data;
  });

	// Обработка запроса при окончании
  // получения данных запроса
	req.addListener('end', function(){
		var post;
		req._post = _post;

		// Зоздание объекта параметров
		// в случае его отсудсвия
		if(!('params' in req)){
			req.params = {}
		}

		post = json.parse(_post) || querystring.parse(_post);

		for(var key in post){
			req.params[key] = post[key];
		}
		next();
  });
};