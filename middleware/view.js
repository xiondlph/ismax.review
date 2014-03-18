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
var JUST = require('just');

//---------------------- HTTP запросы ----------------------//
exports.middleware = function(req, res, next){
  res.render = function(root, page){
    var just = new JUST({ root : root, useCache : false, ext : '.tpl', open: '<#', close: '#>' });

    just.render(page, {}, function(err, html){
      if(err){
        throw new Error('Just error - '+err.message);
        return;
      }

      res.statusCode = 200;
      if(!res.getHeader('Content-Type')){
        res.setHeader('Content-Type', 'text/html; charset=utf8');
      }
      res.write(html);
      res.end();
    });
  };

  next();
};