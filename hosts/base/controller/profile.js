/**!
 * Profile controller
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Profile контроллер
 **/

// Объявление модулей

//---------------------- HTTP запросы ----------------------//

// Страница контроллера
exports.index = function(req, res, next){
  res.render(__dirname+'/../view/profile.jade');
};
