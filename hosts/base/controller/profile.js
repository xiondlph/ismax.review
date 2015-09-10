/**
 * Profile контроллер
 *
 * @module      Hosts.Base.Controller.Profile
 * @class       Controller.Profile
 * @namespace   Hosts.Base
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var crypto        = require('crypto'),
    validator     = require('validator'),
    url           = require('url');

//---------------------- HTTP запросы ----------------------//


/**
 * Страница контроллера
 *
 * @method index
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.index = function (req, res) {
    res.render(__dirname + '/../view/', 'profile');
};


/**
 * Получение данных профиля
 *
 * @method get
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.get = function (req, res) {
    var response = {
        auth: true,
        success: true,
        profile: {
            email:      req.user.email,
            domain:     req.user.domain,
            period:     req.user.period,
            _active:    req.user._active
        }
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=UTF-8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
};



/**
 * Смена текущего почтового адреса
 *
 * @method email
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.email = function (req, res) {
    var response;

    if (req.params) {

        if (!validator.isEmail(req.params.email)) {
            throw new Error('Validate error - email is invalid');
        }

        req.model.secure.isExistByEmail(req.params.email, function (count) {
            if (count > 0) {
                if (req.params.email === req.user.email) {
                    response = {
                        auth: true,
                        success: true,
                        exist: false
                    };
                } else {
                    response = {
                        auth: true,
                        success: true,
                        exist: true
                    };
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();
            } else {
                req.model.secure.setEmail(req.sissionId, req.params.email, function (result) {
                    response = {
                        auth: true,
                        success: true,
                        exist: false
                    };

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                    res.write(JSON.stringify(response, null, "\t"));
                    res.end();
                });
            }
        });

    } else {
        response = {
            auth: true,
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};



/**
 * Смена текущего пароля
 *
 * @method password
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.password = function (req, res) {
    var response;

    if (req.params) {

        if (!validator.isLength(req.params.password, 1, 255)) {
            throw new Error('Validate error - password is invalid');
        }

        req.model.secure.setPassword(req.sissionId, crypto.createHmac('sha256', req.params.password).digest('hex'), function (result) {
            response = {
                auth: true,
                success: true
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
        });

    } else {
        response = {
            auth: true,
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};



/**
 * Получение информации о настройках
 *
 * @method access
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.getSettings = function (req, res) {
    var response = {
        auth: true,
        success: true,
        settings: {
            domain:    req.user.domain,
            script:    req.user.script
        }
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=UTF-8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
};


/**
 * Сохранение настроек
 *
 * @method setSettings
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.setSettings = function (req, res) {
    var response,
        settings = {};

    if (req.params) {

        if (req.params.hasOwnProperty('domain') && req.params.domain.length) {
            if (!validator.isURL(req.params.domain)) {
                throw new Error('Validate error - domain is invalid');
            }

            settings.domain = url.parse(req.params.domain).hostname || url.parse(req.params.domain).href;
        }


        if (req.params.hasOwnProperty('script') && req.params.script.length) {
            settings.script = req.params.script;
        }

        req.model.secure.setSettings(req.sissionId, settings, function (result) {
            response = {
                auth: true,
                success: true
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
        });

    } else {
        response = {
            auth: true,
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};