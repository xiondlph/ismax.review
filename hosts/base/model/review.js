/**
 * Review model
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * отзывов
 **/

// Объявление модулей
var mongo = require('../../../lib/db');

exports.middleware = function(req, res, next){
	req.model = {

		// Добавление нового отзыва
		add: function(review, accept){
		  mongo.db.collection('reviews', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.insert(review, function(err, user){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(review);
		      }
		    });
		  });
		},

		// Список отзывов
		list: function(accept){
		  mongo.db.collection('reviews', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.find({}).toArray(function(err, reviews){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(reviews);
		      }
		    });
		  });
		}
	}

  next();
};