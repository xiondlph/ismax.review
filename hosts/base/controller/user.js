/**
 * User контроллер
 *
 * @module      Hosts.Base.Controller.User
 * @class       Controller.User
 * @namespace   Hosts.Base
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var crypto            = require('crypto'),
    nodemailer        = require("nodemailer"),
    validator         = require('validator'),
    generatePassword  = require('password-generator');

//---------------------- HTTP запросы ----------------------//


/**
 * Создание пользователя
 *
 * @method create
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.create = function (req, res) {
    var response;

    res.setHeader('Access-Control-Allow-Origin', 'http://www.' + req.currentHost + '.ru');

    if (req.params) {
        if (!validator.isEmail(req.params.email)) {
            throw new Error('Validate error - email is invalid');
        }

        req.model.secure.isExistByEmail(req.params.email, function (count) {
            var smtpTransport,
                password,
                data;

            if (count > 0) {
                response = {
                    exist: true
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();
            } else {
                password   = generatePassword(12, false);
                data        = {
                    email:      req.params.email,
                    active:     false,
                    script:     'window.ismaxWidget.text = document.getElementsByTagName(\'title\')[0].innerHTML;'
                };

                // Шифрование
                data.password   = crypto.createHmac('sha256', password).digest('hex');
                data.salt       = crypto.createHmac('sha256', req.params.email).digest('hex');

                req.model.secure.create(data, function (user) {

                    req.local.email     = data.email;
                    req.local.password  = password;

                    res.render(__dirname + '/../view/mail', 'register', function (text) {

                        smtpTransport = nodemailer.createTransport({
                            service: 'Yandex',
                            auth: {
                                user: 'notification@shareview.ru',
                                pass: 'hwnd_des83'
                            }
                        });

                        smtpTransport.sendMail({
                            from: 'Notification Shareview <notification@shareview.ru>',
                            to: data.email,
                            bcc: 'Support Shareview <support@shareview.ru>',
                            subject: 'Регистрация в сервисе Shareview',
                            text: text,
                            headers: {
                                'X-Mailer': 'SHAREVIEW'
                            }
                        }, function (error, response) {
                            if (error) {
                                response = {
                                    success: false
                                };
                            } else {
                                response = {
                                    success: true
                                };
                            }

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                            res.write(JSON.stringify(response, null, "\t"));
                            res.end();
                        });

                    });
                });
            }
        });
    } else {
        response = {
            success: false
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    }
};


/**
 * Генирация нового паролья (востановления доступа)
 *
 * @method forgot
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.forgot = function (req, res) {
    var response;

    if (req.params) {
        if (!validator.isEmail(req.params.email)) {
            throw new Error('Validate error - email is invalid');
        }

        req.model.secure.getUserByEmail(req.params.email, function (user) {
            var smtpTransport,
                password = generatePassword(12, false);

            if (!user) {
                response = {
                    success: false
                };

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                res.write(JSON.stringify(response, null, "\t"));
                res.end();

                return;
            }

            req.model.secure.setPasswordByEmail(req.params.email, crypto.createHmac('sha256', password).digest('hex'), function (result) {

                req.local.password = password;

                res.render(__dirname + '/../view/mail', 'forgot', function (text) {

                    smtpTransport = nodemailer.createTransport({
                        service: 'Yandex',
                        auth: {
                            user: 'notification@shareview.ru',
                            pass: 'hwnd_des83'
                        }
                    });

                    smtpTransport.sendMail({
                        from: 'Notification Shareview <notification@shareview.ru>',
                        to: user.email,
                        bcc: 'Support Shareview <support@shareview.ru>',
                        subject: 'Востановления доступа к сервису Shareview',
                        text: text,
                        headers: {
                            'X-Mailer': 'SHAREVIEW'
                        }
                    }, function (error, response) {
                        if (error) {
                            response = {
                                success: false
                            };
                        } else {
                            response = {
                                success: true
                            };
                        }

                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
                        res.write(JSON.stringify(response, null, "\t"));
                        res.end();
                    });
                });
            });
        });
    }
};