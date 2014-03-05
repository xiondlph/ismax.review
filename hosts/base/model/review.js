/**
 * Review model
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * отзывов
 **/

// Объявление модулей
var mongo = require('../../../lib/db');

exports.middleware = function(req, res, next){
	req.model = {

	}

  next();
};