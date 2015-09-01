/**
 * Payment контроллер
 *
 * @module      Hosts.Base.Controller.Payment
 * @class       Controller.Payment
 * @namespace   Hosts.Base
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var crypto          = require('crypto'),
    nodemailer      = require("nodemailer"),
    fs              = require('fs');


// Логирование уведоблений об оплате
function logPayment(data) {

    // Запись данных уведобления в лог файл
    fs.open(__dirname + '/../../../log/payment.log', 'a', function (e, id) {
        fs.write(id, JSON.stringify(data, null, "\t") + "\n", null, 'utf8', function () {
            fs.close(id);
        });
    });
}


// Отправка оповещения о платеже
function notice(data, subject) {
    var smtpTransport = nodemailer.createTransport({
        service: 'Yandex',
        auth: {
            user: 'notification@shareview.ru',
            pass: 'hwnd_des83'
        }
    });

    smtpTransport.sendMail({
        from: 'Notification Shareview <notification@shareview.ru>',
        to: 'Support Shareview <support@shareview.ru>',
        subject: subject,
        text: JSON.stringify(data, null, "\t"),
        headers: {
            'X-Mailer': 'SHAREVIEW'
        }
    }, function (error, response) {
        if (error) {
            throw new Error('Notice send error - ' + error.message);
        }
    });
}

// Формирование периода в timestamp
function getPeriod(currentPeriod, amount) {
    var currentDate = new Date(),
        _currentPeriod = currentPeriod && currentPeriod > currentDate ? new Date(currentPeriod) : currentDate;

    switch (amount) {
    case 50:
        _currentPeriod.setDate(_currentPeriod.getDate() + 1);
        break;
    case 500:
        _currentPeriod.setMonth(_currentPeriod.getMonth() + 1);
        break;
    case 1000:
        _currentPeriod.setMonth(_currentPeriod.getMonth() + 2);
        break;
    case 1500:
        _currentPeriod.setMonth(_currentPeriod.getMonth() + 3);
        break;
    case 2000:
        _currentPeriod.setMonth(_currentPeriod.getMonth() + 4);
        break;
    default:
        _currentPeriod.setDate(_currentPeriod.getDate() + (Math.ceil(amount / 50)));
        break;
    }

    return _currentPeriod.valueOf();
}

//---------------------- HTTP запросы ----------------------//


/**
 * Уведомление о платеже
 *
 * @method notification
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.notification = function (req, res, next) {
    var currentPeriod,
        newPeriod,
        hash;

    // Логирование уведомления
    logPayment(req.params);


    //Уведомление о платеже по email
    notice(req.params, 'Входящий платеж');

    if (req.params) {
        hash = req.params.notification_type + '&' + req.params.operation_id + '&' + req.params.amount + '&' + req.params.currency + '&' + req.params.datetime + '&' + req.params.sender + '&' + req.params.codepro + '&+aMXyVPml0TWDHYEF/gfVsw5&' + req.params.label;
        hash = crypto.createHash('sha1').update(hash).digest('hex');

        if (req.params.sha1_hash === hash) {

            if (req.params.codepro === 'false') {
                req.model.secure.getUserByEmail(req.params.label, function (user) {
                    if (user) {
                        currentPeriod   = user.period;
                        newPeriod       = getPeriod(currentPeriod, req.params.withdraw_amount);

                        req.model.secure.updatePeriodByEmail(user.email, newPeriod, function (user) {
                            if (user) {
                                req.params.lastPeriod   = currentPeriod;
                                req.params.newPeriod    = newPeriod;

                                req.model.payment.add(req.params);

                                //Уведомление об успешном платеже по email
                                notice(req.params, 'Успешный входящий платеж');
                            }
                        });
                    }
                });
            }
        }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end();
};

/**
 * Получение последнего уведомления пользователя
 *
 * @method last
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.last = function (req, res, next) {
    req.model.payment.lastByEmail(req.user.email, function (payment) {
        var response = {
            auth: true,
            success: true
        };

        if (payment) {
            response.payment = {
                withdraw_amount:    payment.withdraw_amount,
                datetime:           payment.datetime,
                requests:           payment._requests,
                quantity:           payment._quantity
            };
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    });
};


/**
 * Получение списка уведомлений пользователя по email
 *
 * @method last
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @param {Function} next
 */
exports.list = function (req, res, next) {
    var skip = req.params.skip;

    req.model.payment.listByEmail(req.user.email, skip, 10, function (payments, count) {
        var response = {
            auth: true,
            success: true,
            payments: payments,
            total: count
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
    });
};