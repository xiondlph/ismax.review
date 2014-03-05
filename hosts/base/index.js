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
var reviewModel    = require('./model/review');

// Нобор контроллеров
var index     = require('./controller/index');
var secure    = require('./controller/secure');
var user      = require('./controller/user');
var profile   = require('./controller/profile');
var review    = require('./controller/review');

// Назначение HTTP маршрутов
router.get('^e-ismax\.ru\/.*$', view.middleware);
router.post('^e-ismax\.ru\/.*$', post.middleware);

router.get('^e-ismax\.ru\/404\/?$', index.notfound);
router.get('^e-ismax\.ru\/?$', index.index);

// Secure
router.get('^e-ismax\.ru\/user.*$', sessions.middleware, secureModel.middleware);
router.post('^e-ismax\.ru\/user.*$', sessions.middleware, secureModel.middleware);

router.get('^e-ismax\.ru\/user\/?$', secure.index);
router.post('^e-ismax\.ru\/user\/signin\/?$', secure.signin);

// User
router.post('^e-ismax\.ru\/user/create\/?$', user.create);

// Profile
router.get('^e-ismax\.ru\/profile\/?$', sessions.middleware, secureModel.middleware, secure.user, secure.auth, profile.index);

// Review
router.get('^e-ismax\.ru\/review(\/.*)$', sessions.middleware);

router.post('^e-ismax\.ru\/review\/set\/?$', reviewModel.middleware, review.set);
router.get('^e-ismax\.ru\/review\/list\/?$', reviewModel.middleware, review.list);