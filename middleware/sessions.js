/**!
 * Sessions middleware
 *
 * @package    ismax.review
 * @subpackage Мiddleware
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Слой работы с сессиями
 **/

// Объявление модулей
var cookie        = require('../lib/cookie');

//---------------------- HTTP запросы ----------------------//
exports.middleware = function(req, res, next){
	// Работа с индексом сессии
  var _cookie = cookie.parse(req.headers.cookie);
  var index  = _cookie && _cookie.ismax_session ? _cookie.ismax_session : cookie.uid(64);

  req.sissionId = index;
  res.setHeader("Set-Cookie", 'ismax_session='+index+';');

  next();
};