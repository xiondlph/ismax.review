/**
 * Модуль инициализации хоста
 *
 * @module      Hosts.Base
 * @class       Base
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
    post:           require('../../middleware/post'),
    query:          require('../../middleware/query'),
    sessions:       require('../../middleware/sessions'),
    view:           require('../../middleware/view')
};



/**
 * Набор моделей
 *
 * @attribute model 
 * @type Object
 */
var model = {
    secure:     require('./model/secure'),
    payment:    require('./model/payment')
};



/**
 * Нобор контроллеров
 *
 * @attribute controller 
 * @type Object
 */
var controller = {
    index:      require('./controller/index'),
    secure:     require('./controller/secure'),
    user:       require('./controller/user'),
    profile:    require('./controller/profile'),
    payment:    require('./controller/payment'),
    request:    require('./controller/request'),
    review:     require('./controller/review')
};


/**
 * @config host
 * @type String
 */
var host;

if (process.env.NODE_ENV !== 'prod') {
    host = process.env.HOST || 'dev.shareview';
    console.log('host:%s', host);
} else {
    host = process.env.HOST || 'shareview';
}

/*** Установка текущего хоста ***/
router.setCurrentHost(host);

/*** Назначение HTTP маршрутов ***/

// Общие настройки для GET запросов
router.get('^(http|https)://www.' + host + '.ru/.*$', middleware.view);

// Общие настройки для POST запросов
router.post('^(http|https)://www.' + host + '.ru/.*$', middleware.post);

// Общие настройки для OPTIONS запросов (разрешительный заголовок для кросс-доменных запросов)
router.options('^(http|https)://www.' + host + '.ru/.*$', controller.secure.options);

// Стр. 404 (Not found)
router.get('^(http|https)://www.' + host + '.ru/404/?$', controller.index.notfound);

// Главная стр.
router.get('^http://www.' + host + '.ru/?$', controller.secure.guest, controller.index.index);
router.get('^https://www.' + host + '.ru/?$', controller.secure.guest, controller.secure.http);

// Текстовые стр.
router.get('^http://www.' + host + '.ru/(about|destiny|terms)/?$', controller.secure.auth);
router.get('^https://www.' + host + '.ru/(about|destiny|terms)/?$', middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);

router.get('^(http|https)://www.' + host + '.ru/about/?$', controller.index.about);
router.get('^(http|https)://www.' + host + '.ru/destiny/?$', controller.index.destiny);
router.get('^(http|https)://www.' + host + '.ru/terms/?$', controller.index.terms);

// Sitemap.xml
router.get('^http://www.' + host + '.ru/Sitemap.xml$', controller.index.sitemap);

// Secure
router.get('^(http|https)://www.' + host + '.ru/user.*$', controller.secure.https, middleware.sessions, model.secure, controller.secure.user);
router.post('^https://www.' + host + '.ru/user.*$', middleware.sessions, model.secure, controller.secure.user);

router.get('^https://www.' + host + '.ru/user/?$', controller.secure.guest, controller.secure.index);
router.post('^https://www.' + host + '.ru/user/signin/?$', controller.secure.guest, controller.secure.signin);
router.get('^https://www.' + host + '.ru/user/signout/?$', controller.secure.auth, controller.secure.signout);

// User
router.post('^https://www.' + host + '.ru/user/create/?$', middleware.view, controller.secure.guest, controller.user.create);
router.post('^https://www.' + host + '.ru/user/forgot/?$', middleware.view, controller.secure.guest, controller.user.forgot);

// Profile
router.get('^(http|https)://www.' + host + '.ru/profile.*$', controller.secure.https, middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);
router.post('^https://www.' + host + '.ru/profile.*$', middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);

router.get('^https://www.' + host + '.ru/profile/?$', controller.profile.index);
router.get('^https://www.' + host + '.ru/profile/get/?$', controller.profile.get);
router.post('^https://www.' + host + '.ru/profile/email/?$', controller.profile.email);
router.post('^https://www.' + host + '.ru/profile/pass/?$', controller.profile.password);
router.get('^https://www.' + host + '.ru/profile/settings/?$', controller.profile.getSettings);
router.post('^https://www.' + host + '.ru/profile/settings/?$', controller.profile.setSettings);

// Payment
router.get('^https://www.' + host + '.ru/payment.*$', middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);
router.post('^https://www.' + host + '.ru/payment.*$', middleware.sessions, model.secure, controller.secure.user, controller.secure.auth);

router.get('^https://www.' + host + '.ru/payment/last/?$', model.payment, controller.payment.last);
router.get('^https://www.' + host + '.ru/payment/list/?$', model.payment, middleware.query, controller.payment.list);
router.post('^https://www.' + host + '.ru/ym_notification/?$', model.secure, model.payment, controller.payment.notification);

// Widget
router.get('^(http|https)://www.' + host + '.ru/code/?$', middleware.query, model.secure, controller.request.api, controller.review.code);
router.get('^(http|https)://www.' + host + '.ru/iframe/?$', middleware.query, model.secure, controller.request.api, controller.review.iframe);
router.get('^(http|https)://www.' + host + '.ru/widget/?$', middleware.query, model.secure, controller.request.api, controller.review.widget);
