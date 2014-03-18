/**!
 * Review controller
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Review контроллер
 **/

// Объявление модулей

//---------------------- HTTP запросы ----------------------//

// Рендеринг виджета
exports.index = function(req, res){
	res.setHeader('Access-Control-Allow-Origin', 'http://ismax.ru');
	res.setHeader('Content-Type', 'application/javascript');
  res.render(__dirname+'/../view/review', 'App');
};

// Добавление нового отзыва
exports.add = function(req, res){
	res.setHeader('Access-Control-Allow-Origin', 'http://ismax.ru');
  if(req.params){
  	var review = {};

    if(req.params.name)	{	review.name 	= req.params.name	};
    if(req.params.email){	review.email 	= req.params.email};
    if(req.params.text)	{	review.text 	= req.params.text	};

    req.model.add(review, function(result){
      var response = {
        auth: true,
        success: true
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });
  }else{
    var response = {
      auth: true,
      success: false
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
};

// Список отзывов
exports.list = function(req, res){
	res.setHeader('Access-Control-Allow-Origin', 'http://ismax.ru');
	req.model.list(function(reviews){
    var response = {
      auth: true,
      success: true,
      reviews: reviews
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  });
};