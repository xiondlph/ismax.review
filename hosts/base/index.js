/**!
 * Panel index
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Модуль инициализации хоста
 **/

// Подклучения сервера
var router = require('../../server/router');

// Слои
var post 			= require('../../middleware/post');
var query 		= require('../../middleware/query');
var sessions 	= require('../../middleware/sessions');
var view 			= require('../../middleware/view');

// Набор моделей
var secureModel    = require('./model/secure');

// Нобор контроллеров
var index     = require('./controller/index');
var secure    = require('./controller/secure');

// Назначение HTTP маршрутов
router.get('^review\.ismaxonline\.my\/.*$', view.middleware);
router.post('^review\.ismaxonline\.my\/.*$', post.middleware);

router.get('^review\.ismaxonline\.my\/404$', index.notfound);
router.get('^review\.ismaxonline\.my\/$', index.index);

// secure
router.get('^review\.ismaxonline\.my\/user\/.*$', sessions.middleware, secureModel.middleware);
router.post('^review\.ismaxonline\.my\/user\/.*$', sessions.middleware, secureModel.middleware);

router.get('^review\.ismaxonline\.my\/user$', secure.index);
router.post('^review\.ismaxonline\.my\/user\/signin$', secure.signin);