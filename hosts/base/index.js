/**
 * Модуль инициализации хоста
 *
 * @module      Hosts.Base
 * @class	      Base
 * @namespace   Hosts
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Подклучения сервера
var router = require('../../server/router');


/**
 * Слои
 *
 * @attribute middleware 
 * @type Object
 */
var middleware = {
	post: 			require('../../middleware/post'),
	query: 			require('../../middleware/query'),
	sessions: 	require('../../middleware/sessions'),
	view: 			require('../../middleware/view')
}



/**
 * Набор моделей
 *
 * @attribute model 
 * @type Object
 */
var model = {

}



/**
 * Нобор контроллеров
 *
 * @attribute controller 
 * @type Object
 */
var controller = {
	index:     	require('./controller/index'),
	review:     require('./controller/review')
}


/*** Назначение HTTP маршрутов ***/

// Общие настройки для GET запросов
router.get('^(http|https)://(www\.)?e-ismax\.ru\/.*$', middleware.view);

// Общие настройки для POST запросов
router.post('^(http|https)://(www\.)?e-ismax\.ru\/.*$', middleware.post);


// Стр. 404 (Not found)
router.get('^(http|https)://(www\.)?e-ismax\.ru\/404\/?$', controller.index.notfound);

// Главная стр.
router.get('^http://(www\.)?e-ismax\.ru\/?$', controller.index.index);

// Review
router.get('^http://(www\.)?e-ismax\.ru\/review\/widget\/?$', middleware.query, controller.review.widget);
router.get('^http://(www\.)?e-ismax\.ru\/review\/list\/?$', middleware.query, controller.review.list);

