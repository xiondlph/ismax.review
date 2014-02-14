/**!
 * Server application
 *
 * @package    ismax.review
 * @subpackage Server
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Главный модуль сервера
 **/

// Объявление модулей
var http          = require('http'),
    exception     = require('./exception'),
    router        = require('./router');

// Создание HTTP сервера
var server = http.createServer(function(req, res){
  // Объект перехвата исключений запроса
  var httpErr = exception.httpErr(req, res);

  httpErr.run(function(){
    router.route(req, res);
  });
});

// Метод запуска сервера
exports.start = function(){
  // Запуск web сервера на порту 3001
  server.listen(3001); 
  console.log('Start server at port 3001');
}