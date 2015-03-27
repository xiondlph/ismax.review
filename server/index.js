/**
 * Главный модуль сервера
 *
 * @module      Server.Index
 * @class       Index
 * @namespace   Server
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var http          = require('http'),
    exception     = require('./exception'),
    router        = require('./router');


// Создание HTTP сервера
var server = http.createServer(function(req, res){

  // Объект перехвата исключений запроса
  var httpErr = exception.httpErr(req, res);

  // Инициализация объекта локальных переменных
  req.local = {}

  httpErr.run(function(){
    router.route(req, res);
  });
});


/**
 * Метод запуска сервера
 *
 * @method start
 */
exports.start = function(){
  // Запуск web сервера на порту 3001
  server.listen(3001); 
  if(process.env.NODE_ENV == 'debug') console.log('Start server at port 3001');
}