/**!
 * Index controller
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Index контроллер
 **/

// Объявление модулей

//---------------------- HTTP запросы ----------------------//

// Домашняя страница
exports.index = function(req, res, next){
  res.render(__dirname+'/../view/index.jade');
};

// Страница 404 ошибки
exports.notfound = function(req, res){
  res.render(__dirname+'/../view/404.jade');
};
