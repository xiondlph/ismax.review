/**!
 * View middleware
 *
 * @package    ismax.review
 * @subpackage Мiddleware
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Слой работы с шаблоном
 **/

// Объявление модулей
var jade        	= require('jade');

//---------------------- HTTP запросы ----------------------//
exports.middleware = function(req, res, next){
  res.render = function(page){
    jade.renderFile(page, function (err, html){
      if(err){
        throw new Error('Jade error - '+err.message);
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf8')
      res.write(html);
      res.end();
    });
  };

  next();
};