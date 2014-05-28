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
var validator = require('validator');

//---------------------- HTTP запросы ----------------------//

// Рендеринг виджета
exports.index = function(req, res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/javascript');
  res.render(__dirname+'/../view/review', 'App');
};

exports.widget = function(req, res){
  res.render(__dirname+'/../view/review', 'Widget');
}

// Добавление нового отзыва
exports.add = function(req, res){
	res.setHeader('Access-Control-Allow-Origin', '*');
  if(req.params){

    if(validator.isNull(req.params.author)){
      throw new Error('Validate error - author is invalid');
    }

    if(validator.isNull(req.params.grade)){
      throw new Error('Validate error - grade is invalid');
    }

  	var review = {};

    review.author = req.params.author;
    review.grade  = req.params.grade;

    if(req.params.email)  { review.email    = req.params.email };
    if(req.params.contra) { review.contra   = req.params.contra };
    if(req.params.pro)    { review.pro      = req.params.pro };
    if(req.params.text)	  {	review.text     = req.params.text	};

    review.date = new Date();

    req.model.add(review, function(result){
      var response = {
        success: true,
        review: result
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });
  }else{
    var response = {
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
	req.model.list(function(reviews){
    var response = {
      success: true,
      reviews: reviews
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf-8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  });
};